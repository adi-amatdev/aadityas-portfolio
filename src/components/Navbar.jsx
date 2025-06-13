import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const NavBar = ({navOpen}) => {
    const activeBox = useRef();
    const lastActiveLink = useRef();
    const navRefs = useRef({});
    
    const initActiveBox = () => {
        if (lastActiveLink.current && activeBox.current) {
            activeBox.current.style.top = lastActiveLink.current.offsetTop + 'px';
            activeBox.current.style.height = lastActiveLink.current.offsetHeight + 'px';
            activeBox.current.style.left = lastActiveLink.current.offsetLeft + 'px';
            activeBox.current.style.width = lastActiveLink.current.offsetWidth + 'px';
        }
    }
    
    useEffect(() => {
        initActiveBox();
        const sections = ['home', 'about', 'work', 'reviews', 'contact'];
        
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.id && trigger.vars.id.startsWith('section-')) {
                trigger.kill();
            }
        });
        
        sections.forEach(section => {
            const sectionElement = document.getElementById(section);
            if (!sectionElement) return;
            
            
            ScrollTrigger.create({
                id: `section-${section}`,
                trigger: `#${section}`,
                start: section === 'reviews' ? 'top 60%' : 'top 50%', 
                end: `bottom ${section === 'reviews' ? '40%' : '50%'}`,
                onEnter: () => updateActiveSection(section),
                onEnterBack: () => updateActiveSection(section),
                markers: false 
            });
        });
        
        window.addEventListener('resize', initActiveBox);
        
        return () => {
            window.removeEventListener('resize', initActiveBox);
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.id && trigger.vars.id.startsWith('section-')) {
                    trigger.kill();
                }
            });
        };
    }, []);
    
    const updateActiveSection = (sectionId) => {
        if (navRefs.current[sectionId] && lastActiveLink.current !== navRefs.current[sectionId]) {
            lastActiveLink.current?.classList.remove('active');
            navRefs.current[sectionId].classList.add('active');
            lastActiveLink.current = navRefs.current[sectionId];
            
            gsap.to(activeBox.current, {
                top: navRefs.current[sectionId].offsetTop,
                left: navRefs.current[sectionId].offsetLeft,
                width: navRefs.current[sectionId].offsetWidth,
                height: navRefs.current[sectionId].offsetHeight,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const activeCurrentLink = (e) => {
        lastActiveLink.current?.classList.remove('active');
        e.target.classList.add('active');
        lastActiveLink.current = e.target;
        
        gsap.to(activeBox.current, {
            top: e.target.offsetTop,
            left: e.target.offsetLeft,
            width: e.target.offsetWidth,
            height: e.target.offsetHeight,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    const navItems = [
        {
          label: 'Home',
          link: '#home',
          className: 'nav-link active',
          id: 'home',
          isFirst: true
        },
        {
          label: 'About',
          link: '#about',
          className: 'nav-link',
          id: 'about'
        },
        {
          label: 'Work',
          link: '#work',
          className: 'nav-link',
          id: 'work'
        },
        {
          label: 'Reviews',
          link: '#reviews',
          className: 'nav-link',
          id: 'reviews'
        },
        {
          label: 'Contact',
          link: '#contact',
          className: 'nav-link nav-lg-md',
          id: 'contact'
        }
    ];

    return (
        <nav className={'navbar ' + (navOpen ? 'active' : '')}>
            {navItems.map(({label, link, className, id, isFirst}, key) => (
                <a  
                    href={link}
                    className={className}
                    key={key}
                    ref={el => {
                        navRefs.current[id] = el;
                        if (isFirst) lastActiveLink.current = el;
                    }}
                    onClick={activeCurrentLink}
                >
                    {label}
                </a>
            ))}
            <div
                className="active-box"
                ref={activeBox}
            >
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    navOpen: PropTypes.bool.isRequired
}

export default NavBar;