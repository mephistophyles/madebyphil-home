import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calendar, Tag, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGalleryItemBySlug } from '@/lib/gallery';

export default function GalleryItemPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getGalleryItemBySlug(slug) : undefined;
  const [currentImage, setCurrentImage] = useState(0);

  if (!item) {
    return (
      <section className="pt-32 pb-16 bg-[#F7F5F2] min-h-screen">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <h1 className="font-display headline-lg text-[#2D2A26] mb-4">
            Item not found
          </h1>
          <Link
            to="/gallery"
            className="text-[#D95D39] flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} />
            Back to gallery
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const originLabel = item.origin === 'original' ? 'Original Design' : item.origin === 'remix' ? 'Remix' : 'Commission';
  const hasMultipleImages = item.images.length > 1;

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-8 bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <Link
            to="/gallery"
            className="text-[#6B6560] flex items-center gap-2 hover:text-[#D95D39] transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={16} />
            Back to gallery
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              item.origin === 'original'
                ? 'bg-[#D95D39]/10 text-[#D95D39]'
                : 'bg-[#6B6560]/10 text-[#6B6560]'
            }`}>
              {originLabel}
            </span>
          </div>

          <h1 className="font-display headline-xl text-[#2D2A26] mb-4">
            {item.title}
          </h1>

          {item.description && (
            <p className="body-text text-lg text-[#6B6560] mb-6">
              {item.description}
            </p>
          )}

          <div className="flex items-center gap-6 text-sm text-[#6B6560] flex-wrap">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formattedDate}
            </span>
            {item.filament && (
              <span>Filament: {item.filament}</span>
            )}
            {item.printer && (
              <span>Printer: {item.printer}</span>
            )}
            {item.project_slug && (
              <Link
                to={`/projects/${item.project_slug}`}
                className="flex items-center gap-2 text-[#D95D39] hover:underline"
              >
                View full project
                <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Image carousel */}
      <section className="bg-[#F7F5F2] pb-4">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden card-shadow bg-[#2D2A26]">
            <img
              src={item.images[currentImage]}
              alt={`${item.title} — image ${currentImage + 1}`}
              className="w-full h-64 md:h-96 object-contain"
            />

            {hasMultipleImages && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + item.images.length) % item.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % item.images.length)}
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

          {/* Thumbnail strip */}
          {hasMultipleImages && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {item.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    i === currentImage
                      ? 'ring-2 ring-[#D95D39] ring-offset-2 ring-offset-[#F7F5F2]'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Attribution */}
      {item.attribution && (
        <section className="bg-[#F7F5F2] pb-4">
          <div className="px-[6vw] max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-5 card-shadow">
              <p className="text-xs text-[#6B6560] mb-1 uppercase tracking-wide font-medium">Attribution</p>
              <div className="flex items-center gap-3">
                <span className="font-display text-[#2D2A26]">
                  Based on a design by {item.attribution.creator}
                </span>
                {item.attribution.url && (
                  <a
                    href={item.attribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D95D39] flex items-center gap-1 text-sm hover:underline"
                  >
                    View original <ExternalLink size={14} />
                  </a>
                )}
              </div>
              {item.attribution.license && (
                <p className="text-sm text-[#6B6560] mt-1">License: {item.attribution.license}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-flowing-compact bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="font-display text-2xl text-[#2D2A26] mt-10 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-display text-xl text-[#2D2A26] mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="body-text text-[#6B6560] mb-4 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="body-text text-[#6B6560] mb-4 ml-6 list-disc space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="body-text text-[#6B6560] mb-4 ml-6 list-decimal space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="text-[#2D2A26] font-semibold">
                    {children}
                  </strong>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  if (isBlock) {
                    return (
                      <code className="block bg-[#2D2A26] text-[#F7F5F2] p-4 rounded-lg text-sm overflow-x-auto my-4">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="bg-[#2D2A26]/10 text-[#2D2A26] px-1.5 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-[#2D2A26] text-[#F7F5F2] p-4 rounded-lg text-sm overflow-x-auto my-4">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#D95D39] pl-4 my-4 italic text-[#6B6560]">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {item.content}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#2D2A26]/10">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={16} className="text-[#6B6560]" />
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-[#6B6560] bg-[#2D2A26]/5 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
