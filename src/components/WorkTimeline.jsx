import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import workTimelineData from "../data/workTimeline.json";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TimelineModal = ({ isOpen, entry, onClose, onNext, onPrev }) => {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  const closeWithAnimation = useCallback(() => {
    const timeline = gsap.timeline({ onComplete: onClose });
    timeline
      .to(dialogRef.current, {
        opacity: 0,
        y: 16,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.in",
      })
      .to(overlayRef.current, { opacity: 0, duration: 0.18 }, 0);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeWithAnimation();
      } else if (event.key === "ArrowRight") {
        onNext();
      } else if (event.key === "ArrowLeft") {
        onPrev();
      }
    };

    const timeline = gsap.timeline();
    timeline
      .to(overlayRef.current, { opacity: 1, duration: 0.2 })
      .fromTo(
        dialogRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
        0
      );

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeWithAnimation, isOpen, onNext, onPrev]);

  if (!isOpen || !entry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0"
        onClick={closeWithAnimation}
      />
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-zinc-800 p-6 md:p-8 shadow-xl ring-1 ring-inset ring-zinc-50/10"
      >
        <button
          onClick={closeWithAnimation}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 transition-colors hover:bg-zinc-600"
          aria-label="Close timeline details"
        >
          <span className="material-symbols-rounded">close</span>
        </button>

        <div className="mb-5">
          <p className="text-xs uppercase tracking-wider text-amber-300">
            {entry.current ? "Current Role" : "Past Role"}
          </p>
          <h3 className="text-2xl font-semibold mt-1">{entry.title}</h3>
          <a
            href={entry.companyUrl || workTimelineData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-zinc-300 hover:text-zinc-100"
          >
            {entry.company}
          </a>
          <p className="mt-3 text-sm text-zinc-400">{entry.dateRange}</p>
          {entry.location ? <p className="text-sm text-zinc-400">{entry.location}</p> : null}
          {entry.department ? <p className="text-sm text-zinc-500">{entry.department}</p> : null}
        </div>

        {entry.skills?.length ? (
          <div className="mb-5 flex flex-wrap gap-2">
            {entry.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-zinc-700 px-3 py-1 text-xs text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}

        {entry.summary ? <p className="text-zinc-300 leading-relaxed">{entry.summary}</p> : null}

        <div className="mt-8 flex justify-between">
          <button
            onClick={onPrev}
            className="rounded-full bg-zinc-700 p-3 transition-colors hover:bg-zinc-600"
            aria-label="Previous timeline entry"
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          <button
            onClick={onNext}
            className="rounded-full bg-zinc-700 p-3 transition-colors hover:bg-zinc-600"
            aria-label="Next timeline entry"
          >
            <span className="material-symbols-rounded">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

TimelineModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  entry: PropTypes.shape({
    title: PropTypes.string,
    company: PropTypes.string,
    companyUrl: PropTypes.string,
    dateRange: PropTypes.string,
    location: PropTypes.string,
    department: PropTypes.string,
    summary: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    current: PropTypes.bool,
  }),
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

const WorkTimeline = () => {
  const sectionRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const progressFillRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const entries = workTimelineData.entries ?? [];
  const hasEntries = entries.length > 0;

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.fromTo(
        ".timeline-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const scrollElement = scrollAreaRef.current;
    const progressElement = progressFillRef.current;
    if (!scrollElement || !progressElement) return undefined;

    const updateProgress = () => {
      const maxScrollable = scrollElement.scrollHeight - scrollElement.clientHeight;
      const progress = maxScrollable > 0 ? scrollElement.scrollTop / maxScrollable : 1;
      gsap.to(progressElement, {
        scaleY: Math.max(progress, 0.06),
        duration: 0.2,
        ease: "power1.out",
      });
    };

    updateProgress();
    scrollElement.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      scrollElement.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [entries.length]);

  const openModal = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextEntry = () => {
    setSelectedIndex((previous) => (previous + 1) % entries.length);
  };

  const previousEntry = () => {
    setSelectedIndex((previous) => (previous - 1 + entries.length) % entries.length);
  };

  const syncedDate = workTimelineData.fetchedAt
    ? new Date(workTimelineData.fetchedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <section id="timeline" className="section" ref={sectionRef}>
      <div className="container-2">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="timeline-reveal">
            <h2 className="headline-2">Work timeline</h2>
            <p className="mt-3 max-w-[62ch] text-sm text-zinc-400">
              Quick view first, full details on click. This keeps the section compact while still
              letting people explore your experience.
            </p>
          </div>
          <div className="timeline-reveal flex items-center gap-2">
            <a href="#contact" className="btn btn-outline">
              Skip timeline
            </a>
            <a
              href={workTimelineData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="timeline-reveal rounded-2xl bg-zinc-800/50 p-4 ring-1 ring-inset ring-zinc-50/10 md:p-5">
          <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
            <p>
              {hasEntries
                ? "Click any role to open the full popup card."
                : "Timeline is currently empty. Run the sync command to refresh it."}
            </p>
            <p>{hasEntries ? `${entries.length} roles` : "No roles yet"}</p>
          </div>

          {hasEntries ? (
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-0 h-full w-px bg-zinc-700/80" />
              <div
                ref={progressFillRef}
                className="pointer-events-none absolute left-3 top-0 h-full w-px origin-top scale-y-[0.06] bg-amber-300"
              />

              <ul ref={scrollAreaRef} className="scrollbar-hide max-h-[420px] space-y-3 overflow-y-auto pr-2">
                {entries.map((entry, index) => (
                  <li key={entry.id} className="ml-6">
                    <button
                      onClick={() => openModal(index)}
                      className="relative w-full rounded-xl bg-zinc-800 p-4 text-left transition-colors hover:bg-zinc-700/70"
                    >
                      <span className="absolute -left-[26px] top-5 h-3 w-3 rounded-full bg-amber-300 ring-4 ring-zinc-900" />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-zinc-50">{entry.title}</p>
                          <p className="text-sm text-zinc-300">{entry.company}</p>
                        </div>
                        {entry.current ? (
                          <span className="rounded-full bg-amber-300/20 px-2 py-1 text-[11px] text-amber-300">
                            Current
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-xs text-zinc-400">{entry.dateRange}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-4 text-[11px] text-zinc-500">
            {syncedDate ? `Last synced on ${syncedDate}` : "Last synced date unavailable"}
          </p>
        </div>
      </div>

      <TimelineModal
        isOpen={isModalOpen}
        entry={selectedIndex !== null ? entries[selectedIndex] : null}
        onClose={closeModal}
        onNext={nextEntry}
        onPrev={previousEntry}
      />
    </section>
  );
};

export default WorkTimeline;
