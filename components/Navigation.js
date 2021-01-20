import React, {useRef, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useTheme} from 'next-themes'
import useWindowSize from '../hooks/useWindowSize'

const Navigation = () => {
  const navigationMobileRef = useRef(null)
  const mobileIconRef = useRef(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const {width} = useWindowSize()
  const {theme, setTheme} = useTheme()

  React.useEffect(() => setMounted(true), [])

  const toggleMobileNavigation = () => {
    navigationMobileRef.current.classList.add('touched')
    navigationMobileRef.current.classList.toggle('translate-x-full')
    setMobileNavOpen(!mobileNavOpen)
  }

  const linkClicked = event => {
    if (event.currentTarget.href.indexOf('cv') > -1) {
      document.querySelectorAll('nav li a').forEach(navEl => {
        navEl.classList.remove('active')
      })
    }
    if (width <= 768) {
      toggleMobileNavigation()
    }
  }

  const renderNavigationItems = () => {
    return (
      <React.Fragment>
        <li className="sm:mr-6">
          <Link href={{pathname: '/', hash: 'personal'}}>
            <a className="relative" onClick={linkClicked}>
              Personal
            </a>
          </Link>
        </li>
        <li className="mt-2 sm:mt-0 sm:mr-6">
          <Link href={{pathname: '/', hash: 'portfolio'}}>
            <a className="relative" onClick={linkClicked}>
              Portfolio
            </a>
          </Link>
        </li>
        <li className="mt-2 sm:mt-0 sm:mr-6">
          <Link href={{pathname: '/', hash: 'blog'}}>
            <a className="relative" onClick={linkClicked}>
              Blog
            </a>
          </Link>
        </li>
        <li className="mt-2 sm:mt-0 sm:mr-6">
          <Link href={{pathname: '/', hash: 'contact'}}>
            <a className="relative" onClick={linkClicked}>
              Contact
            </a>
          </Link>
        </li>
        <li className="mt-2 sm:mt-0">
          <Link href="/cv">
            <a
              onClick={linkClicked}
              className={`relative ${
                router.pathname === '/cv' ? 'active' : ''
              }`}
            >
              CV
            </a>
          </Link>
        </li>
      </React.Fragment>
    )
  }

  return (
    <nav className="fixed bg-purple dark:bg-darkgrey dark:text-whitedarktheme h-16 w-full z-50">
      <div className="flex h-full container mx-auto justify-between items-center px-4 md:px-0">
        <Link href={{pathname: '/'}}>
          <a className="logo flex flex-row text-2xl">
            <div className="letter inline-block top-0 relative">t</div>
            <div className="letter inline-block top-0 relative">h</div>
            <div className="letter inline-block top-0 relative">m</div>
            <div className="letter inline-block top-0 relative">s</div>
            <div className="letter inline-block top-0 relative">l</div>
            <div className="letter inline-block top-0 relative">d</div>
            <div className="letter inline-block top-0 relative">x</div>
          </a>
        </Link>
        <ul className="hidden md:flex">{renderNavigationItems()}</ul>
        <ul
          ref={navigationMobileRef}
          className="md:hidden absolute flex flex-col w-full top-16 left-0 py-3 items-center bg-darkPurple dark:bg-orange transform translate-x-full"
        >
          {renderNavigationItems()}
        </ul>
        <div
          ref={mobileIconRef}
          onClick={toggleMobileNavigation}
          className="md:hidden order-3 h-6 w-5 cursor-pointer relative"
        >
          <span
            className={`transform transition duration-300 ease-in-out absolute h-1 w-full bg-darkPurple dark:bg-orange rounded-lg left-0 ${
              mobileNavOpen ? 'rotate-135 top-2' : 'rotate-0'
            }`}
          ></span>
          <span
            className={`absolute transition duration-300 ease-in-out h-1 w-full bg-darkPurple dark:bg-orange rounded-lg left-0 top-2 ${
              mobileNavOpen ? 'opacity-0 -left-40' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`transform transition duration-300 ease-in-out absolute h-1 w-full bg-darkPurple dark:bg-orange rounded-lg left-0 ${
              mobileNavOpen ? '-rotate-135 top-2' : 'rotate-0 top-4'
            }`}
          ></span>
        </div>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="p-3 h-12 w-12 order-2 md:order-3 absolute left-2/4 transform -translate-x-2/4"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navigation
