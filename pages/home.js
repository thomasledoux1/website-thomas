import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Swiper from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import smoothscroll from 'smoothscroll-polyfill';

const Home = () => {
    const textWrapper = useRef(null);
    const swiperRef = useRef(null);
    const personalRef = useRef(null);
    const formSubmitBtnRef = useRef(null);
    const [formStatus, setFormStatus] = useState('');
    const [formResult, setFormResult] = useState('');
    const suggestions = ['developer', 'badminton player', 'squasher', 'travel lover'];
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
        smoothscroll.polyfill();
        createAnimation();
        new Swiper(swiperRef.current, {
            centeredSlides: true,
            slidesPerView: 1,
            centeredSlides: true,
            loop: true,
            preload: false,
            spaceBetween: 2,
            lazy: {
                loadPrevNext: true,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            themeColor: '#6c63ff',
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

        return function cleanup() {
            clearTimeout(timeOut);
        }
    }, []);

    const scrollTo = () => {
        window.scrollTo({top: personalRef.current.offsetTop - 59, left: 0, behavior: 'smooth'});
    }

    const submitForm = (ev) => {
        setFormStatus('loading');
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            setFormStatus('');
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                setFormResult('ok');
            } else {
                setFormResult('error');
            }
        };
        xhr.send(data);
    }

    return (
        <div>
            <Head>
                <title>Thomas Ledoux' Portfolio - Home</title>
            </Head>
            <section className="container hero">
                <div className="hero-content">
                    <h1>Thomas is a <span className="skills-wrapper" ref={textWrapper}></span></h1>
                </div>
                <div className="hero-image">
                    <img className="personal-picture__img lazy" alt="profile picture" src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/e_blur:1000,q_1,f_auto/me_qvrwky.jpg" data-src="https://res.cloudinary.com/dzrea5zhv/image/upload/v1583171588/me_qvrwky.jpg" />
                </div>
                <span onClick={scrollTo} className="hero-scroll">
                    <FontAwesomeIcon icon={faAngleDown} className="hero-scroll__icon" />
                </span>
            </section>
            <section id="personal" className="container" ref={personalRef}>
                <div className="personal-illustration">
                    <svg width="893px" height="690px" viewBox="0 0 893 690" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(0.000000, 1.000000)">
                                <circle fill="#FFB8B8" fillRule="nonzero" cx="435.92153" cy="137.40512" r="73.53607"></circle>
                                <path d="M381.03589,174.17316 C381.03589,174.17316 394.89049,278.61575 373.57573,290.3388 C352.26097,302.06185 500.39883,303.12768 500.39883,303.12768 C500.39883,303.12768 467.36089,212.53979 482.28121,184.8305 L381.03589,174.17316 Z" fill="#FFB8B8" fillRule="nonzero"></path>
                                <path d="M608.57025,303.65601 L596.25025,359.75601 L570.20025,478.44601 L569.42025,484.94601 L560.43025,560.19601 L554.45025,610.18601 L550.44025,643.76601 C526.06025,656.29601 508.39025,664.94601 508.39025,664.94601 C508.39025,664.94601 506.87025,657.32601 504.42025,647.57601 C487.31025,652.70601 455.65025,661.21601 428.82025,662.91601 C438.59025,673.80601 443.08025,684.03601 436.99025,691.58601 C418.61025,714.34601 342.73025,666.66601 316.19025,648.88601 C315.572373,653.143074 315.338098,657.447031 315.49025,661.74601 L295.18025,646.12601 L297.19025,610.18601 L300.58025,549.37601 L304.84025,473.11601 C303.496982,469.850643 302.371191,466.499995 301.47025,463.08601 C295.25025,440.96601 287.70025,396.79601 281.91025,359.75601 C277.25025,329.94601 273.75025,304.75601 273.01025,299.39601 C272.91025,298.69601 272.86025,298.33601 272.86025,298.33601 L385.29025,248.65601 C393.28025,267.18601 430.5903,272.75601 430.5903,272.75601 C461.5003,270.62601 485.7303,254.32601 485.7303,254.32601 L608.57025,303.65601 Z" fill="#D0CDE1" fillRule="nonzero"></path>
                                <path d="M516.92023,643.63605 C516.92023,643.63605 512.16023,645.26605 504.42023,647.57605 C487.31023,652.70605 455.65023,661.21605 428.82023,662.91605 C405.72023,664.39605 386.20023,660.83605 382.63023,645.76605 C381.10023,639.28605 383.27023,633.95605 388.00023,629.57605 C402.12023,616.48605 439.00023,611.79605 468.25023,610.18605 C476.51023,609.73605 484.15023,609.52605 490.51023,609.44605 C501.31023,609.30605 508.39023,609.52605 508.39023,609.52605 L508.56023,610.18605 L516.92023,643.63605 Z" fill="#A0616A" fillRule="nonzero"></path>
                                <path d="M374.74634,67.84678 L360.99689,62.34229 C360.99689,62.34229 389.74567,30.6915 429.74431,33.44386 L418.49445,21.05865 C418.49445,21.05865 445.99334,10.04979 470.99231,38.94821 C484.1338,54.13944 499.33862,71.99603 508.81722,92.11121 L523.54194,92.11121 L517.3964,105.643 L538.90582,119.1748 L516.82851,116.74421 C518.144058,124.154374 518.345984,131.719418 517.42761,139.18921 C516.480522,146.661276 512.667469,153.473111 506.79319,158.18709 L506.79319,158.18709 C506.79319,158.18709 489.74136,122.89147 489.74136,117.38696 L489.74136,131.14819 C489.74136,131.14819 475.99192,118.76314 475.99192,110.50647 L468.49229,120.13929 L464.74248,105.00188 L418.49448,120.13929 L425.9941,107.75429 L397.24532,111.88262 L408.49518,96.74521 C408.49518,96.74521 375.99659,114.63477 374.74637,129.77221 C373.49658,144.90941 363.9841,159.25289 363.9841,159.25289 C363.9841,159.25289 338.49785,88.48849 374.74634,67.84678 Z" fill="#4D3324" fillRule="nonzero"></path>
                                <path d="M688.50024,561.56604 C681.01024,569.68604 662.45024,581.91604 639.95024,595.15604 C631.58024,600.07604 622.67024,605.14604 613.58024,610.18604 C591.89024,622.21604 569.18024,634.13604 550.44024,643.76604 C526.06024,656.29604 508.39024,664.94604 508.39024,664.94604 C508.39024,664.94604 506.87024,657.32604 504.42024,647.57604 C501.14024,634.52604 496.20024,617.65604 491.05024,610.18604 C490.87024,609.92604 490.69024,609.68604 490.51024,609.44604 C489.01024,607.47604 487.50024,606.32604 486.01024,606.32604 L560.43024,560.19604 L592.59024,540.25604 L569.42024,484.94604 L540.36024,415.56604 L557.90024,359.75604 L575.53024,303.65604 L608.57024,303.65604 C608.57024,303.65604 619.51024,327.53604 633.50024,360.83609 C635.59024,365.81609 637.75024,371.00609 639.95024,376.36609 C668.73023,446.36603 704.61023,544.11603 688.50024,561.56604 Z" fill="#D0CDE1" fillRule="nonzero"></path>
                                <path d="M436.99023,691.58606 C418.61023,714.34606 342.73023,666.66606 316.19023,648.88606 C310.41023,645.01606 306.97023,642.56606 306.97023,642.56606 L331.25023,610.18606 L338.94023,599.93606 C338.94023,599.93606 345.82023,603.58606 355.99023,609.52606 C356.36023,609.74606 356.73023,609.96606 357.11023,610.18606 C365.88023,615.33606 376.89023,622.06606 388.00023,629.57606 C403.33023,639.94606 418.83023,651.77606 428.82023,662.91606 C438.59027,673.80603 443.08026,684.03601 436.99023,691.58606 Z" fill="#A0616A" fillRule="nonzero"></path>
                                <path d="M355.99023,609.52606 C353.276386,609.515632 350.566587,609.73643 347.89023,610.18606 C324.90023,614.13606 318.12023,634.94606 316.19023,648.88606 C315.572353,653.143124 315.338078,657.447081 315.49023,661.74606 L295.18023,646.12606 L287.78023,640.43606 C269.97023,634.22606 254.10023,623.19606 240.34023,610.18606 C228.403158,598.700012 217.695347,586.001453 208.39023,572.29606 C199.122017,558.787798 190.859736,544.616248 183.67023,529.89606 C179.609078,521.580016 179.451542,511.88972 183.24023,503.44606 L208.39023,447.39606 L245.15023,365.47606 C245.42019,363.526113 245.71684,361.619447 246.04018,359.75606 C253.33018,317.95606 272.86018,299.39606 272.86018,299.39606 L287.78018,299.39606 L297.76018,359.75606 L310.16018,434.74606 L301.47018,463.08606 L281.39018,528.53601 L300.58018,549.37601 L355.99023,609.52606 Z" fill="#D0CDE1" fillRule="nonzero"></path>
                                <path d="M372.87659,434.80588 L385.63148,449.68669 C390.37027,448.78318 395.3189,447.72142 400.41582,446.52903 L396.75238,434.80588 L405.70988,445.25632 C459.70728,431.97553 526.63665,406.15494 526.63665,406.15494 C526.63665,406.15494 454.3795,411.45315 400.42839,399.66633 C376.55764,394.45124 351.99766,406.28444 342.20208,428.66873 C336.5085,441.67936 337.40268,452.95148 357.59608,452.95148 C364.419302,452.834973 371.223519,452.194967 377.94879,451.0371 L372.87659,434.80588 Z" fill="#6C63FF" fillRule="nonzero"></path>
                                <path d="M663.650298,679.38605 L663.650298,685.45605 C663.650298,687.121964 663.345026,688.773777 662.74027,690.32605 C662.471693,691.017912 662.14729,691.686783 661.77027,692.32605 C659.345725,696.395735 654.957437,698.888131 650.22027,698.886051 L203.67027,698.886051 C198.933099,698.888147 194.544803,696.395747 192.12027,692.32605 C191.74323,691.686794 191.418826,691.017921 191.15027,690.32605 C190.545514,688.773777 190.240242,687.121964 190.240242,685.45605 L190.240242,679.38605 C190.240242,675.823901 191.653954,672.407374 194.172774,669.888554 C196.691594,667.369734 200.108121,665.955097 203.67027,665.95605 L229.41027,665.95605 L229.41027,663.12605 C229.410025,662.977454 229.468947,662.834873 229.57402,662.7298 C229.679093,662.624727 229.821674,662.566049 229.97027,662.566049 L243.40027,662.566049 C243.548866,662.566049 243.691447,662.624727 243.79652,662.7298 C243.901593,662.834873 243.960515,662.977454 243.96027,663.12605 L243.96027,665.95605 L252.35022,665.95605 L252.35022,663.12605 C252.349975,662.977454 252.408897,662.834873 252.51397,662.7298 C252.619043,662.624727 252.761624,662.566049 252.91022,662.566049 L266.34022,662.566049 C266.488816,662.566049 266.631397,662.624727 266.73647,662.7298 C266.841543,662.834873 266.900465,662.977454 266.90022,663.12605 L266.90022,665.95605 L275.30022,665.95605 L275.30022,663.12605 C275.299975,662.977454 275.358897,662.834873 275.46397,662.7298 C275.569043,662.624727 275.711624,662.566049 275.86022,662.566049 L289.29022,662.566049 C289.438816,662.566049 289.581397,662.624727 289.68647,662.7298 C289.791543,662.834873 289.850465,662.977454 289.85022,663.12605 L289.85022,665.95605 L298.24022,665.95605 L298.24022,663.12605 C298.239975,662.977454 298.298897,662.834873 298.40397,662.7298 C298.509043,662.624727 298.651624,662.566049 298.80022,662.566049 L312.23022,662.566049 C312.378816,662.566049 312.521397,662.624727 312.62647,662.7298 C312.731543,662.834873 312.790465,662.977454 312.79022,663.12605 L312.79022,665.95605 L321.18022,665.95605 L321.18022,663.12605 C321.179975,662.977454 321.238897,662.834873 321.34397,662.7298 C321.449043,662.624727 321.591624,662.566049 321.74022,662.566049 L335.17022,662.566049 C335.318816,662.566049 335.461397,662.624727 335.56647,662.7298 C335.671543,662.834873 335.730465,662.977454 335.73022,663.12605 L335.73022,665.95605 L344.13022,665.95605 L344.13022,663.12605 C344.129975,662.977454 344.188897,662.834873 344.29397,662.7298 C344.399043,662.624727 344.541624,662.566049 344.69022,662.566049 L358.12022,662.566049 C358.268816,662.566049 358.411397,662.624727 358.51647,662.7298 C358.621543,662.834873 358.680465,662.977454 358.68022,663.12605 L358.68022,665.95605 L367.07022,665.95605 L367.07022,663.12605 C367.069975,662.977454 367.128897,662.834873 367.23397,662.7298 C367.339043,662.624727 367.481624,662.566049 367.63022,662.566049 L472.83022,662.566049 C472.978816,662.566049 473.121397,662.624727 473.22647,662.7298 C473.331543,662.834873 473.390465,662.977454 473.39022,663.12605 L473.39022,665.95605 L481.79022,665.95605 L481.79022,663.12605 C481.789975,662.977454 481.848897,662.834873 481.95397,662.7298 C482.059043,662.624727 482.201624,662.566049 482.35022,662.566049 L495.78027,662.566049 C496.088293,662.569064 496.337256,662.818027 496.34027,663.12605 L496.34027,665.95605 L504.73027,665.95605 L504.73027,663.12605 C504.730025,662.977454 504.788947,662.834873 504.89402,662.7298 C504.999093,662.624727 505.141674,662.566049 505.29027,662.566049 L518.72027,662.566049 C518.868874,662.566049 519.011466,662.624711 519.116549,662.729785 C519.221633,662.83486 519.280562,662.977446 519.28032,663.12605 L519.28032,665.95605 L527.67032,665.95605 L527.67032,663.12605 C527.670075,662.977454 527.728997,662.834873 527.83407,662.7298 C527.939143,662.624727 528.081724,662.566049 528.23032,662.566049 L541.66032,662.566049 C541.808916,662.566049 541.951497,662.624727 542.05657,662.7298 C542.161643,662.834873 542.220565,662.977454 542.22032,663.12605 L542.22032,665.95605 L550.62032,665.95605 L550.62032,663.12605 C550.620075,662.977454 550.678997,662.834873 550.78407,662.7298 C550.889143,662.624727 551.031724,662.566049 551.18032,662.566049 L564.61032,662.566049 C564.916378,662.569892 565.161993,662.819973 565.16032,663.12605 L565.16032,665.95605 L573.56032,665.95605 L573.56032,663.12605 C573.560075,662.977454 573.618997,662.834873 573.72407,662.7298 C573.829143,662.624727 573.971724,662.566049 574.12032,662.566049 L587.55032,662.566049 C587.698916,662.566049 587.841497,662.624727 587.94657,662.7298 C588.051643,662.834873 588.110565,662.977454 588.11032,663.12605 L588.11032,665.95605 L596.50032,665.95605 L596.50032,663.12605 C596.500075,662.977454 596.558997,662.834873 596.66407,662.7298 C596.769143,662.624727 596.911724,662.566049 597.06032,662.566049 L610.49032,662.566049 C610.638916,662.566049 610.781497,662.624727 610.88657,662.7298 C610.991643,662.834873 611.050565,662.977454 611.05032,663.12605 L611.05032,665.95605 L650.22032,665.95605 C653.78246,665.955113 657.198972,667.369757 659.717781,669.888575 C662.236589,672.407393 663.650298,675.82391 663.650298,679.38605 L663.650298,679.38605 Z" fill="#3F3D56" fillRule="nonzero"></path>
                                <rect fill="#3F3D56" fillRule="nonzero" x="60.50024" y="690.32605" width="732.99951" height="2"></rect>
                                <path d="M627.6945,423.75658 L461.25159,423.75658 L461.25159,420.32605 L385.77993,420.32605 L385.77993,423.75658 L218.65093,423.75658 C212.432971,423.75658 207.39232,428.797231 207.39232,435.01519 L207.39232,662.92669 C207.39232,669.144657 212.432963,674.18534 218.65093,674.18534 L627.6945,674.18534 C633.912467,674.18534 638.95311,669.144657 638.95311,662.92669 L638.95311,435.01519 C638.95311,432.02922 637.766942,429.165547 635.655542,427.054148 C633.544143,424.942748 630.68047,423.756577 627.6945,423.75658 L627.6945,423.75658 Z" fill="#3F3D56" fillRule="nonzero"></path>
                                <circle stroke="#D0CDE1" strokeWidth="2" cx="423.50024" cy="503.32605" r="25"></circle>
                                <circle fill="#D0CDE1" fillRule="nonzero" cx="415.50024" cy="512.32605" r="25"></circle>
                                <rect fill="#D0CDE1" fillRule="nonzero" x="80.44606" y="680.22258" width="28" height="28"></rect>
                                <path d="M91.45001,658.22299 L91.45001,692.22299 L125.45001,692.22299 L125.45001,658.22299 L91.45001,658.22299 Z M123.97001,690.74299 L92.92001,690.74299 L92.92001,659.70299 L123.97001,659.70299 L123.97001,690.74299 Z" fill="#3F3D56" fillRule="nonzero"></path>
                                <rect fill="#D0CDE1" fillRule="nonzero" x="728.44606" y="680.22258" width="28" height="28"></rect>
                                <path d="M739.45001,658.22299 L739.45001,692.22299 L773.45001,692.22299 L773.45001,658.22299 L739.45001,658.22299 Z M771.97001,690.74299 L740.92001,690.74299 L740.92001,659.70299 L771.97001,659.70299 L771.97001,690.74299 Z" fill="#3F3D56" fillRule="nonzero"></path>
                                <path d="M150.59366,618.75404 C151.52674,650.70404 132.85853,662.41296 109.43046,663.09716 C108.886267,663.113047 108.34452,663.122787 107.80522,663.12638 C106.71876,663.13466 105.642847,663.116567 104.57748,663.0721 C83.38914,662.19249 66.61733,650.94525 65.74957,621.23185 C64.85157,590.48217 103.0185,550.52893 105.88207,547.57358 L105.88718,547.57082 C105.99596,547.4582 106.05166,547.40182 106.05166,547.40182 C106.05166,547.40182 149.66066,586.80667 150.59366,618.75404 Z" fill="#D0CDE1" fillRule="nonzero"></path>
                                <path d="M107.74373,658.2551 L122.62605,636.1236 L107.77417,660.63603 L107.80517,663.12638 C106.71871,663.13466 105.642797,663.116567 104.57743,663.0721 L105.31559,631.06029 L105.29537,630.81329 L105.3226,630.76558 L105.39325,627.74065 L89.09535,604.078 L105.37402,625.47667 L105.43179,626.11605 L105.98931,601.92987 L91.91231,577.39712 L106.02939,597.68106 L105.88204,547.57354 L105.88236,547.40676 L105.88715,547.57076 L106.82161,587.06223 L119.65111,571.02077 L106.86361,590.46433 L107.14361,612.09833 L118.94939,590.98439 L107.187,615.2789 L107.34287,627.30847 L124.51166,597.89701 L107.39507,631.50508 L107.74373,658.2551 Z" fill="#3F3D56" fillRule="nonzero"></path>
                                <path d="M798.59366,618.75404 C799.52674,650.70404 780.85853,662.41296 757.43046,663.09716 C756.886273,663.113047 756.344527,663.122787 755.80522,663.12638 C754.71876,663.13466 753.642847,663.116567 752.57748,663.0721 C731.38914,662.19249 714.61733,650.94525 713.74957,621.23185 C712.85157,590.48217 751.0185,550.52893 753.88207,547.57358 L753.88718,547.57082 C753.99596,547.4582 754.05166,547.40182 754.05166,547.40182 C754.05166,547.40182 797.66066,586.80667 798.59366,618.75404 Z" fill="#D0CDE1" fillRule="nonzero"></path>
                                <path d="M755.74373,658.2551 L770.62605,636.1236 L755.77417,660.63603 L755.80517,663.12638 C754.71871,663.13466 753.642797,663.116567 752.57743,663.0721 L753.31559,631.06029 L753.29537,630.81329 L753.3226,630.76558 L753.39325,627.74065 L737.09535,604.078 L753.37402,625.47667 L753.43179,626.11605 L753.98931,601.92987 L739.91231,577.39712 L754.02939,597.68106 L753.88204,547.57354 L753.88236,547.40676 L753.88715,547.57076 L754.82161,587.06223 L767.65111,571.02077 L754.86361,590.46433 L755.14361,612.09833 L766.94939,590.98439 L755.187,615.2789 L755.34287,627.30847 L772.51166,597.89701 L755.39507,631.50508 L755.74373,658.2551 Z" fill="#3F3D56" fillRule="nonzero"></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="personal-content">
                    <h2>Personal Information</h2>
                    <p>Hi, I'm Thomas. I'm 28 years old, living in Ghent. I'm a professional Frontend Developer, currently working at The Reference.</p>
                    <p>I studied Applied Computer Sciences at Hogeschool Gent. I chose for the Mobile Development track, and went on Erasmus to Barcelona to learn more about Swift and Java. At my internship I created an iOS app in Swift for Rialto.</p>
                    <p>After graduating I worked for the startup Happs as a full-stack developer, where I created and maintained the website. I also created an app for a client in React Native during this period.</p>
                    <p>You can read more about my work in the section below.</p>
                </div>
            </section>
            <section id="portfolio" className="container portfolio-content">
                <h2>Some of my work</h2>
                <div className="portfolio-caseWrapper">
                    <div className="col-4">
                        <div className="portfolio-case">
                            <a href="https://www.getrialto.com">
                                <img className="lazy" alt="Logo Rialto" src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/e_blur:1000,q_1,f_auto/logorialto_hrb82m.png" data-src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/logorialto_hrb82m.png" />
                                <p>At my internship for Rialto I created an iOS app from scratch in Swift where real estate companies could easily manage their listings.</p>
                                <div className="portfolio-tagsWrapper">
                                    <ul className="portfolio-tags">
                                        <li>swift</li>
                                        <li>ios</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="portfolio-case">
                            <a href="https://www.karaton.be">
                                <img className="lazy" alt="Logo Karaton" src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/e_blur:1000,q_1,f_auto/logokaraton_l6y9ze.png" data-src="https://res.cloudinary.com/dzrea5zhv/image/upload/v1583171504/logokaraton_l6y9ze.png" />
                                <p>For Happs Development I created and maintained the website for Karaton where speech therapists and parents of dyslexic could follow up on the progress their children/patients are making in the Karaton game.</p>
                                <div className="portfolio-tagsWrapper">
                                    <ul className="portfolio-tags">
                                        <li>angular</li>
                                        <li>mongodb</li>
                                        <li>expressjs</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="portfolio-case">
                            <a href="https://play.google.com/store/apps/details?id=com.carlierkathleen.rekenen&hl=nl">
                                <img className="lazy" alt="Logo Happs" src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/e_blur:1000,q_1,f_auto/logocarlier_azx7hg.jpg" data-src="https://res.cloudinary.com/dzrea5zhv/image/upload/v1583171504/logocarlier_azx7hg.jpg" />
                                <p>While working at Happs Development I also created a mobile application for a speech therapist to help children with discalculia to learn how to count and do simple math exercises in a fun game form.</p>
                                <div className="portfolio-tagsWrapper">
                                    <ul className="portfolio-tags">
                                        <li>react-native</li>
                                        <li>reactjs</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="portfolio-case">
                            <a href="https://www.carglass.be">
                                <img className="lazy" alt="Logo Happs" src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/e_blur:1000,q_1,f_auto/logocarglass_dmieax.png" data-src="https://res.cloudinary.com/dzrea5zhv/image/upload/v1583171504/logocarglass_dmieax.png" />
                                <p>At my current job at The Reference I help maintain the website for Carglass. Many new features have been added since I joined the team, and we managed to optimize the booking flows a lot.</p>
                                <div className="portfolio-tagsWrapper">
                                    <ul className="portfolio-tags">
                                        <li>reactjs</li>
                                        <li>sitecore</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="portfolio-case">
                            <a href="https://www.nationale-loterij.be">
                                <img className="lazy" alt="Logo Nationale Loterij" src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/e_blur:1000,q_1,f_auto/logonalo_xgy3wb.jpg" data-src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/logonalo_xgy3wb.jpg" />
                                <p>One of the other clients I work for at The Reference is Nationale Loterij. For this client we constantly create new features on a monthly basis, with a modern look.</p>
                                <div className="portfolio-tagsWrapper">
                                    <ul className="portfolio-tags">
                                        <li>reactjs</li>
                                        <li>sitecore</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="portfolio-case">
                            <a href="https://www.achterderegenboog.be">
                                <img className="lazy" alt="Logo Achter De Regenboog" src="https://res.cloudinary.com/dzrea5zhv/image/upload/w_320/e_blur:1000,q_1,f_auto/achterderegenboog_fdwjmw.png" data-src="https://res.cloudinary.com/dzrea5zhv/image/upload/v1583870456/achterderegenboog_fdwjmw.png" />
                                <p>In my free time I like to experiment with other frameworks and technologies too. I made a website using Wordpress for a friend of mine who started a psychologists practice.</p>
                                <div className="portfolio-tagsWrapper">
                                    <ul className="portfolio-tags">
                                        <li>wordpress</li>
                                        <li>javascript</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="container">
                <div className="contact-illustration">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 561.8 654.5" xmlSpace="preserve">
                        <rect x="96.1" y="393.8" fill="#6C63FF" width="254.5" height="221" />
                        <path fill="#FFB8B8" d="M260.5,160c0,0,2.8,10.8-3.4,18.4c-6.2,7.6,26.6,34.8,26.6,34.8l17.3-3c0,0-3.8-33.1,1.3-41.4
                            S260.5,160,260.5,160z"/>
                        <path opacity="0.1" d="M260.5,160c0,0,2.8,10.8-3.4,18.4c-6.2,7.6,26.6,34.8,26.6,34.8l17.3-3
                            c0,0-3.8-33.1,1.3-41.4S260.5,160,260.5,160z"/>
                        <polygon fill="#FFB8B8" points="375.4,474.6 337.3,525.2 363.3,540.3 399.1,481.7 " />
                        <path fill="#2F2E41" d="M348.7,526c0,0-14-16.3-13.4-12.7c0.6,3.6-10,34.5-0.1,37.5s94.6,10.9,95.8,1.3s-25.3-16.3-25.3-16.3
                            s-15.7-15.1-19.2-13.6S348.7,526,348.7,526z"/>
                        <polygon fill="#FFB8B8" points="366.9,522.9 397.3,574.8 420.3,561.5 389.6,519 " />
                        <path fill="#2F2E41" d="M415,399.4l-9,12.8c0,0-43.1,59.9-38.5,64.7s23.6,23.1,33.3,19.6s44.1-64.7,44.1-64.7l-9-35.9L415,399.4z" />
                        <path fill="#2F2E41" d="M229.3,387.3c0,0,9.7,18,34.1,24.1s50,18.6,50.9,18.4s3.5-1.5,4.1,2.1s7.3,10,7.3,10s27,91.8,37.3,91.9
                            s31.5-7.3,32-10.2s-31.6-96.7-31.9-98.5l-3.8-21.8c0,0,42.4,6.8,46.3,8s39.1,20.4,39.1,20.4s35.8-25.8,2.3-51.9
                            s-91.1-45.2-91.1-45.2l-20.7-5.8l-18-1.1l-2.7-10.2l-42.7,2.5l-44.5,18.9L229.3,387.3z"/>
                        <circle fill="#FFB8B8" cx="285.6" cy="148.1" r="33.2" />
                        <path fill="#D0CDE1" d="M255.5,179.8l4-0.7c0,0,7.2,27.8,29.6,32.4c0,0,11-13.2,10.5-15.4s8.7-14.1,13.6-7.5s-1.2,123.8,2.9,125.9
                            s12.9,4.3,5.8,12.1s-35.3,18.2-41.5,14.6s-19-34.2-24.5-44.5c-5.5-10.3-14.3-45.3-14.3-45.3s-11.3-38.3-4.3-47
                            S255.5,179.8,255.5,179.8z"/>
                        <path fill="#2F2E41" d="M287.3,319.1c-0.7,8.2-2,16.3-3.8,24.3c-1.6,6.5-3.5,10.4-5.7,10.3c-5.5-0.4-8,7.7-9.3,17
                            c-1.4,9.9-1.4,21.2-2.1,25.2c-1,5.3-7.4,9.3-20.3,8.1c-7.7-0.9-15.2-2.7-22.3-5.5c-17.3-6.3-16.8-57.5-13.9-95.4
                            c1.8-23.3,4.4-41.6,4.4-41.6s-5.3-15.7-7-26.5c-0.3-2-0.5-4-0.5-5.9c0.3-9.4,17.4-34.8,27.8-50.7c10.4-15.8,24.6-4.2,24.6-4.2
                            l-4.9,14.9c0,0,7.6,11.8,7.7,23s18.3,19.3,24.9,24.8C290.9,240.3,290.8,285.9,287.3,319.1z"/>
                        <path fill="#2F2E41" d="M301.8,179.5c0,0,1.2,1.4,6.7,0.7c6.6-0.8,15.6,1.4,17.7,7.7c3.9,11.5,14.7,58.4,14.7,58.4
                            s4.5,53.5,6.6,65.4s1,22.3,3,28.5s-19.8-11.6-27.8-9.3s-13.2-27.7-12.2-38.2s1.9-21.9-0.9-32.6c-2.8-10.8,2.2-39.2,2-45.8
                            S293.8,191.4,301.8,179.5z"/>
                        <path fill="#FFB8B8" d="M325.3,346c0,0,35.2,19.2,38.6,46.5S316.8,366,316.8,366L325.3,346z" />
                        <path fill="#FFB8B8" d="M345.4,326.6c0,0,10.8,54.3,27.6,51.5s-9.4-54.6-9.4-54.6L345.4,326.6z" />
                        <path fill="#2F2E41" d="M402.9,563.5c0,0-8.6,9.9-10.7,8.4s-7,19-2.6,22.9s21.5,10.4,21.6,16.9s45.9,5.2,47.5-1.6
                            s-5.7-22.4-10.9-25.3s-24.3-29.2-24.3-29.2S408.5,557.9,402.9,563.5z"/>
                        <path opacity="0.1" d="M319.7,379.2c-8.2-5.8-30.9-7.2-51.2-8.5c-8.9-0.6-17.3-1.1-23.7-2
                            c-6.2-0.9-11.8-6.5-16.7-15c-7.5-12.8-13.6-32-18.3-50.5c1.8-23.3,4.4-41.6,4.4-41.6s-5.3-15.7-7-26.5c1.2-1.7,2.7-3,4.5-4
                            c21.5-9.2,41.9,81.4,44.5,95.6c0,0.2,0.1,0.5,0.1,0.6c1.3,7.3,14.9,13.6,27.1,16.1c7.5,1.5,14.5,1.6,17.7-0.4
                            c8.5-5.2,34.5,15.6,36.5,16.2C339.8,359.8,331.4,387.5,319.7,379.2z"/>
                        <path fill="#2F2E41" d="M211.8,225.5c0,0-15.6,7.4-8.7,41.8s20.7,92.9,41.8,95.9s63.1,2.3,74.9,10.5s20.1-19.4,18.1-20
                            s-28-21.4-36.5-16.2s-42.8-3.9-44.8-15.7C254.4,309.9,233.6,216.1,211.8,225.5z"/>
                        <path fill="#2F2E41" d="M324.2,209l17.1,39.8c0,0,1.7-0.9,3.7,5.4c2,6.2,2.9,11.7,6.5,15.8s19.1,62.3,19.6,65s-21.6,12.1-26.5,4.6
                            S324.2,209,324.2,209z"/>
                        <path fill="#4D3324" d="M266.7,147.7c1.3-0.3,1.5-2,1.5-3.3c0.2-7.1,4.5-14.3,11.2-16.3c2.6-0.7,5.3-0.9,8-0.4
                            c3.8,0.5,7.4,1.7,10.8,3.6c1.8,1,3.5,2.2,5.5,2.5c1.3,0.2,7,1.9,8.3,2.1c2.9,0.5,5.6,3.1,8.3,2.1c2.6-0.9,3.2-4.3,3.3-7.2
                            c0.1-6.4-4.7-15.2-9-20c-3.2-3.6-8.1-5.3-12.9-6.1c-5.6-0.9-11.2-1.2-16.9-1c-7.6,0.1-15.5,0.7-22.4,4c-6.9,3.3-12.7,9.9-13,17.5
                            c-0.1,1.6,0.1,3.2,0,4.8c-0.3,3.9-2.4,7.4-3.3,11.1c-1.4,5.6-0.4,11.5,2.8,16.3c2.6,3.8,6.6,7.2,6.4,11.7l5.5-5.7
                            c1.7-1.3,2.3-3.6,1.4-5.6l-2-7.6c-0.5-1.4-0.6-2.9-0.2-4.3C262.3,140.5,264.6,148.2,266.7,147.7z"/>
                    </svg>
                </div>
                <div className="contact-form">
                    <h2>Drop me a message</h2>
                    <form onSubmit={(e) => submitForm(e)} action="https://formspree.io/xzbgjqdq" method="POST">
                        <div className="floating">
                            <input id="email" className="floating__input" type="email" name="email" placeholder="E-mail" required />
                            <label className="floating__label" data-content="E-mail" htmlFor="email">
                                <span className="hidden--visually">E-mail</span>
                            </label>
                        </div>
                        <div className="floating">
                            <textarea rows="3" id="message" className="floating__input" type="text" name="message" placeholder="Message" required />
                            <label className="floating__label" data-content="Message" htmlFor="message">
                                <span className="hidden--visually">Message</span>
                            </label>
                        </div>

                        <button ref={formSubmitBtnRef} className={`button ${formStatus}`} type="submit">Submit</button>
                        {formResult === "error" && <p className="error">Ooops! There was an error. Try again later.</p>}
                        {formResult === "ok" && <p className="success">I received your message. I'll get back to you ASAP.</p>}
                    </form>
                </div>
                <div className="contact-content">
                    <h2>You can also find me here</h2>
                    <ul>
                        <li>
                            <a aria-label="linkedin" className="icon-wrapper" href="https://www.linkedin.com/in/thomasledoux91">
                                <FontAwesomeIcon icon={faLinkedin} className="icon--social icon--linkedin" />
                            </a>
                        </li>
                        <li>
                            <a aria-label="github" className="icon-wrapper" href="https://github.com/thomasledoux1">
                                <FontAwesomeIcon icon={faGithub} className="icon--social icon--github" />
                            </a>
                        </li>
                        <li>
                            <a aria-label="facebook" className="icon-wrapper" href="https://www.facebook.com/thomasledoux91/">
                                <FontAwesomeIcon icon={faFacebook} className="icon--social icon--facebook" />
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
};

export default Home;