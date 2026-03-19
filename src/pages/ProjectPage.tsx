import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getProjectBySlug } from '@/lib/projects';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <section className="pt-32 pb-16 bg-[#F7F5F2] min-h-screen">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <h1 className="font-display headline-lg text-[#2D2A26] mb-4">
            Project not found
          </h1>
          <Link
            to="/projects"
            className="text-[#D95D39] flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} />
            Back to projects
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-8 bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <Link
            to="/projects"
            className="text-[#6B6560] flex items-center gap-2 hover:text-[#D95D39] transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#D95D39] text-sm font-medium px-3 py-1 bg-[#D95D39]/10 rounded-full">
              {project.type}
            </span>
            {project.status === 'in-progress' && (
              <span className="text-[#6B6560] text-sm font-medium px-3 py-1 bg-[#6B6560]/10 rounded-full">
                In Progress
              </span>
            )}
          </div>

          <h1 className="font-display headline-xl text-[#2D2A26] mb-4">
            {project.title}
          </h1>

          <p className="body-text text-lg text-[#6B6560] mb-6">
            {project.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-[#6B6560]">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formattedDate}
            </span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#D95D39] hover:underline"
              >
                View project
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-[#F7F5F2] pb-4">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden card-shadow">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>
      </section>

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
              {project.content}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#2D2A26]/10">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={16} className="text-[#6B6560]" />
                {project.tags.map((tag) => (
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
