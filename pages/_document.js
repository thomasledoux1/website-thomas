import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-125864873-1" >
                    </script>
                    <script dangerouslySetInnerHTML={
                        {
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){window.dataLayer.push(arguments)}
                            gtag("js", new Date());
                            gtag("config", "UA-125864873-1");
                        `}
                    }>
                    </script>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        WebFontConfig = {
                            google: { families: [ 'Nunito:400, 600, 700&display=swap' ] }
                        };
                        (function() {
                            var wf = document.createElement('script');
                            wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                            wf.async = 'true';
                            var s = document.getElementsByTagName('script')[0];
                            s.parentNode.insertBefore(wf, s);
                        })(); 
                    `}} />
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://ajax.googleapis.com' />
                    <link rel='preconnect' href='https://www.google-analytics.com' />
                    <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css"></link>
                    <link rel="shortcut icon" type="image/x-icon" href="/myAvatar.ico" />
                    <meta name="Description" content="This is the portfolio website of Thomas Ledoux"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;