import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { applyDragRotation, applyTrackballRotation, createTagPositions, interpolateRotation, projectTag, recenterRotation, rotationForFront, type Point3D, type Rotation } from "../../lib/tagCloudProjection";
import type { TagGraph } from "../../lib/tagGraph";
import { TagExplorerPanel } from "./TagExplorerPanel";
import "./tag-cloud.css";

type TagCloudProps = { graph: TagGraph };
type Bounds = { width: number; height: number };

const displayTag = (tag: string) => tag.replaceAll("-", " ");

const pointOnTrackball = (viewport: HTMLDivElement, x: number, y: number): Point3D => {
  const bounds = viewport.getBoundingClientRect();
  const radius = Math.min(bounds.width * 0.39, bounds.height * 0.44);
  const offsetX = (x - bounds.left - bounds.width / 2) / radius;
  const offsetY = (y - bounds.top - bounds.height / 2) / radius;
  const distance = Math.hypot(offsetX, offsetY);

  if (distance >= 1) return { x: offsetX / distance, y: offsetY / distance, z: 0 };
  return { x: offsetX, y: offsetY, z: Math.sqrt(1 - distance * distance) };
};

export const TagCloud = ({ graph }: TagCloudProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<Rotation>({ x: 0, y: 0, z: 0, w: 1 });
  const pointerRef = useRef({ dragging: false, moved: false, pressedTag: "", x: 0, y: 0, trackballPoint: { x: 0, y: 0, z: 1 } });
  const lastInteractionRef = useRef(Date.now());
  const recenteringRef = useRef(false);
  const animationTokenRef = useRef(0);
  const [bounds, setBounds] = useState<Bounds>({ width: 0, height: 0 });
  const [, setFrame] = useState(0);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"occurrences" | "alphabetical">("occurrences");
  const positions = useMemo(() => createTagPositions(graph.nodes), [graph.nodes]);
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const refresh = useCallback(() => setFrame((frame) => frame + 1), []);

  useEffect(() => {
    const firstPoint = positions.get(graph.nodes[0]?.id);
    if (!firstPoint) return;
    rotationRef.current = rotationForFront(firstPoint);
    refresh();
  }, [graph.nodes, positions, refresh]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const updateBounds = () => {
      const rect = viewport.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };
    const observer = new ResizeObserver(updateBounds);
    observer.observe(viewport);
    updateBounds();
    return () => observer.disconnect();
  }, []);

  const recenter = useCallback((tagId: string) => {
    const point = positions.get(tagId);
    if (!point) return;
    const target = recenterRotation(rotationRef.current, point);
    const start = { ...rotationRef.current };
    const token = ++animationTokenRef.current;
    const started = performance.now();
    recenteringRef.current = true;
    const step = (now: number) => {
      if (token !== animationTokenRef.current) return;
      const progress = reducedMotion ? 1 : Math.min((now - started) / 420, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      rotationRef.current = interpolateRotation(start, target, eased);
      refresh();
      if (progress < 1) requestAnimationFrame(step);
      else recenteringRef.current = false;
    };
    requestAnimationFrame(step);
  }, [positions, reducedMotion, refresh]);

  useEffect(() => {
    let frameId = 0;
    const animate = () => {
      if (!reducedMotion && !pointerRef.current.dragging && !recenteringRef.current && Date.now() - lastInteractionRef.current > 1800) {
        rotationRef.current = applyDragRotation(rotationRef.current, -0.12, 0);
        refresh();
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion, refresh]);

  const select = (tagId: string, shouldRecenter = true) => {
    lastInteractionRef.current = Date.now();
    setSelectedTagId(tagId);
    if (shouldRecenter) recenter(tagId);
  };

  const projected = new Map(graph.nodes.map((node) => {
    const point = positions.get(node.id);
    return [node.id, point && bounds.width && bounds.height ? projectTag(point, rotationRef.current, bounds) : undefined];
  }));

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const tagButton = (event.target as Element).closest<HTMLButtonElement>("[data-tag]");
    pointerRef.current = {
      dragging: true,
      moved: false,
      pressedTag: tagButton?.dataset.tag ?? "",
      x: event.clientX,
      y: event.clientY,
      trackballPoint: pointOnTrackball(event.currentTarget, event.clientX, event.clientY),
    };
    recenteringRef.current = false;
    animationTokenRef.current += 1;
    lastInteractionRef.current = Date.now();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerRef.current.dragging) return;
    const dx = event.clientX - pointerRef.current.x;
    const dy = event.clientY - pointerRef.current.y;
    pointerRef.current.moved ||= Math.abs(dx) + Math.abs(dy) > 3;
    const trackballPoint = pointOnTrackball(event.currentTarget, event.clientX, event.clientY);
    rotationRef.current = applyTrackballRotation(rotationRef.current, pointerRef.current.trackballPoint, trackballPoint);
    pointerRef.current.x = event.clientX;
    pointerRef.current.y = event.clientY;
    pointerRef.current.trackballPoint = trackballPoint;
    lastInteractionRef.current = Date.now();
    refresh();
  };

  const onPointerUp = () => {
    const { moved, pressedTag } = pointerRef.current;
    pointerRef.current.dragging = false;
    pointerRef.current.pressedTag = "";
    if (!moved && pressedTag) select(pressedTag);
  };

  return <section className="tag-cloud">
    <div className="tag-cloud__intro"><p className="tag-cloud__overline">An emergent index</p><h1>The shape of<br />everything, for now.</h1><p>Every link is an accident of co-occurrence. Drag the space. Select a tag.</p></div>
    <div ref={viewportRef} className="tag-cloud__viewport" aria-label="Rotatable tag graph" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
      <svg className="tag-cloud__edges" aria-hidden="true">{graph.edges.map((edge) => {
        const source = projected.get(edge.source);
        const target = projected.get(edge.target);
        if (!source || !target) return null;
        const selected = edge.source === selectedTagId || edge.target === selectedTagId;
        return <line key={edge.id} x1={source.x} y1={source.y} x2={target.x} y2={target.y} data-selected={selected || undefined} style={{ opacity: selected ? 0.8 : Math.max(0.04, edge.weight * 0.45), strokeWidth: selected ? 1.8 : 0.5 + edge.cooccurrences * 0.35 }} />;
      })}</svg>
      <div className="tag-cloud__nodes">{graph.nodes.map((node) => {
        const position = projected.get(node.id);
        if (!position) return null;
        const selected = node.id === selectedTagId;
        return <button key={node.id} type="button" data-tag={node.id} data-selected={selected || undefined} aria-pressed={selected} style={{ left: position.x, top: position.y, opacity: Math.max(0.18, 0.5 + position.z * 0.45), zIndex: Math.round((position.z + 1) * 50), transform: `translate(-50%, -50%) scale(${position.scale + Math.log2(node.count + 1) * 0.08})` }}>{displayTag(node.id)}<sup>{node.count}</sup></button>;
      })}</div>
      <div className="tag-cloud__orbit" aria-hidden="true" />
    </div>
    <TagExplorerPanel graph={graph} selectedTagId={selectedTagId} query={query} sort={sort} onQueryChange={setQuery} onSortChange={setSort} onSelect={select} onClose={() => setSelectedTagId(null)} />
    <div className="tag-cloud__instrument"><span>{graph.nodes.length} tags · {graph.edges.length} links</span><span>Drag to rotate</span><button type="button" onClick={() => selectedTagId && recenter(selectedTagId)} disabled={!selectedTagId}>Reset view</button></div>
  </section>;
};
