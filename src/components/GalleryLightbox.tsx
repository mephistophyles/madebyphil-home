import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import type { GalleryItem } from '@/types/gallery';

interface GalleryLightboxProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const hasMultipleImages = item.images.length > 1;

  const goNext = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % item.images.length);
  }, [item.images.length]);

  const goPrev = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + item.images.length) % item.images.length);
  }, [item.images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasMultipleImages) goNext();
      if (e.key === 'ArrowLeft' && hasMultipleImages) goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goNext, goPrev, hasMultipleImages]);

  const originLabel = item.origin === 'original' ? 'Original' : item.origin === 'remix' ? 'Remix' : 'Commission';

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#2D2A26]/90 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col md:flex-row bg-[#F7F5F2] rounded-2xl overflow-hidden card-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative md:w-3/5 bg-[#2D2A26] flex items-center justify-center min-h-[300px] md:min-h-[500px]">
          <img
            src={item.images[currentImage]}
            alt={`${item.title} — image ${currentImage + 1}`}
            className="w-full h-full object-contain"
          />

          {/* Image navigation */}
          {hasMultipleImages && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {item.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImage ? 'bg-white w-6' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details panel */}
        <div className="md:w-2/5 p-6 md:p-8 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2D2A26]/10 flex items-center justify-center text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#2D2A26]/20 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Origin badge */}
          <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4 ${
            item.origin === 'original'
              ? 'bg-[#D95D39]/10 text-[#D95D39]'
              : 'bg-[#6B6560]/10 text-[#6B6560]'
          }`}>
            {originLabel}
          </span>

          <h2 className="font-display text-xl text-[#2D2A26] mb-2">
            {item.title}
          </h2>

          {item.description && (
            <p className="body-text text-sm mb-4">{item.description}</p>
          )}

          {item.content && (
            <p className="body-text text-sm mb-4">{item.content}</p>
          )}

          {/* Attribution */}
          {item.attribution && (
            <div className="bg-[#2D2A26]/5 rounded-lg p-3 mb-4">
              <p className="text-xs text-[#6B6560] mb-1">Based on a design by</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#2D2A26]">
                  {item.attribution.creator}
                </span>
                {item.attribution.url && (
                  <a
                    href={item.attribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D95D39] hover:underline"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              {item.attribution.license && (
                <p className="text-xs text-[#6B6560] mt-1">{item.attribution.license}</p>
              )}
            </div>
          )}

          {/* Meta */}
          <div className="space-y-2 text-sm text-[#6B6560] mb-4">
            {item.filament && (
              <p><span className="text-[#2D2A26] font-medium">Filament:</span> {item.filament}</p>
            )}
            {item.printer && (
              <p><span className="text-[#2D2A26] font-medium">Printer:</span> {item.printer}</p>
            )}
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#6B6560] bg-[#2D2A26]/5 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#2D2A26]/10">
            {item.tier === 'feature' && (
              <Link
                to={`/gallery/${item.slug}`}
                className="text-[#D95D39] text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all"
                onClick={onClose}
              >
                Read full writeup <ArrowUpRight size={14} />
              </Link>
            )}
            {item.project_slug && (
              <Link
                to={`/projects/${item.project_slug}`}
                className="text-[#D95D39] text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all"
                onClick={onClose}
              >
                See full project <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
