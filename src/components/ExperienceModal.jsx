import { motion, AnimatePresence } from "framer-motion";

const ExperienceModal = ({ experience, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="
          fixed inset-0 z-50
          bg-black/50
          backdrop-blur-sm

          flex items-center justify-center
          p-6
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            max-w-3xl
            w-full

            bg-zinc-800
            border border-zinc-700

            rounded-3xl
            p-8

            max-h-[90vh]
            overflow-y-auto
          "
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              absolute top-5 right-5
              text-zinc-400 hover:text-white
            "
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="flex items-center gap-5 mb-8">
            <img
              src={experience.logo}
              alt={experience.company}
              className="
                w-16 h-16 rounded-2xl
                object-cover
              "
            />

            <div>
              <h2 className="text-3xl font-bold text-white">
                {experience.role}
              </h2>

              <p className="text-zinc-400">{experience.company}</p>

              <p className="text-zinc-500 text-sm">{experience.duration}</p>
            </div>
          </div>

          {/* SUMMARY */}
          <p className="text-zinc-300 mb-8 leading-relaxed">
            {experience.summary}
          </p>

          {/* ACHIEVEMENTS */}
          <div className="space-y-4 mb-8">
            {experience.achievements.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div
                  className="
                    w-2 h-2 rounded-full
                    bg-cyan-400
                    mt-2
                  "
                />

                <p className="text-zinc-400">{item}</p>
              </div>
            ))}
          </div>

          {/* TECH */}
          <div className="flex flex-wrap gap-3">
            {experience.tech.map((tech, index) => (
              <span
                key={index}
                className="
                  px-4 py-2
                  rounded-full
                  bg-zinc-900
                  text-zinc-300
                  text-sm
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExperienceModal;
