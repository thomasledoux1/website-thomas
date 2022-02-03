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
          <meta property="og:image" content="/me.jpeg" />
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
