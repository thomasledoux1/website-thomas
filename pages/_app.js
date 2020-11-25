import '../styles/index.css';
import 'aos/dist/aos.css';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        window.addEventListener('resize', () => {
            document.querySelector(':root').style
                .setProperty('--vh', window.innerHeight / 100 + 'px');
        })
    }, []);
    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    )
}