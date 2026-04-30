import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getArticleBySlug } from '@/lib/articles';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
         <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-[#F7F5F2] min-h-screen">
           <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] max-w-5xl mx-auto">
             <h1 className="font-display headline-lg text-[#2D2A26] mb-4">
            Article not found
             </h1>
             <Link
              to="/writing"
              className="text-[#D95D39] flex items-center gap-2 hover:gap-3 transition-all"
              >
                <ArrowLeft size={18} />
              Back to writing
              </Link>
            </div>
          </section>
        );
    }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    });

  return (
      <>
         {/* Header */}
          <section className="pt-24 sm:pt-32 pb-3 sm:pb-4 bg-[#F7F5F2]">
            <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] max-w-5xl mx-auto">
              <Link
              to="/writing"
              className="text-[#6B6560] flex items-center gap-2 hover:text-[#D95D39] transition-colors mb-6 sm:mb-8 text-sm"
              >
                 <ArrowLeft size={16} />
                Back to writing
              </Link>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-[#D95D39] text-sm font-medium px-3 py-1 bg-[#D95D39]/10 rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-2 text-[#6B6560] text-sm">
                    <Calendar size={14} />
                    {formattedDate}
                  </span>
                </div>

              <h1 className="font-display headline-xl text-[#2D2A26] mb-4 text-balance">
                {article.title}
              </h1>

            </div>
          </section>

         {/* Content */}
          <section className="section-flowing-compact bg-[#F7F5F2]">
            <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] max-w-5xl mx-auto">
              <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[#2D2A26] prose-p:text-[#6B6560] prose-a:text-[#D95D39] prose-img:rounded-xl">
                  <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                        <h2 className="font-display text-xl sm:text-2xl text-[#2D2A26] mt-8 sm:mt-10 mb-3 sm:mb-4">
                          {children}
                        </h2>
                      ),
                    h3: ({ children }) => (
                        <h3 className="font-display text-lg sm:text-xl text-[#2D2A26] mt-6 sm:mt-8 mb-2 sm:mb-3">
                          {children}
                        </h3>
                      ),
                    p: ({ children }) => (
                        <p className="body-text text-[#6B6560] mb-4 leading-relaxed text-sm sm:text-base">
                          {children}
                        </p>
                      ),
                    ul: ({ children }) => (
                        <ul className="body-text text-[#6B6560] mb-4 ml-6 list-disc space-y-1 sm:space-y-2">
                          {children}
                        </ul>
                      ),
                    ol: ({ children }) => (
                        <ol className="body-text text-[#6B6560] mb-4 ml-6 list-decimal space-y-1 sm:space-y-2">
                          {children}
                        </ol>
                      ),
                    li: ({ children }) => (
                        <li className="leading-relaxed">
                          {children}
                        </li>
                      ),
                    code: ({ children, className }) => {
                      const isBlock = className?.includes('language-');
                      if (isBlock) {
                        return (
                            <code className="block bg-[#2D2A26] text-[#F7F5F2] p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto my-4">
                              {children}
                            </code>
                          );
                       }
                      return (
                          <code className="bg-[#2D2A26]/10 text-[#2D2A26] px-1.5 py-0.5 rounded text-xs sm:text-sm">
                            {children}
                          </code>
                        );
                     },
                    pre: ({ children }) => (
                        <pre className="bg-[#2D2A26] text-[#F7F5F2] p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto my-4">
                          {children}
                        </pre>
                      ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-[#D95D39] pl-4 my-4 italic text-[#6B6560] text-sm sm:text-base">
                          {children}
                        </blockquote>
                      ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full border-collapse border border-[#2D2A26]/20 text-sm sm:text-base">
                            {children}
                          </table>
                        </div>
                      ),
                    th: ({ children }) => (
                        <th className="border border-[#2D2A26]/20 bg-[#2D2A26]/5 px-2 sm:px-4 py-2 font-semibold text-left">
                          {children}
                        </th>
                      ),
                    td: ({ children }) => (
                        <td className="border border-[#2D2A26]/20 px-2 sm:px-4 py-2">
                          {children}
                        </td>
                      ),
                   }}
                  >
                    {article.content}
                  </ReactMarkdown>
              </article>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#2D2A26]/10">
                  <div className="flex items-center gap-2 flex-wrap -mx-1 px-1">
                    <Tag size={16} className="text-[#6B6560]" />
                    {article.tags.map((tag) => (
                        <span
                        key={tag}
                        className="text-xs sm:text-sm text-[#6B6560] bg-[#2D2A26]/5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
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
