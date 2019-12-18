import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs/lib/anime.js';
import Head from 'next/head'
import "../styles.scss";
import Navigation from './navigation';

const Index = () => {
    const textWrapper = useRef(null);
    const suggestions = ['een nerd', 'een badmintonner', 'een squasher'];
    const speed = 100;
    let charCounter = 0;
    let currentIndex = 0;
    let currentText = suggestions[0];
    let timeOut = null;
    let forward = true;

    const createAnimation = () => {
        if (charCounter < currentText.length && charCounter > -1) {
            textWrapper.current.innerHTML = forward ? textWrapper.current.innerHTML + currentText.charAt(charCounter) : textWrapper.current.innerHTML.replace(/(\s+)?.$/, '');
            charCounter = forward ? charCounter + 1 : charCounter - 1;
            timeOut = setTimeout(createAnimation, speed);
        } else if (charCounter === currentText.length) {
            forward = false;
            charCounter -= 1;
            timeOut = setTimeout(createAnimation, speed * 4);
        } else if (charCounter === -1) {
            currentIndex = currentIndex + 1 === suggestions.length ? 0 : currentIndex + 1;
            currentText = suggestions[currentIndex];
            charCounter = 0;
            forward = true;
            timeOut = setTimeout(createAnimation, speed);
        }
    };

    useEffect(() => {
        createAnimation();
        return function cleanup() {
            clearTimeout(timeOut);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Thomas Ledoux' Portfolio</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap" rel="stylesheet"></link>
            </Head>
            <Navigation></Navigation>
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Thomas is <span className="skills-wrapper" ref={textWrapper}></span></h1>
                </div>
                <div className="hero-illustration">
                    <img src="/hero-illu.svg" />
                </div>
            </section>
            <section id="personal" className="container">
                <div>

                </div>
            </section>
        </div>
    )
};

export default Index;