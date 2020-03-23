import React, { useRef } from 'react';
const Navigation = () => {
    const navigationRef = useRef(null);
    const mobileIconRef = useRef(null);
    const toggleMobileNav = (e, id) => {
        if (id) {
            if (id !== 'home') {
                e.preventDefault();
                document.getElementById(id).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
        mobileIconRef.current.classList.toggle('open');
        navigationRef.current.classList.toggle('slideIn');
    };

    const toggleDarkTheme = (e) => {
        if (e.target.checked) {
            useTheme('light');
        } else {
            useTheme('dark');
        }
    }

    const useTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--backgroundColor', 'black');
            document.documentElement.style.setProperty('--backgroundColorOdd', '#121212');
            document.documentElement.style.setProperty('--textColor', 'white');
            document.documentElement.style.setProperty('--lightGray', '#325b97');
            document.documentElement.style.setProperty('--backgroundColorCase', 'rgba(255, 255, 255, 0.12)');
        } else {
            document.documentElement.style.setProperty('--backgroundColor', '#f0efff');
            document.documentElement.style.setProperty('--backgroundColorOdd', '#ffffff');
            document.documentElement.style.setProperty('--textColor', 'black');
            document.documentElement.style.setProperty('--lightGray', 'rgba(0, 0, 0, 0.2)');
            document.documentElement.style.setProperty('--backgroundColorCase', '#ffffff');
        }
    }

    return (
        <nav>
            <div className="navigation-wrapper">
                <a onClick={(e) => toggleMobileNav(e, 'home')} href="#" className="logo">
                    <div className="letter">t</div>
                    <div className="letter">h</div>
                    <div className="letter">m</div>
                    <div className="letter">s</div>
                    <div className="letter">l</div>
                    <div className="letter">d</div>
                    <div className="letter">x</div>
                </a>
                <ul ref={navigationRef} className="navigation">
                    <li>
                        <a onClick={(e) => toggleMobileNav(e, 'personal')} href="#personal">Personal</a>
                    </li>
                    <li>
                        <a onClick={(e) => toggleMobileNav(e, 'portfolio')} href="#portfolio">Portfolio</a>
                    </li>
                    <li>
                        <a onClick={(e) => toggleMobileNav(e, 'contact')} href="#contact">Contact</a>
                    </li>
                </ul>
                <div className="darkTheme-container">
                    <input aria-label="toggle dark theme" defaultChecked onChange={e => toggleDarkTheme(e)} className="darkTheme-checkbox" type="checkbox" />
                </div>
                <div ref={mobileIconRef} onClick={toggleMobileNav} className="navigation-mobile__icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    )
};

export default Navigation;