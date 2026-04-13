import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ChevronDown } from 'lucide-react';
import { getAllFeedItems, getRandomFeaturedFeedItems, getAllFeedTags, getAvailableFeedCategories } from '@/lib/feed';
import type { FeedItem, FeedCategory } from '@/lib/feed';
import FeaturedLightbox from '@/components/FeaturedLightbox';

const INITIAL_COUNT = 10;

// Polaroid card layout configs (position + rotation)
const CARD_CONFIGS = [
  { right: '8vw',  top: '15vh', width: '280px', height: '200px', transform: 'rotate(-3deg)' },
  { right: '4vw',  top: '35vh', width: '260px', height: '180px', transform: 'rotate(4deg)'  },
  { right: '12vw', top: '52vh', width: '240px', height: '160px', transform: 'rotate(-2deg)' },
  { right: '6vw',  top: '68vh', width: '200px', height: '140px', transform: 'rotate(5deg)'  },
];

export default function HomePage() {
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | FeedCategory>('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<FeedItem | null>(null);

  const allFeedItems = getAllFeedItems();
  const heroItems = useMemo(() => getRandomFeaturedFeedItems(4), []);
  const allTags = getAllFeedTags();
  const categories = getAvailableFeedCategories();

  const filteredItems = useMemo(() => {
    let items = allFeedItems;
    if (activeCategory !== 'All') {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (activeTag) {
      items = items.filter((item) => item.tags.includes(activeTag));
    }
    return items;
  }, [allFeedItems, activeCategory, activeTag]);

  const visibleItems = expanded ? filteredItems : filteredItems.slice(0, INITIAL_COUNT);
  const hasMore = filteredItems.length > INITIAL_COUNT && !expanded;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: FeedCategory) => {
    switch (category) {
      case 'Project': return 'bg-[#D95D39]/10 text-[#D95D39]';
      case 'Writing': return 'bg-[#2D2A26]/8 text-[#2D2A26]';
      case 'Gallery': return 'bg-[#6B6560]/10 text-[#6B6560]';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen bg-[#F7F5F2] flex items-center">
        <div className="w-full max-w-7xl mx-auto flex items-center">
          {/* Left Content */}
          <div className="w-1/2 pl-[8vw] pr-8">
            <h1 className="font-display headline-xl text-[#2D2A26] mb-6">
              I build things.
            </h1>

            <p className="body-text text-lg max-w-md mb-8">
              Software, woodworking, DIY projects, 3D prints, and sometimes companies. This is where I share what I'm working on.
            </p>

            <a href="#feed" className="btn-primary inline-flex items-center gap-2">
              See what's new
              <ArrowDown size={18} />
            </a>

            <span className="annotation block mt-8 ml-4">
              (hi!)
            </span>
          </div>

          {/* Right Images - Polaroid Collage */}
          <div className="w-1/2 h-screen relative">
            {heroItems.map((item, i) => (
              <button
                key={`${item.kind}-${item.data.slug}`}
                className="image-card absolute cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
                style={CARD_CONFIGS[i]}
                onClick={() => setLightboxItem(item)}
              >
                <img src={item.image} alt={item.title} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Feed */}
      <section id="feed" className="section-flowing bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-5xl mx-auto">
          <h2 className="font-display headline-lg text-[#2D2A26] mb-8">
            Latest
          </h2>

          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <button
              onClick={() => { setActiveCategory('All'); setActiveTag(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'All' && !activeTag
                  ? 'bg-[#D95D39] text-white'
                  : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
              }`}
            >
              All ({allFeedItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveTag(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#D95D39] text-white'
                    : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
                }`}
              >
                {cat} ({allFeedItems.filter(i => i.category === cat).length})
              </button>
            ))}
          </div>

          {/* Tag filters */}
          <div className="flex items-center gap-1.5 flex-wrap mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  activeTag === tag
                    ? 'bg-[#2D2A26] text-white'
                    : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Feed list */}
          <div className="space-y-4">
            {visibleItems.map((item) => (
              <FeedCard
                key={`${item.kind}-${item.data.slug}`}
                item={item}
                formatDate={formatDate}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>

          {visibleItems.length === 0 && (
            <p className="body-text text-center text-[#6B6560] py-12">
              Nothing matches these filters.
            </p>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setExpanded(true)}
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                Show all ({filteredItems.length - INITIAL_COUNT} more)
                <ChevronDown size={16} />
              </button>
            </div>
          )}

          {expanded && filteredItems.length > INITIAL_COUNT && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setExpanded(false)}
                className="text-[#6B6560] text-sm hover:text-[#2D2A26] transition-colors"
              >
                Show less
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Lightbox */}
      {lightboxItem && (
        <FeaturedLightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </>
  );
}

function FeedCard({
  item,
  formatDate,
  getCategoryColor,
}: {
  item: FeedItem;
  formatDate: (d: string) => string;
  getCategoryColor: (c: FeedCategory) => string;
}) {
  return (
    <Link
      to={item.href}
      className="bg-white rounded-xl card-shadow group cursor-pointer hover:card-shadow-hover transition-all flex overflow-hidden block"
    >
      {/* Thumbnail */}
      {item.image && (
        <div className="w-36 h-28 flex-shrink-0 overflow-hidden hidden sm:block">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-5 flex items-center justify-between min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
              {item.category}
            </span>
            <span className="text-[#6B6560] text-sm">{formatDate(item.date)}</span>
          </div>
          <h3 className="font-display text-lg text-[#2D2A26] group-hover:text-[#D95D39] transition-colors mb-1 truncate">
            {item.title}
          </h3>
          {item.description && (
            <p className="body-text text-sm line-clamp-1">{item.description}</p>
          )}
        </div>
        <ArrowUpRight
          size={18}
          className="text-[#6B6560] group-hover:text-[#D95D39] transition-colors flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
}
