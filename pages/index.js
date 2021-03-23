import React, {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faFacebook,
  faDev,
} from '@fortawesome/free-brands-svg-icons'
import {
  faBiking,
  faRunning,
  faRoad,
  faClock,
  faTachometerAlt,
  faMountain,
} from '@fortawesome/free-solid-svg-icons'
import smoothscroll from 'smoothscroll-polyfill'
import Case from '../components/Case'
import db from '../utils/db'

const Home = ({blogs, stravaStats}) => {
  const textWrapper = useRef(null)
  const personalRef = useRef(null)
  const portfolioRef = useRef(null)
  const statsRef = useRef(null)
  const contactRef = useRef(null)
  const blogRef = useRef(null)
  const formSubmitBtnRef = useRef(null)
  const [formResult, setFormResult] = useState('')
  const suggestionsRef = useRef([
    'developer',
    'cyclist',
    'badminton player',
    'travel lover',
  ])
  const [showRunning, setShowRunning] = useState(false)
  const age = Math.floor(
    (new Date() - new Date('1991-07-11').getTime()) / 3.15576e10,
  )
  const speed = 100

  const charCounterRef = useRef(0)
  const timeOutRef = useRef(null)
  const forwardRef = useRef(true)
  const currentIndexRef = useRef(0)
  const currentTextRef = useRef(suggestionsRef.current[0])

  const createAnimation = React.useCallback(() => {
    if (
      charCounterRef.current < currentTextRef.current.length &&
      charCounterRef.current > -1
    ) {
      textWrapper.current.innerHTML = forwardRef.current
        ? textWrapper.current.innerHTML +
          currentTextRef.current.charAt(charCounterRef.current)
        : textWrapper.current.innerHTML.replace(/(\s+)?.$/, '')
      charCounterRef.current = forwardRef.current
        ? charCounterRef.current + 1
        : charCounterRef.current - 1
      timeOutRef.current = setTimeout(createAnimation, speed)
    } else if (charCounterRef.current === currentTextRef.current.length) {
      forwardRef.current = false
      charCounterRef.current -= 1
      timeOutRef.current = setTimeout(createAnimation, speed * 4)
    } else if (charCounterRef.current === -1) {
      currentIndexRef.current =
        currentIndexRef.current + 1 === suggestionsRef.current.length
          ? 0
          : currentIndexRef.current + 1
      currentTextRef.current = suggestionsRef.current[currentIndexRef.current]
      charCounterRef.current = 0
      forwardRef.current = true
      timeOutRef.current = setTimeout(createAnimation, speed)
    }
  }, [])

  useEffect(() => {
    smoothscroll.polyfill()
    createAnimation()

    return function cleanup() {
      clearTimeout(timeOutRef.current)
    }
  }, [createAnimation])

  useEffect(() => {
    let observer
    if (
      personalRef.current &&
      portfolioRef.current &&
      contactRef.current &&
      blogRef.current &&
      statsRef.current
    ) {
      const options = {
        threshold: 0.2,
      }
      observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          const navElement = document.querySelector(
            `a[href="/#${entry.target.id}"]`,
          )
          console.log(navElement)
          if (entry.isIntersecting) {
            if (!navElement.classList.contains('active')) {
              navElement.classList.add('active')
            }
          } else if (navElement.classList.contains('active')) {
            navElement.classList.remove('active')
          }
        })
      }, options)
      observer.observe(personalRef.current)
      observer.observe(portfolioRef.current)
      observer.observe(contactRef.current)
      observer.observe(blogRef.current)
      observer.observe(statsRef.current)
    }
    return () => observer.disconnect()
  }, [personalRef, portfolioRef, contactRef, blogRef, statsRef])

  const submitForm = ev => {
    ev.preventDefault()
    const form = ev.target
    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        setFormResult('ok')
      } else {
        setFormResult('error')
      }
    }
    xhr.send(data)
  }

  return (
    <>
      <Head>
        <title>Thomas Ledoux' Portfolio - Home</title>
      </Head>
      <section
        id="hero"
        className="relative min-h-screen-without-nav items-center content-center flex pb-16 dark:bg-lightgrey dark:text-whitedarktheme"
      >
        <div className="container mx-6 sm:mx-auto grid md:grid-cols-2 items-center content-center">
          <div>
            <h1 className="md:text-4xl">
              Thomas is a <span ref={textWrapper}></span>
            </h1>
          </div>
          <div>
            <Image
              className="rounded-full"
              priority
              alt="Profile picture"
              src="/me.jpg"
              width={500}
              height={500}
            />
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 sm:-bottom-20 text-purple dark:text-darkgrey fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path d="M0,32L20,58.7C40,85,80,139,120,170.7C160,203,200,213,240,213.3C280,213,320,203,360,197.3C400,192,440,192,480,186.7C520,181,560,171,600,144C640,117,680,75,720,74.7C760,75,800,117,840,149.3C880,181,920,203,960,181.3C1000,160,1040,96,1080,96C1120,96,1160,160,1200,165.3C1240,171,1280,117,1320,122.7C1360,128,1400,192,1420,224L1440,256L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"></path>
        </svg>
      </section>
      <section
        id="personal"
        className="bg-purple dark:bg-darkgrey py-6"
        ref={personalRef}
      >
        <div className="container mx-auto grid md:grid-cols-2 min-h-screen-without-nav items-center content-center">
          <>
            <svg viewBox="0 0 893 690" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0 1)" fill="none">
                <circle fill="#FFB8B8" cx="435.922" cy="137.405" r="73.536" />
                <path
                  d="M381.036 174.173s13.854 104.443-7.46 116.166c-21.315 11.723 126.823 12.789 126.823 12.789S467.36 212.54 482.28 184.83l-101.245-10.658z"
                  fill="#FFB8B8"
                />
                <path
                  d="M608.57 303.656l-12.32 56.1-26.05 118.69-.78 6.5-8.99 75.25-5.98 49.99-4.01 33.58c-24.38 12.53-42.05 21.18-42.05 21.18s-1.52-7.62-3.97-17.37c-17.11 5.13-48.77 13.64-75.6 15.34 9.77 10.89 14.26 21.12 8.17 28.67-18.38 22.76-94.26-24.92-120.8-42.7a71.84 71.84 0 00-.7 12.86l-20.31-15.62 2.01-35.94 3.39-60.81 4.26-76.26a80.064 80.064 0 01-3.37-10.03c-6.22-22.12-13.77-66.29-19.56-103.33-4.66-29.81-8.16-55-8.9-60.36l-.15-1.06 112.43-49.68c7.99 18.53 45.3 24.1 45.3 24.1 30.91-2.13 55.14-18.43 55.14-18.43l122.84 49.33z"
                  fill="#D0CDE1"
                />
                <path
                  d="M516.92 643.636s-4.76 1.63-12.5 3.94c-17.11 5.13-48.77 13.64-75.6 15.34-23.1 1.48-42.62-2.08-46.19-17.15-1.53-6.48.64-11.81 5.37-16.19 14.12-13.09 51-17.78 80.25-19.39 8.26-.45 15.9-.66 22.26-.74 10.8-.14 17.88.08 17.88.08l.17.66 8.36 33.45z"
                  fill="#A0616A"
                />
                <path
                  d="M374.746 67.847l-13.75-5.505s28.75-31.65 68.748-28.898l-11.25-12.385s27.5-11.01 52.498 17.89c13.142 15.19 28.347 33.047 37.825 53.162h14.725l-6.146 13.532 21.51 13.532-22.077-2.43a75.617 75.617 0 01.599 22.444 29.04 29.04 0 01-10.635 18.998s-17.052-35.296-17.052-40.8v13.761s-13.75-12.385-13.75-20.642l-7.499 9.633-3.75-15.137-46.248 15.137 7.5-12.385-28.749 4.129 11.25-15.138s-32.498 17.89-33.749 33.027c-1.25 15.137-10.762 29.48-10.762 29.48s-25.486-70.764 10.762-91.405z"
                  fill="#4D3324"
                />
                <path
                  d="M688.5 561.566c-7.49 8.12-26.05 20.35-48.55 33.59-8.37 4.92-17.28 9.99-26.37 15.03-21.69 12.03-44.4 23.95-63.14 33.58-24.38 12.53-42.05 21.18-42.05 21.18s-1.52-7.62-3.97-17.37c-3.28-13.05-8.22-29.92-13.37-37.39-.18-.26-.36-.5-.54-.74-1.5-1.97-3.01-3.12-4.5-3.12l74.42-46.13 32.16-19.94-23.17-55.31-29.06-69.38 17.54-55.81 17.63-56.1h33.04s10.94 23.88 24.93 57.18c2.09 4.98 4.25 10.17 6.45 15.53 28.78 70 64.66 167.75 48.55 185.2z"
                  fill="#D0CDE1"
                />
                <path
                  d="M436.99 691.586c-18.38 22.76-94.26-24.92-120.8-42.7-5.78-3.87-9.22-6.32-9.22-6.32l24.28-32.38 7.69-10.25s6.88 3.65 17.05 9.59c.37.22.74.44 1.12.66 8.77 5.15 19.78 11.88 30.89 19.39 15.33 10.37 30.83 22.2 40.82 33.34 9.77 10.89 14.26 21.12 8.17 28.67z"
                  fill="#A0616A"
                />
                <path
                  d="M355.99 609.526c-2.714-.01-5.423.21-8.1.66-22.99 3.95-29.77 24.76-31.7 38.7a71.84 71.84 0 00-.7 12.86l-20.31-15.62-7.4-5.69c-17.81-6.21-33.68-17.24-47.44-30.25a238.482 238.482 0 01-31.95-37.89 334.15 334.15 0 01-24.72-42.4 31.184 31.184 0 01-.43-26.45l25.15-56.05 36.76-81.92c.27-1.95.567-3.857.89-5.72 7.29-41.8 26.82-60.36 26.82-60.36h14.92l9.98 60.36 12.4 74.99-8.69 28.34-20.08 65.45 19.19 20.84 55.41 60.15z"
                  fill="#D0CDE1"
                />
                <path d="M372.877 434.806l12.754 14.88a366.668 366.668 0 0014.785-3.157l-3.664-11.723 8.958 10.45c53.997-13.28 120.927-39.101 120.927-39.101s-72.257 5.298-126.209-6.489c-23.87-5.215-48.43 6.618-58.226 29.003-5.693 13.01-4.8 24.282 15.394 24.282a133.375 133.375 0 0020.353-1.914l-5.072-16.231z" />
                <path
                  d="M663.65 679.386v6.07c0 1.666-.305 3.318-.91 4.87-.268.692-.593 1.36-.97 2a13.437 13.437 0 01-11.55 6.56H203.67a13.437 13.437 0 01-11.55-6.56 13.682 13.682 0 01-.97-2 13.412 13.412 0 01-.91-4.87v-6.07a13.43 13.43 0 0113.43-13.43h25.74v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.39v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.4v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.39v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.39v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.4v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.39v-2.83a.56.56 0 01.56-.56h105.2a.56.56 0 01.56.56v2.83h8.4v-2.83a.56.56 0 01.56-.56h13.43a.566.566 0 01.56.56v2.83h8.39v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.39v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.4v-2.83a.56.56 0 01.56-.56h13.43a.557.557 0 01.55.56v2.83h8.4v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h8.39v-2.83a.56.56 0 01.56-.56h13.43a.56.56 0 01.56.56v2.83h39.17a13.426 13.426 0 0113.43 13.43z"
                  fill="#3F3D56"
                />
                <path
                  fill="#3F3D56"
                  d="M60.5 690.326h733v2h-733zM627.694 423.757H461.252v-3.43H385.78v3.43H218.65c-6.217 0-11.258 5.04-11.258 11.258v227.912c0 6.218 5.041 11.258 11.259 11.258h409.043c6.218 0 11.26-5.04 11.26-11.258V435.015a11.259 11.259 0 00-11.26-11.258z"
                />
                <circle stroke="#D0CDE1" cx="423.5" cy="503.326" r="25" />
                <circle fill="#D0CDE1" cx="415.5" cy="512.326" r="25" />
                <path fill="#D0CDE1" d="M80.446 680.223h28v28h-28z" />
                <path
                  d="M91.45 658.223v34h34v-34h-34zm32.52 32.52H92.92v-31.04h31.05v31.04z"
                  fill="#3F3D56"
                />
                <path fill="#D0CDE1" d="M728.446 680.223h28v28h-28z" />
                <path
                  d="M739.45 658.223v34h34v-34h-34zm32.52 32.52h-31.05v-31.04h31.05v31.04z"
                  fill="#3F3D56"
                />
                <path
                  d="M150.594 618.754c.933 31.95-17.735 43.659-41.164 44.343a72.17 72.17 0 01-1.625.03 65.435 65.435 0 01-3.228-.055c-21.188-.88-37.96-12.127-38.827-41.84-.898-30.75 37.269-70.703 40.132-73.658l.005-.003.165-.17s43.609 39.406 44.542 71.353z"
                  fill="#D0CDE1"
                />
                <path
                  d="M107.744 658.255l14.882-22.131-14.852 24.512.031 2.49a65.435 65.435 0 01-3.228-.054l.739-32.012-.02-.247.027-.047.07-3.025-16.298-23.663 16.279 21.399.058.639.557-24.186-14.077-24.533 14.117 20.284-.147-50.107v-.167l.005.164.935 39.491 12.83-16.041-12.788 19.443.28 21.634 11.805-21.114-11.762 24.295.156 12.03 17.169-29.412-17.117 33.608.349 26.75z"
                  fill="#3F3D56"
                />
                <path
                  d="M798.594 618.754c.933 31.95-17.735 43.659-41.164 44.343a72.17 72.17 0 01-1.625.03 65.435 65.435 0 01-3.228-.055c-21.188-.88-37.96-12.127-38.827-41.84-.898-30.75 37.269-70.703 40.132-73.658l.005-.003.165-.17s43.609 39.406 44.542 71.353z"
                  fill="#D0CDE1"
                />
                <path
                  d="M755.744 658.255l14.882-22.131-14.852 24.512.031 2.49a65.435 65.435 0 01-3.228-.054l.739-32.012-.02-.247.027-.047.07-3.025-16.298-23.663 16.279 21.399.058.639.557-24.186-14.077-24.533 14.117 20.284-.147-50.107v-.167l.005.164.935 39.491 12.83-16.041-12.788 19.443.28 21.634 11.805-21.114-11.762 24.295.156 12.03 17.169-29.412-17.117 33.608.349 26.75z"
                  fill="#3F3D56"
                />
              </g>
            </svg>
          </>
          <div className="bg-white rounded-lg dark:bg-lightgrey dark:text-whitedarktheme p-6 mt-6 sm:mt-0 mx-6 sm:mx-0">
            <div>
              <h2 className="mb-6">Personal Information</h2>
              <p>
                Hi, I'm Thomas. I'm {age} years old, living in Ghent. I'm a
                professional Frontend Developer, currently working at The
                Reference.
              </p>
              <p>
                I studied Applied Computer Sciences at Hogeschool Gent. I chose
                the Mobile Development track, and went on Erasmus to Barcelona
                to learn more about Swift and Java. During my internship for
                Rialto I created an iOS app in Swift.
              </p>
              <p>
                After graduating I worked for the startup Happs as a full-stack
                developer, where I created and maintained the website. I also
                created an app for a client in React Native during this period.
              </p>
              <p>You can read more about my work in the section below.</p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="portfolio"
        ref={portfolioRef}
        className="dark:bg-lightgrey dark:text-whitedarktheme"
      >
        <div className="container mx-auto min-h-screen-without-nav items-center content-center py-6 md:py-12">
          <h2 className="text-center mb-6 md:mb-12">Some of my work</h2>
          <div className="grid mx-6 sm:mx-0 grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <Case
              url="https://www.karaton.be"
              logoAlt="Karaton"
              logoSrc="/logokaraton.png"
              logoWidth={218}
              tags={['mongodb', 'expressjs', 'angular', 'nodejs']}
            >
              <p>
                For Happs Development I created and maintained the website for
                Karaton where speech therapists and parents of dyslexic could
                follow up on the progress their children/patients are making in
                the Karaton game.
              </p>
              <p>
                There were a lot of graphs to be shown with Highcharts, a
                payment integration through Mollie, different roles for
                admins/therapists/parents.
              </p>
              <p>
                In this team I worked as a Full Stack Developer, giving me a lot
                of insight in how the backend of a web application works.
              </p>
            </Case>
            <Case
              url="https://www.getrialto.com"
              logoAlt="Rialto"
              logoSrc="/logorialto.png"
              logoWidth={321}
              tags={['swift', 'ios']}
            >
              <p>
                At my internship for Rialto I created an iOS app from scratch in
                Swift where real estate companies could easily manage their
                listings.
              </p>
              <p>
                I created the screens in storyboards based on the designs
                provided by our designer.
              </p>
              <p>
                When the screens were finished I used Swift code to implement
                functionality such as logins through an API, fetching the
                listings through an API, saving the listings in the SQLite
                database..
              </p>
            </Case>
            <Case
              url="https://play.google.com/store/apps/details?id=com.carlierkathleen.rekenen&hl=nl"
              logoAlt="Carlier Rekenen"
              logoSrc="/logocarlier.png"
              logoWidth={100}
              tags={['react-native', 'reactjs']}
            >
              <p>
                While working at Happs Development I also created a mobile
                application for a speech therapist to help children with
                discalculia to learn how to count and do simple math exercises
                in a fun game form.
              </p>
              <p>
                The app was created from scratch using React Native for fast
                development, and Expo to get fast previews of the app on real
                devices.
              </p>
              <p>
                This project taught me a lot about animations, how to handle
                dynamically generated sound output for the spoken numbers, learn
                which platform specific APIs to use..
              </p>
            </Case>
            <Case
              url="https://www.carglass.be"
              logoAlt="Carglass"
              logoSrc="/logocarglass.png"
              logoWidth={374}
              tags={['sitecore', 'reactjs', 'less']}
            >
              <p>
                While working at Happs Development I also created a mobile
                application for a speech therapist to help children with
                discalculia to learn how to count and do simple math exercises
                in a fun game form.
              </p>
              <p>
                The app was created from scratch using React Native for fast
                development, and Expo to get fast previews of the app on real
                devices.
              </p>
              <p>
                This project taught me a lot about animations, how to handle
                dynamically generated sound output for the spoken numbers, learn
                which platform specific APIs to use..
              </p>
            </Case>
            <Case
              url="https://www.nationale-loterij.be"
              logoAlt="Nationale Loterij"
              logoSrc="/logonalo.png"
              logoWidth={240}
              tags={['sitecore', 'reactjs', 'sass']}
            >
              <p>
                One of the other clients I work for at The Reference is
                Nationale Loterij, for this client we constantly create new
                features with a modern look on a monthly basis.
              </p>
              <p>
                In this project I get to test out even more new technologies,
                and new features in the existing technologies (think React
                Hooks, CSS3 animations..).
              </p>
              <p>
                The feature I'm most proud of is the interactive Sponsoring Map
                of Belgium we created with some nice animations and beautiful
                design.
              </p>
            </Case>
            <Case
              url="https://www.achterderegenboog.be"
              logoAlt="Achter De Regenboog"
              logoSrc="/logoachterderegenboog.png"
              logoWidth={150}
              tags={['wordpress', 'html', 'css']}
            >
              <p>
                In my free time I like to experiment with other frameworks and
                technologies too, this is why I made a website using Wordpress
                for a friend of mine who started a psychologists practice.
              </p>
              <p>
                My friend gave me some high level designs, and I got to work! I
                selected a fitting theme.{' '}
              </p>
              <p>
                I built on the theme with a lot of plugins to optimize the speed
                of the website (Autoptimize), the SEO (Yoast) and anti-spam by
                Akismet.
              </p>
            </Case>
            <Case
              url="https://www.deckdeckgo.com"
              logoAlt="DeckDeckGo"
              logoSrc="/logoduckduckgo.png"
              logoWidth={100}
              tags={['open source', 'hacktoberfest', 'stencil', 'typescript']}
            >
              <p>
                In 2020 I participated in Hacktoberfest for the first time ever.
                I did some research on which open source project I would like to
                contribute to, and landed on DeckDeckGo.
              </p>
              <p>
                It was a lot of fun to coloborate with other open source
                contributors, and to work in a new technological stack. I'm
                definitely going to continue contributing to open source in the
                future!
              </p>
            </Case>
            <Case
              url="https://www.accentjobs.be"
              logoAlt="Accent Jobs"
              logoSrc="/logoaccent.png"
              logoWidth={532}
              tags={['gatsby', 'drupal', 'typescript', 'emotion']}
            >
              <p>
                At the end of 2020, I got the opportunity to work on a project
                within The Reference using our new MACH stack.
              </p>
              <p>
                This was the first time I was using Gatsby for a production
                website, and I must say it makes developing a breeze. Connecting
                everything through API's, no hard dependecies on a CMS.. I love
                it.
              </p>
            </Case>
            <Case
              url="https://www.portofantwerp.be"
              logoAlt="Port Of Antwerp"
              logoSrc="/poa.png"
              logoWidth={199}
              tags={['nextjs', 'drupal', 'typescript', 'tailwind']}
            >
              <p>
                Starting february 2021, we started working on a new website for
                the Port of Antwerp. This website uses the MACH stack as
                mentioned above, but with Next.js instead of Gatsby, and
                Tailwind for styling!
              </p>
              <p>
                I really like this combo (this website is made with these
                technologies), so I couldn't be happier to be the lead frontend
                developer on this project. So far I've learned a lot about the
                many features and possibilities of Next.js, and I'm hoping to
                create the most performant website for this high profile client.
              </p>
            </Case>
          </div>
        </div>
      </section>
      <section
        id="blog"
        ref={blogRef}
        className="bg-purple dark:bg-darkgrey dark:text-whitedarktheme"
      >
        <div className="container mx-auto min-h-screen-without-nav flex flex-col items-center justify-center py-6">
          <h2 className="text-center mb-6 md:mb-12">Personal blog</h2>
          {blogs &&
            blogs.map(blog => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                key={blog.id}
                href={blog.url}
                aria-label={blog.title}
              >
                <article className="bg-white rounded-lg dark:bg-lightgrey dark:text-whitedarktheme p-6 mb-6 mx-6 sm:mx-0 ">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-medium mb-3 dark:text-white">
                      {blog.title}
                    </h3>
                    <time className="text-right text-sm">
                      {blog.readable_publish_date}
                    </time>
                  </div>
                  <p className="mb-3">{blog.description}</p>
                  <ul className="flex flex-wrap">
                    {blog.tag_list.map((tag, i) => (
                      <li
                        className={`text-sm my-1 py-1 px-4 mr-2 rounded-md ${tag}`}
                        key={i}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </a>
            ))}
        </div>
      </section>
      <section
        ref={statsRef}
        id="stats"
        className="dark:bg-lightgrey dark:text-whitedarktheme"
      >
        <div className="container mx-auto min-h-screen-without-nav flex flex-col items-center justify-center py-6 md:py-12 w-full">
          <h2 className="text-center mb-6 md:mb-12">My Strava stats</h2>
          <div className="flex flex-col w-full lg:mx-auto relative lg:w-1/2">
            <div className="flex rounded-full self-center mb-4">
              <div
                role="button"
                className={`px-6 lg:px-12 py-2 lg:py-4 border-2 rounded-tl-full rounded-bl-full flex justify-center cursor-pointer  w-1/2 text-center ${
                  !showRunning
                    ? 'bg-darkPurple dark:bg-orange text-white border-darkPurple dark:border-orange'
                    : ''
                }`}
                onClick={() => setShowRunning(false)}
              >
                <FontAwesomeIcon size="2x" icon={faBiking} />
              </div>
              <div
                role="button"
                className={`px-6 lg:px-12 py-2 lg:py-4 border-2 cursor-pointer w-1/2 rounded-tr-full rounded-br-full  flex justify-center flex justify-center ${
                  showRunning
                    ? 'bg-darkPurple dark:bg-orange text-white border-darkPurple dark:border-orange'
                    : ''
                }`}
                onClick={() => setShowRunning(true)}
              >
                <FontAwesomeIcon size="2x" icon={faRunning} />
              </div>
            </div>
            <div className="border-2  mx-6">
              {showRunning ? (
                <div className="px-8 py-4 flex flex-col justify-evenly">
                  <p className="mb-3">
                    <FontAwesomeIcon size="1x" icon={faRoad} className="mr-2" />
                    {Math.floor(stravaStats.all_run_totals.distance / 1000)}
                    km
                  </p>
                  <p className="mb-3">
                    <FontAwesomeIcon
                      size="1x"
                      icon={faMountain}
                      className="mr-2"
                    />
                    {stravaStats.all_run_totals.elevation_gain}m
                  </p>
                  <p className="mb-3">
                    <FontAwesomeIcon
                      size="1x"
                      icon={faClock}
                      className="mr-2"
                    />
                    {Math.floor(stravaStats.all_run_totals.moving_time / 3600)}h
                  </p>
                  <p className="mb-3">
                    <FontAwesomeIcon
                      size="1x"
                      icon={faTachometerAlt}
                      className="mr-2"
                    />
                    {(
                      stravaStats.all_run_totals.distance /
                      1000 /
                      (stravaStats.all_run_totals.moving_time / 3600)
                    ).toFixed(2)}{' '}
                    km/h
                  </p>
                  Running towards 5000km goal
                  <progress
                    className="mt-2"
                    value={stravaStats.all_run_totals.distance / 10 / 5000}
                    max={100}
                  ></progress>
                </div>
              ) : (
                <div className="px-8 py-4 flex flex-col justify-evenly">
                  <p className="mb-3">
                    <FontAwesomeIcon size="1x" icon={faRoad} className="mr-2" />
                    {Math.floor(stravaStats.all_ride_totals.distance / 1000)}km
                  </p>
                  <p className="mb-3">
                    <FontAwesomeIcon
                      size="1x"
                      icon={faMountain}
                      className="mr-2"
                    />
                    {stravaStats.all_ride_totals.elevation_gain}m
                  </p>
                  <p className="mb-3">
                    <FontAwesomeIcon
                      size="1x"
                      icon={faClock}
                      className="mr-2"
                    />
                    {Math.floor(stravaStats.all_ride_totals.moving_time / 3600)}
                    h
                  </p>
                  <p className="mb-3">
                    <FontAwesomeIcon
                      size="1x"
                      icon={faTachometerAlt}
                      className="mr-2"
                    />
                    {(
                      stravaStats.all_ride_totals.distance /
                      1000 /
                      (stravaStats.all_ride_totals.moving_time / 3600)
                    ).toFixed(2)}{' '}
                    km/h
                  </p>
                  Biking towards 5000km goal
                  <progress
                    className="mt-2"
                    value={stravaStats.all_ride_totals.distance / 10 / 5000}
                    max={100}
                  ></progress>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        ref={contactRef}
        className="bg-purple dark:bg-darkgrey dark:text-whitedarktheme"
      >
        <div className="container grid md:grid-cols-3 gap-6 min-h-screen-without-nav content-center align-items">
          <div className="p-6 flex justify-center flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 561.8 654.5">
              <path
                className="text-darkPurple dark:text-orange"
                d="M96.1 393.8h254.5v221H96.1z"
                fill="currentColor"
              />
              <path
                fill="#FFB8B8"
                d="M260.5 160s2.8 10.8-3.4 18.4c-6.2 7.6 26.6 34.8 26.6 34.8l17.3-3s-3.8-33.1 1.3-41.4-41.8-8.8-41.8-8.8z"
              />
              <path
                opacity=".1"
                d="M260.5 160s2.8 10.8-3.4 18.4c-6.2 7.6 26.6 34.8 26.6 34.8l17.3-3s-3.8-33.1 1.3-41.4-41.8-8.8-41.8-8.8z"
              />
              <path
                fill="#FFB8B8"
                d="M375.4 474.6l-38.1 50.6 26 15.1 35.8-58.6z"
              />
              <path
                fill="#2F2E41"
                d="M348.7 526s-14-16.3-13.4-12.7c.6 3.6-10 34.5-.1 37.5s94.6 10.9 95.8 1.3-25.3-16.3-25.3-16.3-15.7-15.1-19.2-13.6-37.8 3.8-37.8 3.8z"
              />
              <path
                fill="#FFB8B8"
                d="M366.9 522.9l30.4 51.9 23-13.3-30.7-42.5z"
              />
              <path
                fill="#2F2E41"
                d="M415 399.4l-9 12.8s-43.1 59.9-38.5 64.7 23.6 23.1 33.3 19.6 44.1-64.7 44.1-64.7l-9-35.9-20.9 3.5z"
              />
              <path
                fill="#2F2E41"
                d="M229.3 387.3s9.7 18 34.1 24.1 50 18.6 50.9 18.4 3.5-1.5 4.1 2.1 7.3 10 7.3 10 27 91.8 37.3 91.9 31.5-7.3 32-10.2-31.6-96.7-31.9-98.5l-3.8-21.8s42.4 6.8 46.3 8 39.1 20.4 39.1 20.4 35.8-25.8 2.3-51.9-91.1-45.2-91.1-45.2l-20.7-5.8-18-1.1-2.7-10.2-42.7 2.5-44.5 18.9 2 48.4z"
              />
              <circle fill="#FFB8B8" cx="285.6" cy="148.1" r="33.2" />
              <path
                fill="#D0CDE1"
                d="M255.5 179.8l4-.7s7.2 27.8 29.6 32.4c0 0 11-13.2 10.5-15.4s8.7-14.1 13.6-7.5-1.2 123.8 2.9 125.9 12.9 4.3 5.8 12.1-35.3 18.2-41.5 14.6-19-34.2-24.5-44.5c-5.5-10.3-14.3-45.3-14.3-45.3s-11.3-38.3-4.3-47 18.2-24.6 18.2-24.6z"
              />
              <path
                fill="#2F2E41"
                d="M287.3 319.1c-.7 8.2-2 16.3-3.8 24.3-1.6 6.5-3.5 10.4-5.7 10.3-5.5-.4-8 7.7-9.3 17-1.4 9.9-1.4 21.2-2.1 25.2-1 5.3-7.4 9.3-20.3 8.1-7.7-.9-15.2-2.7-22.3-5.5-17.3-6.3-16.8-57.5-13.9-95.4 1.8-23.3 4.4-41.6 4.4-41.6s-5.3-15.7-7-26.5c-.3-2-.5-4-.5-5.9.3-9.4 17.4-34.8 27.8-50.7 10.4-15.8 24.6-4.2 24.6-4.2l-4.9 14.9s7.6 11.8 7.7 23 18.3 19.3 24.9 24.8c4 3.4 3.9 49 .4 82.2zm14.5-139.6s1.2 1.4 6.7.7c6.6-.8 15.6 1.4 17.7 7.7 3.9 11.5 14.7 58.4 14.7 58.4s4.5 53.5 6.6 65.4 1 22.3 3 28.5-19.8-11.6-27.8-9.3-13.2-27.7-12.2-38.2 1.9-21.9-.9-32.6c-2.8-10.8 2.2-39.2 2-45.8s-17.8-22.9-9.8-34.8z"
              />
              <path
                fill="#FFB8B8"
                d="M325.3 346s35.2 19.2 38.6 46.5-47.1-26.5-47.1-26.5l8.5-20zm20.1-19.4s10.8 54.3 27.6 51.5-9.4-54.6-9.4-54.6l-18.2 3.1z"
              />
              <path
                fill="#2F2E41"
                d="M402.9 563.5s-8.6 9.9-10.7 8.4-7 19-2.6 22.9 21.5 10.4 21.6 16.9 45.9 5.2 47.5-1.6-5.7-22.4-10.9-25.3-24.3-29.2-24.3-29.2-15 2.3-20.6 7.9z"
              />
              <path
                opacity=".1"
                d="M319.7 379.2c-8.2-5.8-30.9-7.2-51.2-8.5-8.9-.6-17.3-1.1-23.7-2-6.2-.9-11.8-6.5-16.7-15-7.5-12.8-13.6-32-18.3-50.5 1.8-23.3 4.4-41.6 4.4-41.6s-5.3-15.7-7-26.5c1.2-1.7 2.7-3 4.5-4 21.5-9.2 41.9 81.4 44.5 95.6 0 .2.1.5.1.6 1.3 7.3 14.9 13.6 27.1 16.1 7.5 1.5 14.5 1.6 17.7-.4 8.5-5.2 34.5 15.6 36.5 16.2 2.2.6-6.2 28.3-17.9 20z"
              />
              <path
                fill="#2F2E41"
                d="M211.8 225.5s-15.6 7.4-8.7 41.8 20.7 92.9 41.8 95.9 63.1 2.3 74.9 10.5 20.1-19.4 18.1-20-28-21.4-36.5-16.2-42.8-3.9-44.8-15.7c-2.2-11.9-23-105.7-44.8-96.3zM324.2 209l17.1 39.8s1.7-.9 3.7 5.4c2 6.2 2.9 11.7 6.5 15.8s19.1 62.3 19.6 65-21.6 12.1-26.5 4.6S324.2 209 324.2 209z"
              />
              <path
                fill="#4D3324"
                d="M266.7 147.7c1.3-.3 1.5-2 1.5-3.3.2-7.1 4.5-14.3 11.2-16.3 2.6-.7 5.3-.9 8-.4 3.8.5 7.4 1.7 10.8 3.6 1.8 1 3.5 2.2 5.5 2.5 1.3.2 7 1.9 8.3 2.1 2.9.5 5.6 3.1 8.3 2.1 2.6-.9 3.2-4.3 3.3-7.2.1-6.4-4.7-15.2-9-20-3.2-3.6-8.1-5.3-12.9-6.1-5.6-.9-11.2-1.2-16.9-1-7.6.1-15.5.7-22.4 4-6.9 3.3-12.7 9.9-13 17.5-.1 1.6.1 3.2 0 4.8-.3 3.9-2.4 7.4-3.3 11.1-1.4 5.6-.4 11.5 2.8 16.3 2.6 3.8 6.6 7.2 6.4 11.7l5.5-5.7c1.7-1.3 2.3-3.6 1.4-5.6l-2-7.6c-.5-1.4-.6-2.9-.2-4.3 2.3-5.4 4.6 2.3 6.7 1.8z"
              />
            </svg>
          </div>
          <div className="p-6 flex justify-center flex-col">
            <h2 className="mb-6">Drop me a message</h2>
            <form
              onSubmit={e => submitForm(e)}
              action="https://formspree.io/xzbgjqdq"
              method="POST"
            >
              <div className="flex flex-col">
                <label className="mb-3" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="py-2 px-4 bg-white border-darkPurple dark:border-orange border-2"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="info@example.com"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="my-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="py-2 px-4 bg-white border-darkPurple dark:border-orange border-2"
                  rows="3"
                  id="message"
                  type="text"
                  name="message"
                  placeholder="Hey, I would like to get in touch with you"
                  required
                />
              </div>

              <button
                ref={formSubmitBtnRef}
                className="w-full mt-4 py-4 bg-darkPurple dark:bg-orange text-white dark:text-whitedarktheme"
                type="submit"
              >
                Submit
              </button>
              {formResult === 'error' && (
                <p className="error">
                  Ooops! There was an error. Try again later.
                </p>
              )}
              {formResult === 'ok' && (
                <p className="success">
                  I received your message. I'll get back to you ASAP.
                </p>
              )}
            </form>
          </div>
          <div className="p-6 flex justify-center items-center flex-col">
            <h2 className="mb-6">You can also find me here</h2>
            <ul className="flex">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="linkedin"
                  className="mr-2"
                  href="https://www.linkedin.com/in/thomasledoux91"
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={faLinkedin}
                    className="fill-current text-linkedIn"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="github"
                  className="mr-2"
                  href="https://github.com/thomasledoux1"
                >
                  <FontAwesomeIcon size="2x" icon={faGithub} className="" />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                  className="mr-2"
                  href="https://www.facebook.com/thomasledoux91/"
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={faFacebook}
                    className="fill-current text-linkedIn"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="dev.to"
                  href="https://dev.to/thomasledoux1"
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={faDev}
                    className="fill-current"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps(context) {
  const entries = await db.collection('access_tokens').get()
  let [{access_token, refresh_token}] = entries.docs.map(entry => entry.data())
  let resStats
  resStats = await fetch(
    'https://www.strava.com/api/v3/athletes/40229513/stats',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )
  if (resStats.status !== 200) {
    const resToken = await fetch(
      `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.CLIENT_ID_STRAVA}&client_secret=${process.env.CLIENT_SECRET_STRAVA}&grant_type=refresh_token&refresh_token=${refresh_token}`,
      {
        method: 'POST',
      },
    )
    const {
      access_token: newToken,
      refresh_token: newRefreshToken,
    } = await resToken.json()
    const resStats = await fetch(
      'https://www.strava.com/api/v3/athletes/40229513/stats',
      {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      },
    )
    db.collection('access_tokens')
      .doc('CSXyda8OfK75Aw0vtbtZ')
      .update({
        access_token: newToken,
        refresh_token: newRefreshToken,
      })
  }
  const stravaStats = await resStats.json()
  const res = await fetch('https://dev.to/api/articles?username=thomasledoux1')
  const blogs = await res.json()

  return {
    props: {
      stravaStats,
      blogs,
    },
    revalidate: 86400,
  }
}

export default Home
