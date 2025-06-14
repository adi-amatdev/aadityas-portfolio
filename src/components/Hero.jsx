import { heroMessage ,mainMessage} from "../constants";
import {ButtonOutline, ButtonPrimary} from "./Button";

const Hero = () => {    
    return (
       <section
        id="home"
        className="pt-28 lg:pt-36"
       >
        <div className="container">
            <div>
                <div className="flex items-center gap-3">
                    <figure
                        className="img-box w-9 h-9 rounded-lg"
                    >
                        <img src="/assets/images/avatar-1.webp"
                            width={40}
                            height={40}
                            alt="Aaditya Acharya potrait" 
                            className="img-cover"    
                        />
                    </figure>

                    <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
                        <span 
                            className="relative w-2 h-2 rounded-full bg-emerald-400"
                        >
                            <span
                                className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"
                            >

                            </span>
                        </span>
                        {heroMessage}
                    </div>
                </div>
                <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10">
                  {mainMessage}
                </h2>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <ButtonPrimary 
                            href="https://docs.google.com/document/d/1VJG0lSyC8_yEVfFJ31tkbl2K1SI8Ehwxd98iOkI_Vko/edit?usp=sharing"
                            label="Download CV"
                            icon="download"
                        />
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-zinc-800 text-zinc-200 text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            To download in PDF or DOCX format, go to the File toolbar and click Download to choose your preferred format.
                        </div>
                    </div>
                   <ButtonOutline
                        href="#work"
                        label="See my Projects"
                        icon="arrow_downward"
                   />
                </div>
            </div>

            <div className="hidden lg:block">
                <figure className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-[#c3b091] via-25% via-[#d2b48c] to-65% rounded-[60px] overflow-hidden"> 
                    <div className="relative w-full max-w-[480px] mx-auto overflow-hidden rounded-[20px] group">
                            {/* Default image with smooth fade-out and scale-down on hover */}
                            <img 
                                src="/assets/images/9910414.webp"
                                width={656}
                                height={800}
                                loading="lazy"
                                alt="Aaditya Acharya"
                                className="w-full object-cover transition-all duration-500 ease-in-out transform" //group-hover:scale-90 group-hover:opacity-0
                            />

                            {/* Hover image with fade-in and scale-up */}
                            {/* <img 
                                src="/assets/images/pot.webp"
                                width={656}
                                height={800}
                                loading="lazy"
                                alt="Aaditya Acharya"
                                className="absolute inset-0 w-full h-full object-cover opacity-0 scale-110 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100"
                            /> */}
                    </div>
                </figure>
            </div>
        </div>

       </section>
    )
};


export default Hero;