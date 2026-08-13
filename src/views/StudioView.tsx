import React from 'react';

interface StudioViewProps {
  onNavigate: (tab: 'portfolio' | 'studio' | 'careers' | 'contact' | 'admin') => void;
}

export const StudioView: React.FC<StudioViewProps> = ({ onNavigate }) => {
  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-20 py-12 md:py-20 flex flex-col gap-20">
      {/* Studio Manifesto / Intro */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-[#747878]/15 pb-16">
        <div className="md:col-span-5 md:col-start-2">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#000000] mb-3">
            Structure & Void
          </h1>
          <p className="label-caps text-[#444748] uppercase tracking-widest mt-2">
            The Studio Manifesto
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-7 space-y-6">
          <p className="text-lg md:text-xl text-[#191c1d] leading-relaxed font-serif">
            At Aethelgard Architects, we believe that true architectural resonance is found in the careful calibration of presence and absence. We design not just the mass of a building, but the deliberate voids it creates.
          </p>
          <p className="text-base text-[#444748] leading-relaxed">
            Our minimalist approach is not an aesthetic choice, but a functional imperative. By stripping away the superfluous, we reveal the inherent honesty of materials and structural logic. We embrace high-contrast monochromes to articulate form with utmost clarity, allowing natural light to become a primary building material.
          </p>
          <div className="pt-4">
            <a
              href="#process"
              className="inline-flex items-center gap-2 label-caps text-[#000000] hover:text-[#a33e00] transition-colors"
            >
              Explore Process <span class="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Leadership / Team */}
      <section className="border-b border-[#747878]/15 pb-20">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#000000]">
            Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Member 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] mb-4 bg-[#f3f4f5] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLvQYCCg0YpnnY5RE3_9Xus1JFW4_9LMJIc2uYD6bu25EIo41IQjcrLJElGoPFP2UvYSzvHxczlil_4sEAK50HiCDrZ3I4decNpZuTZfktXxFe4oBwWQAg73ZKEsOsWzdLW8Cil-zONos8yvLlXBMJ6TKYRx4NrgUwQDIGuT16CFRqDRSRtB6PNtwwl9eGyxnSb768lfZIiCL2JC2Z5tQTuRIBgHTheYusotS2a2xlZe67KROqHh2V-ikL0O"
                alt="Nilesh Waman"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#000000]">Nilesh Waman</h3>
            <p className="label-caps text-[#a33e00] mb-2">Principal Architect</p>
            <p className="text-sm text-[#444748] leading-relaxed">
              Founding partner with over two decades of experience in monumental civic structures.
            </p>
          </div>

          {/* Member 2 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] mb-4 bg-[#f3f4f5] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5Lpy-7SXTTLhZUGZxqA5CivxY-CiWQw3GmczSXMvSg3AmDS5ic_jMJMStroDLeIthX0C1BJrI4ErZUTbXrOxUrfRVJZORGd1j1Cu5nEIjb-jFWM0tBvRdyaQiVD-a3cGlWWa29U-kfqltdsI6g4W4SRPkMdt_sYF5SHtROvSteznw5rqVsjY4IXdGpupztmARu4E5edAzMLoiSkP12LoOTY2eLvBQE0muwetf6OeQlW0553hGfoFeQA"
                alt="Sarah Lin"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#000000]">Sarah Lin</h3>
            <p className="label-caps text-[#a33e00] mb-2">Design Director</p>
            <p className="text-sm text-[#444748] leading-relaxed">
              Leading conceptual development, ensuring the studio's philosophy translates into spatial reality.
            </p>
          </div>

          {/* Member 3 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] mb-4 bg-[#f3f4f5] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf29n-aPIJ2B19jBLqEqy5mCoWFvPRz39qJymMPlNSdWkGBk0o5lMbXU25ykCc6HIBW3F1O5ytTwQ3r2ujJdq3y41B0VbHuHY__z7DY7yyFR196YmRrD0Z0VXHj3T7_ovPpX_ZJkXwSQrQoVuhvgUVlJyfGmW2RlsTl0KNgnnhSpz9b9NXAAJGr7w2Y9k4pK81UAEqF39o2Zn2RmNoJCxgIo42p_IQSAulnMrp5c27xcYKgbohJ4_I0w"
                alt="Marcus Thorne"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#000000]">Marcus Thorne</h3>
            <p className="label-caps text-[#a33e00] mb-2">Technical Director</p>
            <p className="text-sm text-[#444748] leading-relaxed">
              Bridging visionary design with rigorous structural engineering and material science.
            </p>
          </div>
        </div>
      </section>

      {/* Practice & Process */}
      <section id="process" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#747878]/15 pb-20">
        <div className="md:col-span-5 order-2 md:order-1">
          <div className="aspect-square bg-[#f3f4f5] overflow-hidden border border-[#747878]/15">
            <img
              src="https://lh3.googleusercontent.com/aida/AP1WRLtAJBeGOIMGk6R3tUQp36wnju1dGJ5XO5bHlxuWGLmslLyZnjWN9oJqk__OrPWthZfdmTljxbxd2jCMxRy637Lu5ieu58l4ODs-OpJ7HDeaYdH5_q6__gXobH9steeuNBG1ygIQM3cysYF7KSYPxlcDcptPcFwD9yKJM-4lNs859UpewH0N0gx4_VKARBr2cRvrKVwL147hc-Z_18iFOIAX_k102-NwIbfl5KAyJu70V_qem7VGuZx2TNE"
              alt="Model detail"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#000000]">
            Rigorous Conception
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="font-serif text-2xl text-[#a33e00] opacity-60">01</div>
              <div>
                <h4 className="font-semibold text-lg text-[#000000] mb-1">Site Symbiosis</h4>
                <p className="text-sm text-[#444748] leading-relaxed">
                  We begin with an exhaustive analysis of context, ensuring every intervention is rooted in the specific geology and cultural memory of its location.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="font-serif text-2xl text-[#a33e00] opacity-60">02</div>
              <div>
                <h4 className="font-semibold text-lg text-[#000000] mb-1">Volumetric Reduction</h4>
                <p className="text-sm text-[#444748] leading-relaxed">
                  Forms are sculpted through subtraction. We remove excess until only the essential structure remains, prioritizing the negative space it generates.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="font-serif text-2xl text-[#a33e00] opacity-60">03</div>
              <div>
                <h4 className="font-semibold text-lg text-[#000000] mb-1">Material Honesty</h4>
                <p className="text-sm text-[#444748] leading-relaxed">
                  Selection is limited to concrete, steel, glass, and raw timber. Surfaces are left exposed to age naturally, recording the passage of time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Accolades */}
      <section className="max-w-3xl mx-auto w-full">
        <h2 className="font-serif text-3xl font-bold text-[#000000] mb-8 text-center">
          Selected Accolades
        </h2>

        <ul className="divide-y divide-[#747878]/15">
          <li className="py-6 flex justify-between items-end group">
            <div>
              <h4 className="font-semibold text-lg text-[#000000] group-hover:text-[#a33e00] transition-colors">
                Pritzker-Nominated Finalist
              </h4>
              <p className="text-sm text-[#444748]">Global Architecture Foundation</p>
            </div>
            <span className="label-caps text-[#444748]">2023</span>
          </li>

          <li className="py-6 flex justify-between items-end group">
            <div>
              <h4 className="font-semibold text-lg text-[#000000] group-hover:text-[#a33e00] transition-colors">
                Excellence in Brutalist Revival
              </h4>
              <p className="text-sm text-[#444748]">International Design Institute</p>
            </div>
            <span className="label-caps text-[#444748]">2022</span>
          </li>

          <li className="py-6 flex justify-between items-end group">
            <div>
              <h4 className="font-semibold text-lg text-[#000000] group-hover:text-[#a33e00] transition-colors">
                Civic Structure of the Year
              </h4>
              <p className="text-sm text-[#444748]">ArchDaily Honors</p>
            </div>
            <span className="label-caps text-[#444748]">2021</span>
          </li>

          <li className="py-6 flex justify-between items-end group">
            <div>
              <h4 className="font-semibold text-lg text-[#000000] group-hover:text-[#a33e00] transition-colors">
                Best Minimalist Intervention
              </h4>
              <p className="text-sm text-[#444748]">Dezeen Awards</p>
            </div>
            <span className="label-caps text-[#444748]">2019</span>
          </li>
        </ul>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('careers')}
            className="bg-[#000000] text-white label-caps px-8 py-3 hover:bg-[#a33e00] transition-colors uppercase"
          >
            Explore Careers
          </button>
        </div>
      </section>
    </main>
  );
};
