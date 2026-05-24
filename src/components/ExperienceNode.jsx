const ExperienceNode = ({ experience, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        timeline-node
        relative
        cursor-pointer
        group
        transition-all
        duration-500
      "
    >
      {/* DOT */}
      <div
        className="
          w-6 h-6 rounded-full
          bg-cyan-400

          transition-all
          duration-500

          group-hover:scale-[1.8]
          group-hover:shadow-[0_0_30px_rgba(34,211,238,0.9)]
        "
      />

      {/* CARD */}
      <div
        className="
          timeline-card
          absolute top-10 left-1/2
          -translate-x-1/2
          w-[280px]
        "
      >
        <div
          className="
            bg-zinc-900/60
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-5

            hover:-translate-y-2
            hover:border-cyan-400/30

            transition-all
            duration-500
          "
        >
          <img
            src={experience.logo}
            alt={experience.company}
            className="w-12 h-12 rounded-xl mb-4 object-cover"
          />

          <h3 className="text-lg font-semibold text-white">
            {experience.role}
          </h3>

          <p className="text-zinc-400 text-sm">{experience.company}</p>

          <p className="text-xs text-zinc-500 mt-2">{experience.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceNode;
