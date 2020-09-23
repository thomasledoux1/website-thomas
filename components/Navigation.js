import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const navigationMobileRef = useRef(null);
  const mobileIconRef = useRef(null);
  const [darkThemeChecked, setDarkThemeChecked] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    // mobileIconRef.current.classList.toggle('open');
    navigationMobileRef.current.classList.toggle('translate-x-full');
    setMobileNavOpen(!mobileNavOpen);
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
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  const renderNavigationItems = () => {
    return (
      <React.Fragment>
        <li className="mr-6">
          <Link href={{ pathname: '/', hash: 'personal' }}>
            <a onClick={linkClicked}>Personal</a>
          </Link>
        </li>
        <li className="mr-6">
          <Link href={{ pathname: '/', hash: 'portfolio' }}>
            <a onClick={linkClicked}>Portfolio</a>
          </Link>
        </li>
        <li className="mr-6">
          <Link href={{ pathname: '/', hash: 'contact' }}>
            <a onClick={linkClicked}>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="/cv">
            <a>CV</a>
          </Link>
        </li>
      </React.Fragment>
    );
  }

  return (
    <nav className="fixed bg-purple h-16 w-full">
      <div className="flex h-full container mx-auto justify-between items-center px-4 md:px-0">
        <Link href={{ pathname: '/' }}>
          <a className="logo flex flex-row">
            <div className="letter inline-block top-0 relative">t</div>
            <div className="letter inline-block top-0 relative">h</div>
            <div className="letter inline-block top-0 relative">m</div>
            <div className="letter inline-block top-0 relative">s</div>
            <div className="letter inline-block top-0 relative">l</div>
            <div className="letter inline-block top-0 relative">d</div>
            <div className="letter inline-block top-0 relative">x</div>
          </a>
        </Link>
        <ul className="hidden md:flex">
          {renderNavigationItems()}
        </ul>
        <ul ref={navigationMobileRef} className="md:hidden absolute flex flex-col w-full top-16 left-0 py-6 items-center bg-darkPurple transform translate-x-full">
          {renderNavigationItems()}
        </ul>
        <div className="flex items-center">
          <input aria-label="toggle dark theme" checked={darkThemeChecked} onChange={e => toggleDarkTheme(e)} className="darkTheme-checkbox appearance-none h-8 w-16 p-1 m-auto items-center inline-flex text-yellow bg-grey cursor-pointer rounded-95 outline-none shadow-checkbox checked:bg-lightgrey checked:shadow-checkbox-checked" type="checkbox" />
        </div>
        <div ref={mobileIconRef} onClick={toggleMobileNavigation} className="md:hidden h-6 w-5 cursor-pointer relative">
          <span className={`transform transition duration-300 ease-in-out absolute h-1 w-full bg-black rounded-lg left-0 ${mobileNavOpen ? 'rotate-135 top-2' : 'rotate-0'}`}></span>
          <span className={`absolute transition duration-300 ease-in-out h-1 w-full bg-black rounded-lg left-0 top-2 ${mobileNavOpen ? 'opacity-0 -left-40' : 'opacity-100'}`}></span>
          <span className={`transform transition duration-300 ease-in-out absolute h-1 w-full bg-black rounded-lg left-0 ${mobileNavOpen ? '-rotate-135 top-2' : 'rotate-0 top-4'}`}></span>
        </div>
      </div>
    </nav>
  )
};

export default Navigation;