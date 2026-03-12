export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-8 bg-[#F7F5F2]">
        <div className="px-[6vw] max-w-4xl mx-auto">
          <h1 className="font-display headline-xl text-[#2D2A26]">
            About
          </h1>
        </div>
      </section>

      {/* About Content */}
      <section className="section-flowing bg-[#F7F5F2]">
        <div className="px-[6vw]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="image-card w-64 h-80 flex-shrink-0">
              <img
                src="/phil_portrait.jpeg"
                alt="Portrait of Phil outside a hiking trail in Iceland"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="body-text text-lg mb-6">
                I build things because I enjoy the process of turning ideas into reality. Sometimes that's code, sometimes that's wood, sometimes it's something entirely different.
              </p>

              <p className="body-text mb-6">
                I don't have a grand plan. I just like making stuff and sharing what I learn along the way. This site is a collection of those things.
              </p>

              <div className="flex gap-8 pt-4">
                <div>
                  <span className="font-display text-3xl text-[#D95D39]">25+</span>
                  <p className="body-text text-sm mt-1">Projects shared</p>
                </div>
                <div>
                  <span className="font-display text-3xl text-[#D95D39]">3</span>
                  <p className="body-text text-sm mt-1">Companies built</p>
                </div>
                <div>
                  <span className="font-display text-3xl text-[#D95D39]">∞</span>
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
