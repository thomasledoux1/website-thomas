import React, { useRef } from 'react';
const Navigation = () => {
    const navigationRef = useRef(null);
    const mobileIconRef = useRef(null);
    const openMobileNav = () => {
        mobileIconRef.current.classList.toggle('open');
        navigationRef.current.classList.toggle('slideIn');
    };

    return (
        <nav>
            <div className="navigation-wrapper">
                <a href="#" className="logo">
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
                        <a href="#personal">Personal</a>
                    </li>
                    <li>
                        <a href="#portfolio">Portfolio</a>
                    </li>
                    <li>
                        <a href="#freetime">Free Time</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
                <div ref={mobileIconRef} onClick={openMobileNav} className="navigation-mobile-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    )
};

export default Navigation;