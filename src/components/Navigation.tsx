import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Clio', to: '/clio' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Writing', to: '/writing' },
  { label: 'About', to: '/about' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isClioRoute = pathname.startsWith('/clio');

  const navBackgroundClass = isClioRoute
    ? isScrolled
      ? 'bg-[#0B1120]/92 backdrop-blur-lg py-4 border-b border-white/10'
      : 'bg-transparent py-6'
    : isScrolled
      ? 'bg-[#F7F5F2] py-4'
      : 'bg-transparent py-6';

  const logoTextClass = isClioRoute && !isScrolled ? 'text-white' : 'text-[#2D2A26]';
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    if (isClioRoute) {
      return isActive
        ? 'text-[#6EE7B7] font-medium text-sm'
        : `text-sm transition-colors duration-200 ${isScrolled ? 'text-[#C5CEDD] hover:text-white' : 'text-white/78 hover:text-white'}`;
    }

    return isActive
      ? 'text-[#D95D39] font-medium text-sm'
      : 'nav-link';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${navBackgroundClass}`}
      >
        <div className="max-w-7xl mx-auto px-[6vw] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className={`font-display text-lg transition-colors ${logoTextClass}`}>Made By Phil</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={navLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            className={`md:hidden transition-colors ${isClioRoute && !isScrolled ? 'text-white' : 'text-[#2D2A26]'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[999] backdrop-blur-lg transition-all duration-300 md:hidden ${
          isClioRoute ? 'bg-[#0B1120]/98' : 'bg-[#F7F5F2]/98'
        } ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `font-display text-2xl transition-colors ${
                  isClioRoute
                    ? isActive
                      ? 'text-[#6EE7B7]'
                      : 'text-white hover:text-[#8FB4FF]'
                    : isActive
                      ? 'text-[#D95D39]'
                      : 'text-[#2D2A26] hover:text-[#D95D39]'
                }`
              }
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
