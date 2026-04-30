import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import type { FeedItem } from '@/lib/feed';

interface FeaturedLightboxProps {
  item: FeedItem;
  onClose: () => void;
}

export default function FeaturedLightbox({ item, onClose }: FeaturedLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#2D2A26]/90 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-2xl mx-4 bg-[#F7F5F2] rounded-2xl overflow-hidden card-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#2D2A26]/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#2D2A26]/60 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Image */}
        {item.image && (
          <div className="h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden bg-[#2D2A26]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Details */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#D95D39] text-xs font-medium px-2.5 py-1 bg-[#D95D39]/10 rounded-full">
              {item.category}
            </span>
            <span className="text-[#6B6560] text-sm">{formatDate(item.date)}</span>
          </div>

          <h2 className="font-display text-2xl text-[#2D2A26] mb-3">
            {item.title}
          </h2>

          {item.description && (
            <p className="body-text text-sm mb-5">{item.description}</p>
          )}

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

          <Link
            to={item.href}
            className="btn-primary inline-flex items-center gap-2 text-sm"
            onClick={onClose}
          >
            View full {item.category.toLowerCase() === 'writing' ? 'article' : item.category.toLowerCase()}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
