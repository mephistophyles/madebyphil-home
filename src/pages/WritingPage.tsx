import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getAllArticles, getArticleCounts } from '@/lib/articles';
import type { ArticleCategory } from '@/types/article';

type FilterType = 'All' | ArticleCategory;

const categoryLabels: Record<ArticleCategory, string> = {
  Notes: 'Notes',
  Software: 'Software',
  Physical: 'Physical',
  Business: 'Business',
};

export default function WritingPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const allArticles = getAllArticles();
  const articleCounts = getArticleCounts();

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'All') {
      return allArticles;
    }
    return allArticles.filter((article) => article.category === activeFilter);
  }, [allArticles, activeFilter]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const categories = (['Notes', 'Software', 'Physical', 'Business'] as const).filter(
    (cat) => articleCounts[cat] > 0
  );

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-8 bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <h1 className="font-display headline-xl text-[#2D2A26] mb-4">
            Writing
          </h1>
          <p className="body-text text-lg max-w-2xl">
            Notes, lessons, and thoughts from building things.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-[#F7F5F2] pb-8">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'All'
                  ? 'bg-[#D95D39] text-white'
                  : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
              }`}
            >
              All ({allArticles.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category
                    ? 'bg-[#D95D39] text-white'
                    : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
                }`}
              >
                {categoryLabels[category]} ({articleCounts[category]})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="section-flowing bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/writing/${article.slug}`}
                className="bg-white rounded-xl p-6 card-shadow group cursor-pointer hover:card-shadow-hover transition-all block"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#D95D39] text-xs font-medium px-2 py-0.5 bg-[#D95D39]/10 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-[#6B6560] text-sm">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-[#2D2A26] group-hover:text-[#D95D39] transition-colors mb-1">
                      {article.title}
                    </h3>
                    <p className="body-text text-sm">{article.excerpt}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[#6B6560] group-hover:text-[#D95D39] transition-colors flex-shrink-0 mt-1"
                  />
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <p className="body-text text-center text-[#6B6560] py-12">
              No articles found for this filter.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
