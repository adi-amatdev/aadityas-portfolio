import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { reviews, reviewDesc, reviewTip } from "../constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Review = () => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    useEffect(() => {
        window.reviewsData = reviews;
    }, []);
    
    const openModal = (index) => {
        setSelectedReview(index);
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
    };
    
    const nextReview = () => {
        setSelectedReview((prev) => (prev + 1) % reviews.length);
    };
    
    const prevReview = () => {
        setSelectedReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    useGSAP(() => {
        gsap.to('.reveal-up', {
            scrollTrigger: {
                trigger: '.reviews-container',
                start: 'top 80%'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2
        });
        
        gsap.to('.scrub-slide', {
            scrollTrigger: {
                trigger: '.scrub-slide',
                start: '-200% 80%',
                end: '400% 80%',
                scrub: true
            },
            x: '-1000'
        });
    });

    return (
        <section id='reviews' className="section overflow-hidden">
            <div className="container-2">
                <h2 className="headline-2 mb-2 reveal-up">
                    {reviewDesc}
                </h2>
                <p className="text-zinc-400 text-sm mb-8 reveal-up flex items-center">
                    <span className="material-symbols-rounded mr-1 text-[16px]">touch_app</span>
                    {reviewTip}
                </p>
                <div className="reviews-container relative overflow-hidden">
                    <div className="scrub-slide flex items-stretch gap-6 w-fit">
                        {
                            reviews.map((review, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => openModal(index)}
                                    className="cursor-pointer hover:scale-[1.02] transition-transform duration-300 mx-1"
                                >
                                    <ReviewCard 
                                        content={review.content}
                                        name={review.name}
                                        imgSrc={review.imgSrc}
                                        company={review.company}
                                        rating={review.rating}
                                        className="reveal-up"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            
            {selectedReview !== null && (
                <ReviewModal
                    review={reviews[selectedReview]}
                    isOpen={modalOpen}
                    onClose={closeModal}
                    onNext={nextReview}
                    onPrev={prevReview}
                />
            )}
        </section>
    );
};

export default Review;