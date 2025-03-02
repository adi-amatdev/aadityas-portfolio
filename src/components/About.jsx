import { aboutItems,aboutMessage } from "../constants";

const About = () =>{ 
    return <>
        <section
            id="about"
            className="section"
        >
            <div className="container">
                <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 reveal-up">
                    <p 
                        dangerouslySetInnerHTML={{__html:aboutMessage}}
                        className="text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch]" />
                    <div className="flex flex-wrap items-center gap-4 md:gap-7">
                        {
                            aboutItems.map(({label,number},key)=>(
                                <div key={key}>
                                    <div className="flex items-center md:mb-2">
                                        <span className="text-2xl font-semibold md:text-4xl">{number}</span>
                                        <span className="text-[#e6c292] font-semibold md:text-3xl ">+</span>
                                    </div>
                                    <p className="text-sm text-zinc-400">{label}</p>
                                </div>
                            ))
                        }
                        <img src="./src/assets/images/aadityas-logo.webp" 
                                alt="logo" 
                                className="ml-auto md:w-[40px] md:h-[40px]" 
                                height={30}
                                width={30}
                        />
                    </div>
                </div>
            </div>

        </section>
    </>
}



export default About;