import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const ReviewModal = ({ review, isOpen, onClose, onNext, onPrev }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const prevReviewRef = useRef(review);
  
  useEffect(() => {
    if (isOpen && prevReviewRef.current !== review) {
      gsap.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          prevReviewRef.current = review;
          gsap.to(contentRef.current, {
            opacity: 1,
            duration: 0.3
          });
        }
      });
    }
  }, [review, isOpen]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        closeWithAnimation();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3
      });
      
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);
  
  const closeWithAnimation = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2
    });
    
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: onClose
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0"
        onClick={closeWithAnimation}
      ></div>
      
      <div 
        ref={modalRef}
        className="bg-zinc-800 rounded-2xl p-6 md:p-8 max-w-2xl w-full relative z-10 shadow-xl"
      >

        <button 
          onClick={closeWithAnimation}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <span className="material-symbols-rounded">close</span>
        </button>
        

        <div ref={contentRef} className="mb-6">
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span 
                key={`star-${i}`}
                style={{
                  fontVariationSettings: i < Math.floor(review.rating) ? '"FILL" 1' : '"FILL" 0'
                }}
                className="material-symbols-rounded text-yellow-300 text-[24px]"
              >
                star
              </span>
            ))}
            <span className="ml-2 text-yellow-300 font-medium">
              {review.rating?.toFixed(1) || "5.0"}
            </span>
          </div>
          
          <p className="text-zinc-300 text-lg mb-8">
            "{review.content}"
          </p>
          
          <div className="flex items-center gap-4">
            <figure className="img-box w-16 h-16 rounded-lg">
              <img 
                src={review.imgSrc} 
                alt={review.name} 
                className="img-cover"
                loading="lazy"
              />
            </figure>
            <div>
              <p className="text-xl font-medium">{review.name}</p>
              <p className="text-zinc-400">
                {review.company}
              </p>
            </div>
          </div>
        </div>
        

        <div className="flex justify-between mt-8">
          <button 
            onClick={onPrev}
            className="p-3 bg-zinc-700 hover:bg-zinc-600 rounded-full transition-colors"
            aria-label="Previous review"
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          
          <button 
            onClick={onNext}
            className="p-3 bg-zinc-700 hover:bg-zinc-600 rounded-full transition-colors"
            aria-label="Next review"
          >
            <span className="material-symbols-rounded">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

ReviewModal.propTypes = {
  review: PropTypes.shape({
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    rating: PropTypes.number
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired
};

export default ReviewModal;