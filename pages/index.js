import React, {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import smoothscroll from 'smoothscroll-polyfill'
import db from '../utils/db'
import Portfolio from '../components/Portfolio'
import StravaStats from '../components/StravaStats'
import Blog from '../components/Blog'
import Contact from '../components/Contact'

const Home = ({
  blogs,
  stravaMostRecentRide,
  stravaMostRecentRun,
  stravaStats,
}) => {
  const textWrapper = useRef(null)
  const personalRef = useRef(null)
  const portfolioRef = useRef(null)
  const statsRef = useRef(null)
  const contactRef = useRef(null)
  const blogRef = useRef(null)
  const charCounterRef = useRef(0)
  const timeOutRef = useRef(null)
  const forwardRef = useRef(true)
  const currentIndexRef = useRef(0)
  const suggestionsRef = useRef([
    'developer',
    'cyclist',
    'badminton player',
    'travel lover',
  ])
  const currentTextRef = useRef(suggestionsRef.current[0])
  const age = Math.floor(
    (new Date() - new Date('1991-07-11').getTime()) / 3.15576e10,
  )
  const speed = 100

  const scrollToBlogRef = () => {
    blogRef.current.scrollIntoView({behavior: 'smooth'})
  }

  const createTextAnimation = React.useCallback(() => {
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
      timeOutRef.current = setTimeout(createTextAnimation, speed)
    } else if (charCounterRef.current === currentTextRef.current.length) {
      forwardRef.current = false
      charCounterRef.current -= 1
      timeOutRef.current = setTimeout(createTextAnimation, speed * 4)
    } else if (charCounterRef.current === -1) {
      currentIndexRef.current =
        currentIndexRef.current + 1 === suggestionsRef.current.length
          ? 0
          : currentIndexRef.current + 1
      currentTextRef.current = suggestionsRef.current[currentIndexRef.current]
      charCounterRef.current = 0
      forwardRef.current = true
      timeOutRef.current = setTimeout(createTextAnimation, speed)
    }
  }, [])

  useEffect(() => {
    smoothscroll.polyfill()
    createTextAnimation()

    return () => clearTimeout(timeOutRef.current)
  }, [createTextAnimation])

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
          if (
            entry.isIntersecting &&
            !navElement.classList.contains('active')
          ) {
            navElement.classList.add('active')
          } else if (
            !entry.isIntersecting &&
            navElement.classList.contains('active')
          ) {
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
          <img src="/personal.svg" />
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
          <Portfolio />
        </div>
      </section>
      <section
        id="blog"
        ref={blogRef}
        className="bg-purple dark:bg-darkgrey dark:text-whitedarktheme"
      >
        <div className="container mx-auto min-h-screen-without-nav flex flex-col items-center justify-center py-6 md:py-12">
          <h2 className="text-center mb-6 md:mb-12">Personal blog</h2>
          <Blog blogs={blogs} scrollToBlogRef={() => scrollToBlogRef()} />
        </div>
      </section>
      <section
        ref={statsRef}
        id="stats"
        className="dark:bg-lightgrey dark:text-whitedarktheme"
      >
        <div className="container mx-auto min-h-screen-without-nav flex flex-col items-center justify-center py-6 md:py-12 w-full">
          <h2 className="text-center mb-6 md:mb-12">My Strava stats</h2>
          <StravaStats
            stravaStats={stravaStats}
            stravaMostRecentRun={stravaMostRecentRun}
            stravaMostRecentRide={stravaMostRecentRide}
          />
        </div>
      </section>
      <section
        id="contact"
        ref={contactRef}
        className="bg-purple dark:bg-darkgrey dark:text-whitedarktheme"
      >
        <div className="container grid md:grid-cols-3 gap-6 min-h-screen-without-nav content-center align-items">
          <Contact />
        </div>
      </section>
    </>
  )
}

export async function getStaticProps(context) {
  const entries = await db.collection('access_tokens').get()
  let [{access_token, refresh_token}] = entries.docs.map(entry => entry.data())
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
  const resActivities = await fetch(
    'https://www.strava.com/api/v3/athlete/activities',
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

  const stravaStats = await resStats.json()
  const stravaActivies = await resActivities.json()
  const res = await fetch(`https://dev.to/api/articles/me/published`, {
    headers: {
      'api-key': process.env.DEV_KEY,
    },
  })
  const blogs = await res.json()

  return {
    props: {
      stravaStats,
      stravaMostRecentRide: stravaActivies.filter(
        activity => activity.type === 'Ride',
      )[0],
      stravaMostRecentRun: stravaActivies.filter(
        activity => activity.type === 'Run',
      )[0],
      blogs,
    },
    revalidate: 86400,
  }
}

export default Home
