import type { TagNode } from "./tagGraph";

export type Point3D = { x: number; y: number; z: number };
export type Rotation = { x: number; y: number; z: number; w: number };
export type ProjectionBounds = { width: number; height: number };
export type ProjectedTag = Point3D & { scale: number };

const FRONT: Point3D = { x: 0, y: 0, z: 1 };
const DRAG_SENSITIVITY = 0.006;

const hash = (value: string) => {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
};

const unit = (value: string, salt: string) => hash(`${value}:${salt}`) / 4294967295;

const dot = (left: Point3D, right: Point3D) => left.x * right.x + left.y * right.y + left.z * right.z;

const cross = (left: Point3D, right: Point3D): Point3D => ({
  x: left.y * right.z - left.z * right.y,
  y: left.z * right.x - left.x * right.z,
  z: left.x * right.y - left.y * right.x,
});

const normalisePoint = (point: Point3D): Point3D => {
  const length = Math.hypot(point.x, point.y, point.z);
  return length ? { x: point.x / length, y: point.y / length, z: point.z / length } : FRONT;
};

const normaliseRotation = (rotation: Rotation): Rotation => {
  const length = Math.hypot(rotation.x, rotation.y, rotation.z, rotation.w);
  return length ? { x: rotation.x / length, y: rotation.y / length, z: rotation.z / length, w: rotation.w / length } : { x: 0, y: 0, z: 0, w: 1 };
};

const multiplyRotations = (left: Rotation, right: Rotation): Rotation => ({
  x: left.w * right.x + left.x * right.w + left.y * right.z - left.z * right.y,
  y: left.w * right.y - left.x * right.z + left.y * right.w + left.z * right.x,
  z: left.w * right.z + left.x * right.y - left.y * right.x + left.z * right.w,
  w: left.w * right.w - left.x * right.x - left.y * right.y - left.z * right.z,
});

const rotationAround = (axis: Point3D, angle: number): Rotation => {
  const unitAxis = normalisePoint(axis);
  const halfAngle = angle / 2;
  const scale = Math.sin(halfAngle);
  return { x: unitAxis.x * scale, y: unitAxis.y * scale, z: unitAxis.z * scale, w: Math.cos(halfAngle) };
};

const rotatePoint = (point: Point3D, rotation: Rotation): Point3D => {
  const vector: Rotation = { ...point, w: 0 };
  const conjugate: Rotation = { x: -rotation.x, y: -rotation.y, z: -rotation.z, w: rotation.w };
  const rotated = multiplyRotations(multiplyRotations(rotation, vector), conjugate);
  return { x: rotated.x, y: rotated.y, z: rotated.z };
};

const rotationBetween = (from: Point3D, to: Point3D): Rotation => {
  const start = normalisePoint(from);
  const end = normalisePoint(to);
  const similarity = dot(start, end);

  if (similarity < -0.999999) {
    const axis = Math.abs(start.x) < 0.9 ? cross(start, { x: 1, y: 0, z: 0 }) : cross(start, { x: 0, y: 1, z: 0 });
    return rotationAround(axis, Math.PI);
  }

  const axis = cross(start, end);
  return normaliseRotation({ x: axis.x, y: axis.y, z: axis.z, w: 1 + similarity });
};

export const createTagPositions = (nodes: TagNode[]) => new Map(nodes.map((node) => {
  const vertical = unit(node.id, "vertical") * 2 - 1;
  const angle = unit(node.id, "angle") * Math.PI * 2;
  const radius = Math.sqrt(1 - vertical * vertical);
  return [node.id, { x: radius * Math.cos(angle), y: vertical, z: radius * Math.sin(angle) }];
}));

export const rotationForFront = (point: Point3D): Rotation => rotationBetween(point, FRONT);

export const applyDragRotation = (rotation: Rotation, dx: number, dy: number): Rotation => {
  const horizontal = rotationAround({ x: 0, y: 1, z: 0 }, -dx * DRAG_SENSITIVITY);
  const vertical = rotationAround({ x: 1, y: 0, z: 0 }, -dy * DRAG_SENSITIVITY);
  const localDrag = multiplyRotations(vertical, horizontal);
  return normaliseRotation(multiplyRotations(rotation, localDrag));
};

export const applyTrackballRotation = (rotation: Rotation, from: Point3D, to: Point3D): Rotation => {
  const adjustment = rotationBetween(from, to);
  return normaliseRotation(multiplyRotations(adjustment, rotation));
};

export const recenterRotation = (rotation: Rotation, point: Point3D): Rotation => {
  const adjustment = rotationBetween(rotatePoint(point, rotation), FRONT);
  return normaliseRotation(multiplyRotations(adjustment, rotation));
};

export const interpolateRotation = (from: Rotation, to: Rotation, progress: number): Rotation => {
  let target = to;
  let similarity = from.x * to.x + from.y * to.y + from.z * to.z + from.w * to.w;
  if (similarity < 0) {
    target = { x: -to.x, y: -to.y, z: -to.z, w: -to.w };
    similarity = -similarity;
  }

  if (similarity > 0.9995) return normaliseRotation({
    x: from.x + (target.x - from.x) * progress,
    y: from.y + (target.y - from.y) * progress,
    z: from.z + (target.z - from.z) * progress,
    w: from.w + (target.w - from.w) * progress,
  });

  const angle = Math.acos(Math.min(1, Math.max(-1, similarity)));
  const divisor = Math.sin(angle);
  const fromWeight = Math.sin((1 - progress) * angle) / divisor;
  const toWeight = Math.sin(progress * angle) / divisor;
  return {
    x: from.x * fromWeight + target.x * toWeight,
    y: from.y * fromWeight + target.y * toWeight,
    z: from.z * fromWeight + target.z * toWeight,
    w: from.w * fromWeight + target.w * toWeight,
  };
};

export const projectTag = (point: Point3D, rotation: Rotation, bounds: ProjectionBounds): ProjectedTag => {
  const rotated = rotatePoint(point, rotation);
  const radius = Math.min(bounds.width * 0.39, bounds.height * 0.44);
  const perspective = 2.8 / (3.1 - rotated.z);
  return {
    x: bounds.width / 2 + rotated.x * radius * perspective,
    y: bounds.height / 2 + rotated.y * radius * perspective,
    z: rotated.z,
    scale: 0.72 + (rotated.z + 1) * 0.24,
  };
};
