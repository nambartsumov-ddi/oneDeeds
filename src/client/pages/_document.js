import Document, { Head, Main, NextScript } from 'next/document';

// import favicon
import favicon from '../../../static/favicon-16x16.png';

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // Global styles goes here
    const globalCss = require('!raw-loader!../../../static/styles/global.css');

    return (
      <html lang="en">
        <Head>
          <link rel="shortcut icon" href={favicon} />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
          <style dangerouslySetInnerHTML={{ __html: globalCss }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
