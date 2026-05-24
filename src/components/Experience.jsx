import { useRef, useState } from "react";

import { experiences } from "../constants";
import ExperienceModal from "./ExperienceModal";

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);

  const scrollRef = useRef(null);

  // newest on right
  const orderedExperiences = [...experiences].reverse();

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section id="experience" className="experience-section section">
      <div className="container-2">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="headline-2 mb-3">Experience Timeline</h2>

            <p className="text-zinc-400 max-w-2xl">
              Building across AI systems, streaming infrastructure, low-level
              tooling, frontend architecture and backend systems.
            </p>
          </div>

          {/* DESKTOP ARROWS */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="
                w-11 h-11
                rounded-full

                bg-zinc-800
                border border-zinc-700

                flex items-center justify-center

                hover:border-cyan-400/40
                transition-all
              "
            >
              ←
            </button>

            <button
              onClick={() => scroll("right")}
              className="
                w-11 h-11
                rounded-full

                bg-zinc-800
                border border-zinc-700

                flex items-center justify-center

                hover:border-cyan-400/40
                transition-all
              "
            >
              →
            </button>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          {/* LINE */}
          <div
            className="
              absolute

              md:top-[230px]
              top-0
              bottom-0

              md:left-0
              left-[19px]

              md:w-full
              w-[2px]

              md:h-[2px]
              h-auto

              md:bg-zinc-700
              bg-cyan-400/40

              md:bottom-auto
              z-0
            "
          />

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="
              flex
              flex-col
              md:flex-row
              gap-6
              md:gap-5

              md:overflow-x-auto

              scroll-smooth
              scrollbar-hide

              md:pt-5
              md:pb-6

              relative
              z-10
            "
          >
            {orderedExperiences.map((exp, index) => {
              const isTop = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="
                    w-full
                    md:min-w-[240px]
                    md:max-w-[240px]

                    flex-shrink-0

                    relative

                    md:h-[440px]
                    h-auto
                  "
                >
                  {/* DESKTOP ALTERNATING */}
                  <div className="hidden md:flex flex-col items-center">
                    {/* TOP CARD */}
                    {isTop && (
                      <div
                        onClick={() => setSelectedExperience(exp)}
                        className="
                          h-[170px]
                          w-full

                          bg-zinc-800/80
                          backdrop-blur-sm

                          border border-zinc-700

                          rounded-xl
                          p-4

                          cursor-pointer

                          transition-all
                          duration-300

                          hover:border-cyan-400/30
                          hover:-translate-y-2
                        "
                      >
                        {/* HEADER */}
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="
                              w-10 h-10
                              rounded-lg
                              object-cover
                              bg-white
                              flex-shrink-0
                            "
                          />

                          <div>
                            <h3 className="text-white text-sm font-semibold leading-tight">
                              {exp.role}
                            </h3>

                            <p className="text-zinc-400 text-xs">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        <p className="text-zinc-500 text-xs mb-5">
                          {exp.duration}
                        </p>

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-2

                            px-3 py-1.5
                            rounded-full

                            bg-zinc-700/60
                            border
                            border-zinc-600
                            text-zinc-200
                            text-xs

                            hover:border-cyan-400/40
                            hover:text-cyan-300
                            transition-colors
                          "
                        >
                          More info →
                        </div>
                      </div>
                    )}

                    {/* SPACER */}
                    {!isTop && <div className="h-[170px]" />}

                    {/* DOT */}
                    <div
                      className="
                        w-4 h-4
                        rounded-full

                        bg-cyan-400

                        shadow-[0_0_20px_rgba(34,211,238,0.7)]
                        my-8


                        relative
                        z-10
                      "
                    />

                    {/* BOTTOM CARD */}
                    {!isTop && (
                      <div
                        onClick={() => setSelectedExperience(exp)}
                        className="
                          h-[170px]
                          w-full

                          bg-zinc-800/80
                          backdrop-blur-sm

                          border border-zinc-700

                          rounded-xl
                          p-4

                          cursor-pointer

                          transition-all
                          duration-300

                          hover:border-cyan-400/30
                          hover:-translate-y-2
                        "
                      >
                        {/* HEADER */}
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="
                              w-10 h-10
                              rounded-lg
                              object-cover
                              bg-white
                              flex-shrink-0
                            "
                          />

                          <div>
                            <h3 className="text-white text-sm font-semibold leading-tight">
                              {exp.role}
                            </h3>

                            <p className="text-zinc-400 text-xs">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        <p className="text-zinc-500 text-xs mb-5">
                          {exp.duration}
                        </p>

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-2

                            px-3 py-1.5
                            rounded-full

                            bg-zinc-700/60
                            border
                            border-zinc-600
                            text-zinc-200
                            text-xs

                            hover:border-cyan-400/40
                            hover:text-cyan-300
                            transition-colors
                          "
                        >
                          More info →
                        </div>
                      </div>
                    )}

                    {/* SPACER */}
                    {isTop && <div className="h-[170px]" />}
                  </div>

                  {/* MOBILE */}
                  <div className="md:hidden grid grid-cols-[40px_minmax(0,1fr)] gap-4 !opacity-100 !transform-none">
                    {/* DOT */}
                    <div
                      className="
                        w-4 h-4
                        rounded-full

                        bg-cyan-400

                        shadow-[0_0_20px_rgba(34,211,238,0.7)]

                        mt-6
                        mx-auto
                        relative
                        z-10
                      "
                    />

                    {/* CARD */}
                    <div
                      onClick={() => setSelectedExperience(exp)}
                      className="
                        relative
                        z-10
                        min-h-[170px]

                        bg-zinc-800/80
                        backdrop-blur-sm

                        border border-zinc-700

                        rounded-xl
                        p-4

                        cursor-pointer

                        transition-all
                        duration-300

                        hover:border-cyan-400/30
                      "
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="
                            w-10 h-10
                            rounded-lg
                            object-cover
                            bg-white
                            flex-shrink-0
                          "
                        />

                        <div>
                          <h3 className="text-white text-sm font-semibold leading-tight">
                            {exp.role}
                          </h3>

                          <p className="text-zinc-400 text-xs">{exp.company}</p>
                        </div>
                      </div>

                      <p className="text-zinc-500 text-xs mb-5">
                        {exp.duration}
                      </p>

                      <div
                        className="
                          inline-flex
                          items-center
                          gap-2

                          px-3 py-1.5
                          rounded-full

                          bg-zinc-700/60
                          border
                          border-zinc-600
                          text-zinc-200
                          text-xs

                          hover:border-cyan-400/40
                          hover:text-cyan-300
                          transition-colors
                        "
                      >
                        More info →
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MODAL */}
      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </section>
  );
};

export default Experience;
