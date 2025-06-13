import PropTypes from "prop-types"

const ReviewCard = ({
    content,
    name,
    imgSrc,
    company,
    rating = 5.0,
    className = "",
    style = {}
}) => {

  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);
  
  return (
    <div className={`bg-zinc-800 p-5 rounded-xl min-w-[320px] w-[320px] flex flex-col justify-between lg:min-w-[420px] lg:w-[420px] h-[260px] ${className}`} style={style}>
        <div>
            <div className="flex items-center gap-1 mb-3">
                {[...Array(fullStars)].map((_, i) => (
                    <span 
                        key={`full-${i}`}
                        style={{fontVariationSettings: '"FILL" 1'}}
                        className="material-symbols-rounded text-yellow-300 text-[18px]">
                        star
                    </span>
                ))}
                
                {partialStar > 0 && (
                    <div className="relative">
                        <span 
                            className="material-symbols-rounded text-yellow-300 text-[18px]">
                            star
                        </span>
                        
                        <div 
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: `${partialStar * 100}%` }}
                        >
                            <span 
                                style={{fontVariationSettings: '"FILL" 1'}}
                                className="material-symbols-rounded text-yellow-300 text-[18px]">
                                star
                            </span>
                        </div>
                    </div>
                )}
                
                {[...Array(emptyStars)].map((_, i) => (
                    <span 
                        key={`empty-${i}`}
                        className="material-symbols-rounded text-yellow-300 text-[18px]">
                        star
                    </span>
                ))}
                
                <span className="ml-1 text-sm text-yellow-300 font-medium">
                    {rating.toFixed(1)}
                </span>
            </div>
            
            <p className="text-zinc-400 line-clamp-4 overflow-hidden">
                {content}
            </p>
        </div>
        
        <div className="flex items-center gap-2">
            <figure className="img-box w-11 h-11 rounded-lg">
                <img 
                    src={imgSrc} 
                    alt={name} 
                    className="img-cover"
                    loading="lazy"
                    width={44}
                    height={44}    
                />
            </figure>
            <div>
                <p>{name}</p>
                <p className="text-xs text-zinc-400 tracking-wider">
                    {company}
                </p>
            </div>
        </div>
    </div>
  )
}

ReviewCard.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  rating: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

export default ReviewCard