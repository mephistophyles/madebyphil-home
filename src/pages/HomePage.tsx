import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { getFeaturedProjects, getRandomFeaturedProjects } from '@/lib/projects';
import { getRecentArticles } from '@/lib/articles';

// Polaroid card layout configs (position + rotation)
const CARD_CONFIGS = [
  { right: '8vw',  top: '15vh', width: '280px', height: '200px', transform: 'rotate(-3deg)' },
  { right: '4vw',  top: '35vh', width: '260px', height: '180px', transform: 'rotate(4deg)'  },
  { right: '12vw', top: '52vh', width: '240px', height: '160px', transform: 'rotate(-2deg)' },
  { right: '6vw',  top: '68vh', width: '200px', height: '140px', transform: 'rotate(5deg)'  },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const heroProjects = getRandomFeaturedProjects(4);
  const recentArticles = getRecentArticles(3);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen bg-[#F7F5F2] flex items-center">
        <div className="w-full flex items-center">
          {/* Left Content */}
          <div className="w-1/2 pl-[8vw] pr-8">
            <h1 className="font-display headline-xl text-[#2D2A26] mb-6">
              I build things.
            </h1>

            <p className="body-text text-lg max-w-md mb-8">
              Software, woodworking, DIY projects, 3D prints, and sometimes companies. This is where I share what I'm working on.
            </p>

            <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
              Explore projects
              <ArrowDown size={18} />
            </Link>

            <span className="annotation block mt-8 ml-4">
              (hi!)
            </span>
          </div>

          {/* Right Images - Polaroid Collage */}
          <div className="w-1/2 h-screen relative">
            {heroProjects.map((project, i) => (
              <div
                key={project.slug}
                className="image-card absolute"
                style={CARD_CONFIGS[i]}
              >
                <img src={project.image} alt={`Logo for ${project.title}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="section-flowing bg-[#F7F5F2]">
        <div className="w-full px-[6vw]">
          <div className="flex items-center justify-between mb-10 max-w-5xl mx-auto">
            <h2 className="font-display headline-lg text-[#2D2A26]">
              Featured builds
            </h2>
            <Link to="/projects" className="text-[#D95D39] flex items-center gap-1 hover:gap-2 transition-all text-sm">
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="project-card group cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[#D95D39] text-xs font-medium uppercase tracking-wide">
                    {project.type}
                  </span>
                  <h3 className="font-display text-lg text-[#2D2A26] mt-1 mb-2">
                    {project.title}
                  </h3>
                  <p className="body-text text-sm">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Writing Preview */}
      <section className="section-flowing bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display headline-lg text-[#2D2A26]">
              Writing
            </h2>
            <Link to="/writing" className="text-[#D95D39] flex items-center gap-1 hover:gap-2 transition-all text-sm">
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {recentArticles.map((article) => (
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
                      <span className="text-[#6B6560] text-sm">{formatDate(article.date)}</span>
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
        </div>
      </section>
    </>
  );
}
