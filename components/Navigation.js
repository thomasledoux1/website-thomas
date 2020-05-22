import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
    const navigationMobileRef = useRef(null);
    const mobileIconRef = useRef(null);
    const [darkThemeChecked, setDarkThemeChecked] = useState(true);

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toggleDarkTheme(null, false);
        }
    }, []);

    const toggleMobileNavigation = () => {
        navigationMobileRef.current.classList.add('touched');
        mobileIconRef.current.classList.toggle('open');
        navigationMobileRef.current.classList.toggle('slideIn');
    }

    const toggleDarkTheme = (e, checked = null) => {
        const checkedValue = e ? e.target.checked : checked;
        setDarkThemeChecked(checkedValue);
        if (checkedValue) {
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

    const renderNavigationItems = () => {
        return (
            <React.Fragment>
                <React.Fragment>
                    <li>
                        <Link href={{ pathname: '/', hash: 'personal' }}>
                            <a>Personal</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={{ pathname: '/', hash: 'portfolio' }}>
                            <a>Portfolio</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={{ pathname: '/', hash: 'contact' }}>
                            <a>Contact</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cv">
                            <a>CV</a>
                        </Link>
                    </li>
                </React.Fragment>

            </React.Fragment>
        );
    }

    return (
        <nav>
            <div className="navigation-wrapper">
                <Link href={{ pathname: '/' }}>
                    <a className="logo">
                        <div className="letter">t</div>
                        <div className="letter">h</div>
                        <div className="letter">m</div>
                        <div className="letter">s</div>
                        <div className="letter">l</div>
                        <div className="letter">d</div>
                        <div className="letter">x</div>
                    </a>
                </Link>
                <ul className="navigation">
                    {renderNavigationItems()}
                </ul>
                <ul ref={navigationMobileRef} className="navigation-mobile">
                    {renderNavigationItems()}
                </ul>
                <div className="darkTheme-container">
                    <input aria-label="toggle dark theme" checked={darkThemeChecked} onChange={e => toggleDarkTheme(e)} className="darkTheme-checkbox" type="checkbox" />
                </div>
                <div ref={mobileIconRef} onClick={toggleMobileNavigation} className="navigation-mobile__icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    )
};

export default Navigation;