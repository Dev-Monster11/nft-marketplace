import {
  AccountsProvider,
  ConnectionProvider,
  StoreProvider,
  // WalletProvider,
  MetaProvider,
} from '@oyster/common';
import React, { FC } from 'react';
import { WalletProvider } from './contexts/walletProvider'
import { ConfettiProvider } from './components/Confetti';
import { AppLayout } from './components/Layout';
import { LoaderProvider } from './components/Loader';
import { CoingeckoProvider } from './contexts/coingecko';
import { Storefront } from '@oyster/common';
import { AnalyticsProvider } from './components/Analytics';
import getConfig from 'next/config';
import { Provider } from 'react-redux'
import {store} from './store/store'


const nextConfig = getConfig();
const publicRuntimeConfig = nextConfig.publicRuntimeConfig;

interface ProvidersProps {
  storefront: Storefront;
  children: React.ReactNode;
}

console.log(`publicRuntimeConfig.publicStoreAddress: ${publicRuntimeConfig.publicStoreAddress}`)
export const Providers: FC<ProvidersProps> = ({ children, storefront }) => {
  return (
    <ConnectionProvider>
      <StoreProvider
        storefront={storefront}
        storeAddress={publicRuntimeConfig.publicStoreAddress}
      >
        <WalletProvider>
          <AccountsProvider>
            <CoingeckoProvider>
              <MetaProvider>
                <LoaderProvider>
                  <ConfettiProvider>
                    <AnalyticsProvider>
                    <Provider store={store}>
                        <AppLayout storefront={storefront}>{children}</AppLayout>
                        </Provider>
                    </AnalyticsProvider>
                  </ConfettiProvider>
                </LoaderProvider>
              </MetaProvider>
            </CoingeckoProvider>
          </AccountsProvider>
        </WalletProvider>
      </StoreProvider>
    </ConnectionProvider>
  );
};
