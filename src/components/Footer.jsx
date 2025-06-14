//import { ButtonPrimary } from "./Button";
import { footerMail, sitemap,socials } from "../constants";
const Footer = () => {

    return (
        <footer className="section">
            <div className="container-2">
                <div className="lg:grid lg:grid-cols-2">
                    <div className="mb-10">
                        <h2 className="headline-1 mb-8 lg:max-w-[12ch] reveal-up">
                         Let&apos;s work together today!
                        </h2>
                        {/* <ButtonPrimary 
                            href={footerMail}
                            icon={"chevron_right"}
                            label="Start project"
                            classes="reveal-up"
                        /> */}
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:pl-20">
                        <div>
                            <p className="mb-2 reveal-up">Site map</p>
                            <ul>
                                {sitemap.map(({label,href},key)=>(
                                    <li key={key}>
                                        <a href={href} className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200">
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="mb-2 reveal-up">Socials</p>
                            <ul>
                                {socials.map(({label,href},key)=>(
                                    <li key={key}>
                                        <a href={href} target='_blank' className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200 reveal-up">
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div> 
                    </div>
                    
                </div>

                <div className="flex items-center justify-between pt-10 mb-8">
                    <a href="/" className="logo reveal-up">
                        <img 
                            src="/assets/images/aadityas-logo.webp" 
                            alt="Logo" 
                            className="" 
                            width={40}
                            height={40}
                        />
                    </a>
                    <p className="text-zinc-500 text-sm reveal-up"> &copy; 2025 <span className="text-zinc-200">Aaditya Acharya</span></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer