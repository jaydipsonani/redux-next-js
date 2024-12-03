import { DEFAULT_LANGUAGE } from '@/utils/constants';
import Document, { Html, Head, Main, NextScript } from 'next/document';
const thumbnail = `/assets/images/home/thumbnail.png?v=1`;
const faviconIcon = '/assets/images/olySim_Logo.png';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || DEFAULT_LANGUAGE };
  }

  render() {
    const lang = this.props.locale;

    return (
      <Html lang={lang}>
        <Head>
          <link href={faviconIcon} rel="icon" type="image/ico" sizes="16x16" />
          <meta property="og:title" content="Golink Help Support" />
          <meta
            property="og:description"
            content="Description of your website."
          />

          <meta property="og:url" content="https://Golink Help Support.com/" />

          <meta property="og:image" content={thumbnail} />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Golink Help Support" />
          <meta
            name="twitter:description"
            content="Description of your website."
          />
          <meta name="twitter:image" content={thumbnail} />

          <meta name="theme-color" content="#F8F3ED" />
          
        </Head>
        <body className="qdf-dokkan">
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
