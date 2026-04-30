import { NavLink } from 'react-router-dom';
import { clioNavItems } from '@/lib/clio';

export default function ClioSubnav() {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] border-b border-white/10 bg-[#0B1120]/85 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto py-4 flex flex-wrap gap-2">
        {clioNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/clio'}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-[#6EE7B7] text-[#08111f] font-medium'
                  : 'bg-white/[0.03] text-[#C5CEDD] hover:bg-white/[0.08] hover:text-white border border-white/10'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
