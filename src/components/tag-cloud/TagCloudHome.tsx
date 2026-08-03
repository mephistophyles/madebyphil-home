import { useMemo } from "react";
import { getTagGraph } from "../../lib/tagGraph";
import { TagCloud } from "./TagCloud";

export const TagCloudHome = () => {
  const graph = useMemo(() => getTagGraph(), []);
  return <main className="tag-cloud-home"><TagCloud graph={graph} /></main>;
};
