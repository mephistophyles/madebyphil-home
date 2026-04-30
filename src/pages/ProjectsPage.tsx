import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getAllProjects, getProjectCounts, getAvailableProjectTypes } from '@/lib/projects';
import type { ProjectType } from '@/types/project';

type FilterType = 'All' | ProjectType;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const allProjects = getAllProjects();
  const projectCounts = getProjectCounts();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return allProjects;
    }
    return allProjects.filter((project) => project.type === activeFilter);
  }, [allProjects, activeFilter]);

  const types = getAvailableProjectTypes();

  return (
    <>
       {/* Page Header */}
       <section className="pt-24 sm:pt-32 pb-6 sm:pb-8 bg-[#F7F5F2]">
         <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] max-w-5xl mx-auto">
           <h1 className="font-display headline-xl text-[#2D2A26] mb-4 text-balance">
            Projects
           </h1>
           <p className="body-text text-lg max-w-2xl">
            A collection of things I've built—software, physical projects, and
            business ventures.
           </p>
         </div>
       </section>

       {/* Filter Tabs */}
       <section className="bg-[#F7F5F2] pb-4">
         <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] max-w-5xl mx-auto">
           <div className="flex items-center gap-2 flex-wrap">
             <button
              onClick={() => setActiveFilter('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'All'
                   ? 'bg-[#D95D39] text-white'
                   : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
               }`}
             >
              All ({allProjects.length})
             </button>
             {types.map((type) => (
               <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === type
                     ? 'bg-[#D95D39] text-white'
                     : 'bg-[#2D2A26]/5 text-[#6B6560] hover:bg-[#2D2A26]/10'
                 }`}
               >
                 {type} ({projectCounts[type]})
               </button>
             ))}
           </div>
         </div>
       </section>

       {/* Projects List */}
       <section className="section-flowing-compact bg-[#F7F5F2]">
         <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] max-w-5xl mx-auto">
           <div className="space-y-4 sm:space-y-6">
             {filteredProjects.map((project) => (
               <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="bg-white rounded-xl card-shadow flex overflow-hidden group cursor-pointer hover:card-shadow-hover transition-all block"
               >
                 {/* Image */}
                 <div className="w-20 sm:w-32 md:w-48 h-16 sm:h-20 md:h-24 lg:h-36 flex-shrink-0 overflow-hidden">
                   <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                 </div>

                 {/* Content */}
                 <div className="flex-1 p-3 sm:p-4 md:p-5 flex items-center justify-between min-w-0">
                   <div className="min-w-0">
                     <div className="flex items-center gap-2 mb-1 sm:mb-2 flex-wrap">
                       <span className="text-[#D95D39] text-xs font-medium px-2 py-0.5 bg-[#D95D39]/10 rounded-full">
                         {project.type}
                       </span>
                       {project.status === 'in-progress' && (
                         <span className="text-[#6B6560] text-xs font-medium px-2 py-0.5 bg-[#6B6560]/10 rounded-full">
                          In Progress
                         </span>
                       )}
                     </div>
                     <h3 className="font-display text-lg sm:text-xl text-[#2D2A26] group-hover:text-[#D95D39] transition-colors mb-1 sm:mb-2 truncate">
                       {project.title}
                     </h3>
                     <p className="body-text text-xs sm:text-sm max-w-lg line-clamp-2 sm:line-clamp-none">
                       {project.description}
                     </p>
                   </div>
                   <ArrowUpRight
                    size={20}
                    className="text-[#6B6560] group-hover:text-[#D95D39] transition-colors opacity-0 sm:opacity-100 group-hover:opacity-0 sm:group-hover:opacity-100 flex-shrink-0 ml-2 md:ml-4"
                   />
                 </div>
               </Link>
             ))}
           </div>

           {filteredProjects.length === 0 && (
             <p className="body-text text-center text-[#6B6560] py-12">
              No projects found for this filter.
             </p>
           )}
         </div>
       </section>
     </>
   );
}
