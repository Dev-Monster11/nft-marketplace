import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { Storefront } from '@oyster/common';
import { getStorefront } from './../actions/getStorefront';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { applyTheme } from '../actions/applyTheme';

const CreateReactAppEntryPoint = dynamic(() => import('../App'), {
  ssr: false,
});

interface AppProps {
  storefront: Storefront;
}

if (process.env.NEXT_PUBLIC_BUGSNAG_API_KEY) {
  Bugsnag.start({
    apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY || '',
    plugins: [new BugsnagPluginReact()],
  });
}

export async function getServerSideProps(context: NextPageContext) {
  const headers = context?.req?.headers || {};
  const forwarded = headers.forwarded
    ?.split(';')
    .reduce((acc: Record<string, string>, entry) => {
      const [key, value] = entry.split('=');
      acc[key] = value;

      return acc;
    }, {});
  const host = (forwarded?.host || headers.host) ?? '';
  let subdomain = host.split(':')[0].split('.')[0];

  if (process.env.SUBDOMAIN && !process.env.STRICT_SUBDOMAIN) {
    subdomain = process.env.SUBDOMAIN;
  }
  // console.log('subdomain', await getStorefront('somniumspace'));
  const storefront = {
    subdomain: 'akkoros',
    pubkey: '98jiC2PfMNqLwUrabW3LxE15dfHCyaNX5V6nxHaP96NQ',
    theme: {
      logo:
        'https://ipfs.io/ipfs/QmWQdbBQWujc2qsB59oqt3snQhKeNzGTPBvbcG7cX3egrD?filename=replicate-prediction-7alwxcfzjnaghmy2yjlknacsvy.png',
      banner:
        '',
      stylesheet:
        'https://arweave.cache.holaplex.dev/GfF6WrFBhEXbBZDecdbmUPYhuke7nz5UHR_7p4Y-bVQ',
      color: {
        background: '#121111',
        primary: '#e4d000',
      },
      font: {
        title: 'Montserrat',
        text: 'Montserrat',
      },
    },
    meta: {
      favicon:
        'https://ipfs.io/ipfs/QmWQdbBQWujc2qsB59oqt3snQhKeNzGTPBvbcG7cX3egrD?filename=replicate-prediction-7alwxcfzjnaghmy2yjlknacsvy.png',
      title: 'AKKOROS',
      description: 'An Open-Source NFT Market and Community Built on Solana and Powered by Metaplex.',
    },
  };

  if (storefront) {
    return {props: {storefront}};
  }

  return {
    notFound: true,
  };
}

function AppWrapper({ storefront }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasLogo, setHasLogo] = useState(false);
  const [hasStylesheet, setHasStylesheet] = useState(false);

  useEffect(() => {
    if (hasLogo && hasStylesheet) {
      setIsMounted(true);
    }
  }, [hasLogo, hasStylesheet]);

  useEffect(() => {
    const doc = document.documentElement;

    const cleanup = applyTheme(storefront.theme, doc.style, document.head);
    setHasStylesheet(true);

    return cleanup;
  }, [storefront.theme]);

  useEffect(() => {
    const onHasLogo = () => {
      setHasLogo(true);
    };

    if (!storefront.theme.logo) {
      onHasLogo();
      return;
    }

    const logo = new Image();
    logo.src = storefront.theme.logo;

    logo.onload = onHasLogo;
    logo.onerror = onHasLogo;
  }, []);
  const appBody = (
    <>
      <Head>
        {storefront.meta.favicon && (
          <>
            <link rel="icon" type="image/png" href={storefront.meta.favicon} />
          </>
        )}
        <title>{storefront.meta.title}</title>
        <meta
          name="description"
          content={storefront.meta.description}
          key="description"
        />
        <meta
          property="og:title"
          content={storefront.meta.title}
          key="og:title"
        />
        <meta
          property="og:description"
          content={storefront.meta.description}
          key="og:description"
        />
        <meta
          property="og:image"
          content={storefront.theme.logo}
          key="og:image"
        />
        <meta property="og:type" content="website" key="og:type" />
      </Head>
      {isMounted && <CreateReactAppEntryPoint storefront={storefront} />}
    </>
  );

  if (process.env.NEXT_PUBLIC_BUGSNAG_API_KEY) {
    //@ts-ignore
    const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
    return <ErrorBoundary>{appBody}</ErrorBoundary>;
  }

  return <>{appBody}</>;
}

export default AppWrapper;
