import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './Navigation';
import FooterSection from '../sections/FooterSection';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative bg-[#F7F5F2] min-h-screen">
      <Navigation />
      <main className="relative">
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
