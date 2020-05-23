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
          <link rel="shortcut icon" type="image/x-icon" href="/myAvatar.ico" />
          <meta name="description" content="You can find projects Thomas Ledoux worked on and contact details on this site."></meta>
          <meta property="og:description" content="You can find projects Thomas Ledoux worked on and contact details on this site." />
          <meta property="og:title" content="This is the portfolio website of Thomas Ledoux" />
          <meta property="og:image" content="https://res.cloudinary.com/dzrea5zhv/image/upload/w_300/v1583171588/me_qvrwky.jpg" />
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