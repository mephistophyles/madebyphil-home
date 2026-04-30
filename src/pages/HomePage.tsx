import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ChevronDown, ExternalLink } from 'lucide-react';
import { getAllFeedItems, getRandomFeaturedFeedItems, getAllFeedTags, getAvailableFeedCategories } from '@/lib/feed';
import type { FeedItem, FeedCategory } from '@/lib/feed';
import FeaturedLightbox from '@/components/FeaturedLightbox';

const INITIAL_COUNT = 10;

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
      <section className="min-h-screen bg-[#F7F5F2] flex items-center py-16 md:py-0">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-0 px-[6vw] md:px-0">
          {/* Left Content */}
          <div className="w-full md:w-1/2 md:pl-[8vw] md:pr-8">
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

            <span className="annotation mt-8 ml-1">
              (hi!)
            </span>
          </div>

          {/* Right Images - Polaroid Collage (desktop only, hidden on mobile) */}
          <div className="hidden md:block w-1/2 h-[600px] lg:h-screen relative overflow-hidden">
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

        {/* Mobile Gallery — Polaroid Collage (stacked below on mobile) */}
        <div className="md:hidden relative h-[45vh] max-h-[360px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {heroItems.map((item, i) => {
              const mobileConfig = MOBILE_CARD_CONFIGS[i];
              return (
                <button
                  key={`mobile-${item.kind}-${item.data.slug}`}
                  className="image-card absolute cursor-pointer transition-transform duration-300 hover:scale-105 touch-manipulation"
                  style={{
                    ...mobileConfig,
                    transform: `rotate(${mobileConfig.rotation}deg)`,
                  }}
                  onClick={() => setLightboxItem(item)}
                >
                  <img src={item.image} alt={item.title} />
                </button>
              );
            })}
          </div>

          {/* Subtle hint that it's scrollable */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[#6B6560]/40 text-xs font-handwritten pointer-events-none">
            swipe →
          </div>
        </div>
      </section>

      {/* Unified Feed */}
      <section id="feed" className="section-flowing bg-[#F7F5F2]">
        <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] max-w-5xl mx-auto">
          <h2 className="font-display headline-lg text-[#2D2A26] mb-8">
            Latest
          </h2>

          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
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
          <div className="flex items-center gap-1.5 flex-wrap mt-4 mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
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
        <div className="w-24 sm:w-32 md:w-36 h-20 sm:h-24 md:h-28 flex-shrink-0 overflow-hidden hidden sm:block">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex items-center justify-between min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
              {item.category}
            </span>
            <span className="text-[#6B6560] text-sm hidden sm:inline">{formatDate(item.date)}</span>
          </div>
          <h3 className="font-display text-base sm:text-lg text-[#2D2A26] group-hover:text-[#D95D39] transition-colors mb-1 truncate">
            {item.title}
          </h3>
          {item.description && (
            <p className="body-text text-sm line-clamp-1 hidden sm:block">{item.description}</p>
          )}
        </div>
        <ArrowUpRight
          size={18}
          className="text-[#6B6560] group-hover:text-[#D95D39] transition-colors flex-shrink-0 ml-2 sm:ml-4 opacity-0 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
}

// Desktop card configs (for the polaroid collage in the hero section)
const CARD_CONFIGS = [
   { right: '8vw',  top: '12vh', width: '260px', height: '190px', rotation: -3 },
   { right: '4vw',  top: '35vh', width: '240px', height: '170px', rotation: 4   },
   { right: '12vw', top: '55vh', width: '220px', height: '150px', rotation: -2 },
   { right: '6vw',  top: '68vh', width: '190px', height: '130px', rotation: 5   },
];

// Mobile card configs (compact polaroid collage in a ~45vh container)
const MOBILE_CARD_CONFIGS = [
   { right: '5vw', top: '8vh', width: '140px', height: '110px', rotation: -4 },
   { right: '2vw', top: '35vh', width: '130px', height: '95px', rotation: 6   },
   { right: '14vw', top: '58vh', width: '120px', height: '85px', rotation: -3 },
   { right: '7vw', top: '75vh', width: '110px', height: '75px', rotation: 7   },
];
