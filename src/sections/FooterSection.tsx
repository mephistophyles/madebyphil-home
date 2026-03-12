import { Mail, Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:hello@madebyphil.com' },
  { icon: Github, label: 'GitHub', href: 'https://www.github.com/mephistophyles/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/philipheijkoop/' },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#2D2A26] py-8">
      <div className="px-[6vw]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-xl text-[#F7F5F2] mb-4">
            Thanks for stopping by.
          </p>

          <div className="flex justify-center gap-6 mb-5">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-2 text-[#6B6560] hover:text-[#D95D39] transition-colors"
              >
                <link.icon size={18} />
                <span className="text-sm">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#6B6560]/20">
            <span className="text-[#6B6560] text-sm">
              © 2026 Phil. Built with curiosity.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
