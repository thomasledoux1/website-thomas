import React, { useEffect } from 'react';
import AOS from 'aos';
import Head from 'next/head';
import Image from 'next/image';
import Rating from '../components/Rating';
import Timeline from '../components/Timeline';

const CV = () => {
  const age = Math.floor((new Date() - new Date('1991-07-11').getTime()) / 3.15576e+10);
  const technologies = [{ name: 'React', numberOfStars: 4 }, { name: 'Vue.js', numberOfStars: 2 }, { name: 'Angular', numberOfStars: 2 }, { name: 'Gatsby.js', numberOfStars: 3 }, { name: 'React Native', numberOfStars: 3 }, { name: 'Swift', numberOfStars: 2 }, { name: 'Wordpress', numberOfStars: 3 }, { name: 'ES6', numberOfStars: 4 }, { name: 'HTML', numberOfStars: 5 }, { name: 'CSS', numberOfStars: 4 }];
  const experiences = [
    { text: 'Frontend Developer at <a class="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow" href="https://reference.be">The Reference</a>, Ghent', date: 'October 2018 - now' },
    { text: 'Full Stack Developer at <a class="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow" href="https://happsdevelopment.com">Happs Development</a>, Ghent', date: 'September 2017 - October 2018' },
    { text: 'Internship as Swift Developer at <a class="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow" href="https://getrialto.com">Rialto</a>, Ghent', date: 'February 2017 - June 2017' },
    { text: 'Bachelor Applied Computer Sciences at <a class="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow" href="https://hogent.be">Hogeschool Gent</a>', date: 'September 2014 - June 2017' },
    { text: 'Support Engineer at <a class="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow" href="https://telenet.be">Telenet</a>, Lochristi', date: 'May 2012 - August 2014' }
  ];
  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []);

  return (
    <>
      <Head>
        <title>Thomas Ledoux' Portfolio - CV</title>
      </Head>
      <section id="cv" className="dark:bg-lightgrey dark:text-whitedarktheme">
        <div className="container py-12 mx-auto grid grid-cols-1 sm:grid-cols-3 sm:gap-16">
          <div className="col-span-1 mx-6 sm:mx-0">
            <div className="text-center">
              <Image className="rounded-full" loading="eager" priority alt="Profile picture" src="https://res.cloudinary.com/dzrea5zhv/image/upload/v1583171588/me_qvrwky" width={320} height={320} />
              <p>Hello, is it me you're looking for?</p>
            </div>
          </div>
          <div className="col-span-1 mx-6 mt-6 sm:mt-0 sm:mx-0 sm:col-span-2 flex flex-col justify-center">
            <h1>A bit about me</h1>
            <div>
              <p>Hi, I'm Thomas. I'm {age} years old, living in Ghent. I'm a professional Frontend Developer, currently working at <a className="cursor-pointer shadow-link hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow" href="https://www.the-reference.be">The Reference</a>.</p>
              <p>What I like most about Frontend development is the ever-changing technology. New frameworks being released daily (one better than the other...), constant improvements to existing frameworks, yearly new features in ECMAScript..</p>
              <p>I'm always eager to discover the latest updates, apps, technologies..!</p>
            </div>
          </div>
          <div className="col-span-1 mx-6 mt-6 sm:mt-0 sm:mx-0">
            <Rating title="Technologies" elements={technologies}>
            </Rating>
          </div>
          <div className="col-span-1 mx-6 mt-6 sm:mt-0 sm:mx-0 sm:col-span-2">
            <h2 className="mb-4">My timeline</h2>
            <Timeline experiences={experiences} />
          </div>
        </div>
      </section>
    </>
  )
};

export default CV;