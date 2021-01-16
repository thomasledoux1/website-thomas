import Document, {Html, Head, Main, NextScript} from 'next/document'
import * as React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-125864873-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments)}
                gtag("js", new Date());
                gtag("config", "UA-125864873-1");
              `,
            }}
          ></script>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
            media="print"
            onLoad="this.media='all'"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
            />
          </noscript>
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="shortcut icon" type="image/x-icon" href="/myAvatar.ico" />
          <meta
            name="description"
            content="You can find projects Thomas Ledoux worked on and contact details on this site."
          ></meta>
          <meta
            property="og:description"
            content="You can find projects Thomas Ledoux worked on and contact details on this site."
          />
          <meta
            property="og:title"
            content="Thomas Ledoux, Frontend Developer from Ghent"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dzrea5zhv/image/upload/w_300/v1583171588/me_qvrwky.jpg"
          />
          <meta
            name="keywords"
            content="HTML, CSS, JavaScript, Frontend, Ghent, Thomas, Ledoux"
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
