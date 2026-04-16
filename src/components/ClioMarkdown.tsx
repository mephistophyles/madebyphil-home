import ReactMarkdown from 'react-markdown';

interface ClioMarkdownProps {
  content: string;
  className?: string;
}

export default function ClioMarkdown({ content, className }: ClioMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="text-[#C5CEDD] leading-7 mb-4 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 ml-5 list-disc space-y-2 text-[#C5CEDD] leading-7 last:mb-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-5 list-decimal space-y-2 text-[#C5CEDD] leading-7 last:mb-0">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-[#E5E7EB]">{children}</em>,
          code: ({ children }) => (
            <code className="rounded bg-white/8 px-1.5 py-0.5 text-sm text-[#E5E7EB]">{children}</code>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-[#6EE7B7] underline decoration-[#6EE7B7]/40 underline-offset-4 hover:text-white">
              {children}
            </a>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-xl text-white mt-8 mb-3 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-lg text-white mt-6 mb-2 first:mt-0">{children}</h3>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
