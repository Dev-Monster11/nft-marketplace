import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import getConfig from 'next/config';


let nextConfig = getConfig();
const publicRuntimeConfig = nextConfig.publicRuntimeConfig;

const GOOGLE_ANALYTICS_ID =
  publicRuntimeConfig.publicGoogleAnalyticsId;

export default class MetaplexDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="loadforge-site-verification"
            content="2056680d2883a8b910880d53b9cb2ebf16e7b8f91e169cceddce62c4c4ef8fe6240748c08c2e3769e554e12dafcd5bfc62028638e6524a0efd7d729efd762d42"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
            integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
            crossOrigin="anonymous"
          />
          {GOOGLE_ANALYTICS_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
              />
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // gtag('config', '${GOOGLE_ANALYTICS_ID}'); initial config happens in router
          `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  var s = document.createElement("script");
                  s.src = "https://stackpile.io/stack_162299.js"; s.async = true;
                  var e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(s, e);
                })();
          `,
            }}
          />
        </body>
      </Html>
    );
  }
}

class CheckoutDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/*Below we add the modal wrapper*/}
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}