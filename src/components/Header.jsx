import NavBar  from "./Navbar"
import { useState } from "react";

const Header = ()=>{
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0">
            <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center">
                <h1>
                    <a href="/" className="logo">
                        <img src="/assets/images/aadityas-logo.webp"
                            height={40} 
                            width={40}
                            alt="Aaditya Acharya" />
                    </a>
                </h1>
                <div
                    className="relative md:justify-self-center"
                >
                    <button
                        className="menu-btn"
                        onClick={()=>setNavOpen((prev)=>!prev)}
                    >
                            <span className="material-symbols-rounded">
                                {navOpen?'close':'menu'}
                            </span>
                    </button>
                    <NavBar navOpen={navOpen} />
                </div>
                <a href="#contact"
                    id="contact-me"
                    className="btn btn-secondary "
                >
                    contact me
                </a>
            </div>
        </header>
    )

}

export default Header;