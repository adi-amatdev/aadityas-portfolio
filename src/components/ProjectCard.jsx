import PropTypes from "prop-types"

const ProjectCard = ({
    imgSrc,
    title,
    tags,
    projectLink,
    classes
}) => {
  return (
    <div className={"relative p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors  "+classes}>
        <figure className="img-box aspect-[16/9] rounded-lg mb-3">
            <img src={imgSrc}
                 alt={title}
                 loading="lazy"
                 className="img-cover brightness-100" 
            />
        </figure>
        <div className="flex items-center justify-between gap-3">
            <div>
                <h3 className="title-1 mb-2 text-lg">
                    {title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                    {tags.map((label, index)=>(
                        <span key={index} className="h-6 text-xs text-zinc-400 bg-zinc-50/5 grid items-center px-2 rounded-lg">
                            {label}
                        </span>
                    ))}
                </div>
            </div>
            <div className="w-9 h-9 rounded-lg grid place-items-center bg-[#d2b48c] text-zinc-950 shrink-0">
                <span className="material-symbols-rounded"
                      aria-hidden="true"
                >
                    arrow_outward
                </span>
            </div>
        </div>
        <a href={projectLink}
           className="absolute inset-0"
           target='_blank' 
        ></a>
    </div>
  )
}

ProjectCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    projectLink: PropTypes.string,
    classes: PropTypes.string,
}

export default ProjectCard
