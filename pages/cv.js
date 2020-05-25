import React, { useEffect } from 'react';
import AOS from 'aos';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Rating from '../components/Rating';
import Layout from '../components/Layout';
import Timeline from '../components/Timeline';

const CV = () => {
  const technologies = [{ name: 'React', numberOfStars: 4 }, { name: 'Vue.js', numberOfStars: 2 }, { name: 'Angular', numberOfStars: 2 }, { name: 'Gatsby.js', numberOfStars: 3 }, { name: 'React Native', numberOfStars: 3 }, { name: 'Swift', numberOfStars: 2 }, { name: 'Wordpress', numberOfStars: 3 }, { name: 'ES6', numberOfStars: 4 }, { name: 'HTML', numberOfStars: 5 }, { name: 'CSS', numberOfStars: 4 }];
  const experiences = [{ text: 'Frontend Developer at The Reference, Ghent', date: 'October 2018 - now' }, { text: 'Full Stack Developer at Happs Development, Ghent', date: 'September 2017 - October 2018' }, { text: 'Internship as Swift Developer at Rialto, Ghent', date: 'February 2017 - June 2017' }, { text: 'Bachelor Applied Computer Sciences at Hogeschool Gent', date: 'September 2014 - June 2017' }, { text: 'Support Engineer at Telenet Hostbasket, Lochristi', date: 'May 2012 - August 2014' }];
  useEffect(() => {
    AOS.init({
      duration: 1200
    });
    if ("IntersectionObserver" in window) {
      let imgObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.add("lazyloaded");
            observer.unobserve(lazyImage);
          }
        });
      });
      document.querySelectorAll('img.lazy').forEach(el => imgObserver.observe(el));
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Thomas Ledoux' Portfolio - CV</title>
      </Head>
      <section id="cv" className="container">
        <div className="cv-pictureDescriptionWrapper">
          <div className="col-4 fc">
            <div className="cv-picture">
              <img className="cv-picture__img lazy" alt="cv picture" src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_250/e_blur:1000,q_1,f_auto/me_qvrwky.jpg" data-src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_250/me_qvrwky.jpg" />
              <p className="cv-picture__description">Hello, is it me you're looking for?</p>
            </div>
          </div>
          <div className="col-8 fc">
            <h1>A bit about me</h1>
            <div className="cv-description">
              <p>Hi, I'm Thomas. I'm 28 years old, living in Ghent. I'm a professional Frontend Developer, currently working at The Reference.</p>
              <p>What I like most about Frontend development is the ever-changing technology. New frameworks being released daily (one better than the other...), constant improvements to existing frameworks, yearly new features in ECMAScript..</p>
              <p>I'm always eager to discover the latest updates, apps, technologies..!</p>
            </div>
          </div>
        </div>
        <div className="cv-ratingsExperienceWrapper">
          <div className="col-4 fc">
            <div className="cv-ratingsWrapper">
              <Rating title="Technologies" elements={technologies}>
              </Rating>
            </div>
          </div>
          <div className="col-8 fc">
            <h2>My timeline</h2>
            <Timeline experiences={experiences} />
          </div>
        </div>
        <div data-aos="fade-up" className="cv-ctaWrapper">
          <span>Like what you see? Send me an <a href="mailto:thomasledoux1@gmail.com">e-mail</a>, so we can grab a <FontAwesomeIcon icon={faCoffee} /> and talk.</span></div>
      </section>
    </Layout>
  )
};

export default CV;