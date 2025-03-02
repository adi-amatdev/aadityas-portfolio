import { contactDesc, contactHeading, socialLinks,formActuator } from "../constants"

const Contact = () => {
    
    return (
        <section 
            id='contact'
            className="section"
        >
            <div className="container lg:grid lg:grid-cols-2 lg:items-stretch">
                <div className="mb-12 lg:mb-0 lg:flex lg:flex-col">
                    <h2 className="headline-2 lg:max-w-[12ch] reveal-up">
                        {contactHeading}
                    </h2>
                    <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] lg:max-w-[30ch] reveal-up">
                        {contactDesc}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                        {socialLinks.map(({href, icon},key)=>(
                            <a href={href}
                               key={key}
                               target='_blank'
                               className="w-12 h-12 ring-inset ring-2 grid place-items-center ring-zinc-50/5 rounded-lg transition-[background-color, color] hover:bg-zinc-50 hover:text-zinc-950 active:bg-zinc-50/80 reveal-up">
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
                <form 
                    //uses form.io   
                    action={formActuator}
                    className="xl:pl-10 2xl:pl-20 "
                    method='POST'
                >
                    <div className="md:grid md:items-center md:grid-cols-2 md:gap-2">
                        <div className="mb-4">
                            <label
                                htmlFor="name" 
                                className="label reveal-up"
                            >
                                Name
                            </label>
                            <input 
                                id='name'
                                name='name'
                                autoComplete='name'
                                required
                                placeholder='Aaditya Acharya'
                                type="text" 
                                className="text-field reveal-up" 
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email" 
                                className="label reveal-up"
                            >
                                Email
                            </label>
                            <input 

                                id='email'
                                name='email'
                                autoComplete='email'
                                required
                                placeholder='Aaditya@example.com'
                                type="email" 
                                className="text-field reveal-up" 
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="label reveal-up">
                            Message
                        </label>
                        <textarea 
                            name="message" 
                            id="message"
                            className='text-field resize-y min-h-32 max-h-80 reveal-up'
                            placeholder='Hi!'
                            required    
                        ></textarea>
                    </div>
                    <button 
                            id='submit-btn'
                            type='submit' 
                            className="btn btn-primary [&]:max-w-full w-full justify-center reveal-up"
                    >
                            Submit
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact