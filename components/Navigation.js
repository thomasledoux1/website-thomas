import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const navigationMobileRef = useRef(null);
  const mobileIconRef = useRef(null);
  const [darkThemeChecked, setDarkThemeChecked] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('theme') !== 'light') {
      toggleDarkTheme(null, false);
    } else if (localStorage.getItem('theme') === 'light') {
      toggleDarkTheme(null, true);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
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

  const linkClicked = () => {
    if (window.innerWidth <= 768) {
      toggleMobileNavigation();
    }
  }

  const useTheme = (theme) => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.style.setProperty('--backgroundColor', 'black');
      document.documentElement.style.setProperty('--backgroundColorOdd', '#121212');
      document.documentElement.style.setProperty('--textColor', 'white');
      document.documentElement.style.setProperty('--lightGray', '#325b97');
      document.documentElement.style.setProperty('--backgroundColorCase', 'rgba(255, 255, 255, 0.12)');
    } else {
      localStorage.setItem('theme', 'light');
      console.log(localStorage.getItem('theme'));
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
          <li className="mt-2 sm:mt-0">
            <Link href={{ pathname: '/', hash: 'personal' }}>
              <a className="mx-2 no-underline relative text-white sm:text-primary" onClick={linkClicked}>Personal</a>
            </Link>
          </li>
          <li className="mt-2 sm:mt-0">
            <Link href={{ pathname: '/', hash: 'portfolio' }}>
              <a className="mx-2 no-underline relative text-white sm:text-primary" onClick={linkClicked}>Portfolio</a>
            </Link>
          </li>
          <li className="mt-2 sm:mt-0">
            <Link href={{ pathname: '/', hash: 'contact' }}>
              <a className="mx-2 no-underline relative text-white sm:text-primary" onClick={linkClicked}>Contact</a>
            </Link>
          </li>
          <li className="my-2 sm:my-0">
            <Link href="/cv">
              <a className="mx-2 no-underline relative text-white sm:text-primary">CV</a>
            </Link>
          </li>
        </React.Fragment>
      </React.Fragment>
    );
  }

  return (
    <nav className="px-8 fixed h-16 flex items-center w-full z-20 top-0">
      <div className="navigation-wrapper flex w-full justify-between items-center">
        <Link href={{ pathname: '/' }}>
          <a className="logo font-bold no-underline text-primary">
            <div className="letter inline-block top-0 relative">t</div>
            <div className="letter inline-block top-0 relative">h</div>
            <div className="letter inline-block top-0 relative">m</div>
            <div className="letter inline-block top-0 relative">s</div>
            <div className="letter inline-block top-0 relative">l</div>
            <div className="letter inline-block top-0 relative">d</div>
            <div className="letter inline-block top-0 relative">x</div>
          </a>
        </Link>
        <ul className="navigation list-none hidden sm:flex font-bold items-center">
          {renderNavigationItems()}
        </ul>
        <ul ref={navigationMobileRef} className="navigation-mobile flex sm:hidden absolute flex-col items-center px-4 left-0 bg-main w-full">
          {renderNavigationItems()}
        </ul>
        <div className="flex items-center">
          <input aria-label="toggle dark theme" checked={darkThemeChecked} onChange={e => toggleDarkTheme(e)} className="darkTheme-checkbox cursor-pointer color-yellow-300 appearance-none h-8 w-16 p-1 m-auto items-center inline-flex sm:mr-4" type="checkbox" />
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