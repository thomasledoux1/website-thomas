import React, {useEffect} from 'react'
import AOS from 'aos'
import Head from 'next/head'
import Image from 'next/image'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons'
import {faStar as faStarFull} from '@fortawesome/free-solid-svg-icons'
import TimelineItem from '../components/TimelineItem'

const CV = () => {
  const age = Math.floor(
    (new Date() - new Date('1991-07-11').getTime()) / 3.15576e10,
  )
  const technologies = [
    {name: 'React', numberOfStars: 4},
    {name: 'Vue.js', numberOfStars: 2},
    {name: 'Angular', numberOfStars: 2},
    {name: 'Gatsby.js', numberOfStars: 3},
    {name: 'Next.js', numberOfStars: 4},
    {name: 'React Native', numberOfStars: 3},
    {name: 'Swift', numberOfStars: 2},
    {name: 'Wordpress', numberOfStars: 3},
    {name: 'ES6', numberOfStars: 4},
    {name: 'HTML', numberOfStars: 5},
    {name: 'CSS', numberOfStars: 4},
  ]
  const renderStars = amount =>
    Array.apply(null, {length: 5}).map((_, i) => (
      <span className="star" key={i}>
        <FontAwesomeIcon
          className={`fill-current text-primary ${i < amount ? 'full' : ''}`}
          icon={i < amount ? faStarFull : faStarEmpty}
        />
      </span>
    ))
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <>
      <Head>
        <title>Thomas Ledoux' Portfolio - CV</title>
      </Head>
      <section id="cv" className="dark:bg-lightgrey text-text">
        <div className="container py-12 mx-auto grid grid-cols-1 sm:grid-cols-3 sm:gap-16">
          <div className="col-span-1 mx-6 sm:mx-0">
            <div className="text-center">
              <Image
                className="rounded-full"
                priority
                alt="Profile picture"
                src="/me.jpg"
                width={320}
                height={320}
              />
              <p>Hello, is it me you're looking for?</p>
            </div>
          </div>
          <div className="col-span-1 mx-6 mt-6 sm:mt-0 sm:mx-0 sm:col-span-2 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl mb-4">A bit about me</h1>
            <div>
              <p>
                Hi, I'm Thomas. I'm {age} years old, living in Ghent. I'm a
                professional Frontend Developer, currently working at{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow"
                  href="https://www.the-reference.be"
                >
                  The Reference
                </a>
                .
              </p>
              <p>
                What I like most about Frontend development is the ever-changing
                technology. New frameworks being released daily (one better than
                the other...), constant improvements to existing frameworks,
                yearly new features in ECMAScript..
              </p>
              <p>
                I'm always eager to discover the latest updates, apps,
                technologies..!
              </p>
            </div>
          </div>
          <div className="col-span-1 mx-6 mt-6 sm:mt-0 sm:mx-0">
            <h2 className="text-xl lg:text-2xl mb-4">Technologies</h2>
            {technologies.map((technology, i) => (
              <div key={i} className="flex justify-between mb-4">
                <div>{technology.name}</div>
                <div>{renderStars(technology.numberOfStars)}</div>
              </div>
            ))}
          </div>
          <div className="col-span-1 mx-6 mt-6 sm:mt-0 sm:mx-0 sm:col-span-2">
            <h2 className="text-xl lg:text-2xl mb-4">My timeline</h2>
            <div className="flex w-full flex-col timeline-container relative">
              <TimelineItem index={0} url="https://reference.be">
                <time className="text-xs text-grey">October 2018 - now</time>
                <p>
                  Frontend Developer at{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow"
                    href="https://reference.be"
                  >
                    The Reference
                  </a>
                  , Ghent
                </p>
              </TimelineItem>
              <TimelineItem index={1} url="https://happsdevelopment.com">
                <time className="text-xs text-grey">
                  September 2017 - October 2018
                </time>
                <p>
                  Full Stack Developer at{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow"
                    href="https://happsdevelopment.com"
                  >
                    Happs Development
                  </a>
                  , Ghent
                </p>
              </TimelineItem>
              <TimelineItem index={2} url="https://getrialto.com">
                <time className="text-xs text-grey">
                  February 2017 - June 2017
                </time>
                <p>
                  Internship as Swift Developer at{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow"
                    href="https://getrialto.com"
                  >
                    Rialto
                  </a>
                  , Ghent
                </p>
              </TimelineItem>
              <TimelineItem index={3} url="https://hogent.be">
                <time className="text-xs text-grey">
                  September 2014 - June 2017
                </time>
                <p>
                  Bachelor Applied Computer Sciences at{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow"
                    href="https://hogent.be"
                  >
                    Hogeschool Gent
                  </a>
                </p>
              </TimelineItem>
              <TimelineItem index={4} url="https://telenet.be">
                <time className="text-xs text-grey">
                  May 2012 - August 2014
                </time>
                <p>
                  Support Engineer at{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow"
                    href="https://telenet.be"
                  >
                    Telenet
                  </a>
                  , Lochristi
                </p>
              </TimelineItem>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CV
