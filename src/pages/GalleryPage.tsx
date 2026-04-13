import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGalleryItems, getGalleryItemCounts, getAvailableOrigins } from '@/lib/gallery';
import GalleryLightbox from '@/components/GalleryLightbox';
import type { GalleryItem, GalleryOrigin } from '@/types/gallery';

type FilterType = 'All' | GalleryOrigin;

const ORIGIN_LABELS: Record<GalleryOrigin, string> = {
  original: 'Original',
  remix: 'Remix',
  commission: 'Commission',
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const navigate = useNavigate();

  const allItems = getAllGalleryItems();
  const itemCounts = getGalleryItemCounts();
  const origins = getAvailableOrigins();

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return allItems;
    return allItems.filter((item) => item.origin === activeFilter);
  }, [allItems, activeFilter]);

  const handleCardClick = useCallback((item: GalleryItem) => {
    if (item.tier === 'feature') {
      navigate(`/gallery/${item.slug}`);
    } else {
      setLightboxItem(item);
    }
  }, [navigate]);

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-8 bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-6xl mx-auto">
          <h1 className="font-display headline-xl text-[#2D2A26] mb-4">
            Gallery
          </h1>
          <p className="body-text text-lg max-w-2xl">
            3D prints, models, and makes — from quick prints to custom designs.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-[#F7F5F2] pb-4">
        <div className="px-[6vw] max-w-6xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'All'
                  ? 'bg-[#D95D39] text-white'
                  : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
              }`}
            >
              All ({allItems.length})
            </button>
            {origins.map((origin) => (
              <button
                key={origin}
                onClick={() => setActiveFilter(origin)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === origin
                    ? 'bg-[#D95D39] text-white'
                    : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
                }`}
              >
                {ORIGIN_LABELS[origin]} ({itemCounts[origin]})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-flowing-compact bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filteredItems.map((item) => (
              <div
                key={item.slug}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                <div className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Image count badge */}
                    {item.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-[#2D2A26]/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {item.images.length} photos
                      </div>
                    )}

                    {/* Title on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="font-display text-lg text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.origin === 'original'
                          ? 'bg-[#D95D39]/10 text-[#D95D39]'
                          : 'bg-[#6B6560]/10 text-[#6B6560]'
                      }`}>
                        {ORIGIN_LABELS[item.origin]}
                      </span>

                      {item.filament && (
                        <span className="text-xs text-[#6B6560]">
                          {item.filament}
                        </span>
                      )}
                    </div>

                    {/* Show title below when not hovered (visible by default, hidden on hover as it appears on image) */}
                    <h3 className="font-display text-base text-[#2D2A26] mt-2 group-hover:text-[#D95D39] transition-colors">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="body-text text-xs mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="body-text text-center text-[#6B6560] py-12">
              No items found for this filter.
            </p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <GalleryLightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </>
  );
}
