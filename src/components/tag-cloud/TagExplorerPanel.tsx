import { Link } from "react-router-dom";
import type { TagGraph, TagNode } from "../../lib/tagGraph";

type TagExplorerPanelProps = {
  graph: TagGraph;
  selectedTagId: string | null;
  query: string;
  sort: "occurrences" | "alphabetical";
  onQueryChange: (query: string) => void;
  onSortChange: (sort: "occurrences" | "alphabetical") => void;
  onSelect: (tagId: string) => void;
  onClose: () => void;
};

const displayTag = (tag: string) => tag.replaceAll("-", " ");

const sortNodes = (nodes: TagNode[], sort: "occurrences" | "alphabetical") => [...nodes].sort((a, b) => {
  if (sort === "alphabetical") return displayTag(a.id).localeCompare(displayTag(b.id));
  return b.count - a.count || displayTag(a.id).localeCompare(displayTag(b.id));
});

export const TagExplorerPanel = ({ graph, selectedTagId, query, sort, onQueryChange, onSortChange, onSelect, onClose }: TagExplorerPanelProps) => {
  const selectedNode = graph.nodes.find((node) => node.id === selectedTagId);
  const selectedItems = selectedNode
    ? selectedNode.contentIds.map((id) => graph.content.find((item) => item.id === id)).filter(Boolean)
    : [];

  if (selectedNode) return (
    <aside className="tag-cloud__panel" aria-live="polite">
      <p className="tag-cloud__overline">Selected tag · {selectedNode.count} {selectedNode.count === 1 ? "document" : "documents"}</p>
      <div className="tag-cloud__detail-heading">
        <h2>{displayTag(selectedNode.id)}</h2>
        <button type="button" className="tag-cloud__close" onClick={onClose} aria-label={`Close ${displayTag(selectedNode.id)} results`}>×</button>
      </div>
      <div className="tag-cloud__results">
        {selectedItems.map((item) => item && (
          <Link to={item.href} key={item.id}>
            <span>{item.typeLabel}</span>
            <strong>{item.title}</strong>
            <small>{item.meta} ↗</small>
          </Link>
        ))}
      </div>
    </aside>
  );

  const visibleNodes = sortNodes(graph.nodes.filter((node) => displayTag(node.id).includes(query.trim().toLowerCase())), sort);
  return (
    <aside className="tag-cloud__panel tag-cloud__finder" aria-label="Tag finder">
      <div className="tag-cloud__finder-heading">
        <p className="tag-cloud__overline">Find a tag</p>
        <label htmlFor="tag-search">Search tags</label>
        <input id="tag-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search the index" autoComplete="off" />
      </div>
      <label htmlFor="tag-sort">Sort tags</label>
      <select id="tag-sort" value={sort} onChange={(event) => onSortChange(event.target.value as typeof sort)}>
        <option value="occurrences">Most occurrences</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
      <p className="tag-cloud__tag-count" aria-live="polite">{visibleNodes.length} {visibleNodes.length === 1 ? "tag" : "tags"}</p>
      <div className="tag-cloud__tag-list">
        {visibleNodes.map((node) => <button key={node.id} type="button" onClick={() => onSelect(node.id)}><span>{displayTag(node.id)}</span><sup>{node.count}</sup></button>)}
      </div>
    </aside>
  );
};
