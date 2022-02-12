import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/index.less';
import '../styles/utility.css';
//import '../styles/stripe.css';
import { ThemeContext, Theme } from '../contexts/themecontext';
import { useState } from 'react';
import { CountdownView } from '../views/countdown';
import { MetaplexOverlay } from '@oyster/common';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(Theme.Light);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Component {...pageProps} />
        {/* <CountdownView /> */}
        {/* <MetaplexOverlay centered visible>
          <div className="comming_soon_modal">
            <div className="comming_soon_text">
              <h1 className="comming_soon_title">Starting soon...</h1>
              <h4>We are doing final touch ups, you will be entering soon.</h4>
              <h4>
                Your 1 hour registration will hold valid, you can come in even
                after, as soon as we start.
              </h4>
              <h4>
                If you have work or errands to take care in the meantime, please
                do, we will email you as soon as the event starts.
              </h4>
              <h4>
                Thank you sooo much again for being so patient with a
                bootstrapped minority founded team.
              </h4>
            </div>
          </div>
        </MetaplexOverlay> */}
      </ThemeContext.Provider>
    </>
  );
}
