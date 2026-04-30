export default function AboutPage() {
  return (
     <>
        {/* Page Header */}
        <section className="pt-24 sm:pt-32 pb-6 sm:pb-8 bg-[#F7F5F2]">
          <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw] max-w-4xl mx-auto">
            <h1 className="font-display headline-xl text-[#2D2A26] mb-4 text-balance">
            About
            </h1>
          </div>
        </section>

        {/* About Content */}
        <section className="section-flowing bg-[#F7F5F2]">
          <div className="px-4 sm:px-6 md:px-8 lg:px-[6vw]">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 sm:gap-12">
              <div>
                <div className="image-card w-48 sm:w-56 md:w-64 h-60 sm:h-72 md:h-80 flex-shrink-0 mx-auto">
                  <img
                    src="/phil_portrait.jpeg"
                    alt="Portrait of Phil outside a hiking trail in Iceland"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center sm:text-left w-full">
                <p className="body-text text-base sm:text-lg mb-4 sm:mb-6">
                I build things because I enjoy the process of turning ideas into reality. Sometimes that's code, sometimes that's wood, sometimes it's something entirely different.
                </p>

                <p className="body-text mb-4 sm:mb-6">
                I don't have a grand plan. I just like making stuff and sharing what I learn along the way. This site is a collection of those things.
                </p>

                <div className="flex justify-center sm:justify-start gap-6 sm:gap-8 pt-4">
                  <div>
                    <span className="font-display text-2xl sm:text-3xl text-[#D95D39]">25+</span>
                    <p className="body-text text-sm mt-1">Projects shared</p>
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl text-[#D95D39]">3</span>
                    <p className="body-text text-sm mt-1">Companies built</p>
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl text-[#D95D39]">&#8734;</span>
                    <p className="body-text text-sm mt-1">Lessons learned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}
