import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useWallet,
  ConnectionProvider,
  WalletProvider as BaseWalletProvider,
} from '@solana/wallet-adapter-react';
import { 
  WalletAdapter,
  WalletError,
  WalletAdapterNetwork,
} from '@solana/wallet-adapter-base';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import { Button, Collapse } from 'antd';
import { MetaplexModal } from '../components/MetaplexModal';
import { notify } from '../utils';
// import { useHistory } from 'react-router-dom';
const { Panel } = Collapse;

export interface WalletModalContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
}

export const WalletModalContext = createContext<WalletModalContextState>(
  {} as WalletModalContextState,
);

export function useWalletModal(): WalletModalContextState {
  return useContext(WalletModalContext);
}

export const WalletModal: FC = () => {
  const { wallets, wallet: selected, select } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const [showWallets, setShowWallets] = useState(false);
  const close = useCallback(() => {
    setVisible(false);
    setShowWallets(false);
  }, [setVisible, setShowWallets]);


  const phatomWallet = useMemo(() =>  new PhantomWalletAdapter(), []);

  return (
    <MetaplexModal title="Connect Wallet" visible={visible} onCancel={close}>
      <span
        style={{
          color: 'rgba(255, 255, 255, 0.75)',
          fontSize: '14px',
          lineHeight: '14px',
          fontFamily: 'GraphikWeb',
          letterSpacing: '0.02em',
          marginBottom: 14,
        }}
      >
        RECOMMENDED
      </span>

      <Button
        className="phantom-button metaplex-button"
        onClick={() => {
          console.log(phatomWallet.name);
          select(phatomWallet.name);
          close();
        }}
      >
        <img src={phatomWallet?.icon} style={{ width: '1.2rem' }} />
        &nbsp;Connect to Phantom
      </Button>
      <Collapse
        ghost
        expandIcon={panelProps =>
          panelProps.isActive ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7.5L10 12.5L5 7.5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )
        }
      >
        <Panel
          header={
            <span
              style={{
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '16px',
                letterSpacing: '-0.01em',
                color: 'rgba(255, 255, 255, 255)',
              }}
            >
              Other Wallets
            </span>
          }
          key="1"
        >
          {wallets.map((wallet, idx) => {
            if (wallet.adapter.name === 'Phantom') return null;

            return (
              <Button
                key={idx}
                className="metaplex-button w100"
                style={{
                  marginBottom: 5,
                }}
                onClick={() => {
                  select(wallet.adapter.name);
                  close();
                }}
              >
                Connect to {wallet.adapter.name}
              </Button>
            );
          })}
        </Panel>
      </Collapse>
    </MetaplexModal>
  );
};

export const WalletModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { publicKey } = useWallet();
  console.log(`loading wallet ... ${publicKey}`);

  const [connected, setConnected] = useState(!!publicKey);
  console.log(`wallet connection state: ${connected}`);

  const [visible, setVisible] = useState(false);
  console.log(`wallet visibility state: ${visible}`);

  useEffect(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      const keyToDisplay =
        base58.length > 20
          ? `${base58.substring(0, 7)}.....${base58.substring(
              base58.length - 7,
              base58.length,
            )}`
          : base58;

      notify({
        message: 'Wallet update',
        description: 'Connected to wallet ' + keyToDisplay,
      });
    }
  }, [publicKey]);

  useEffect(() => {
    if (!publicKey && connected) {
      notify({
        message: 'Wallet update',
        description: 'Disconnected from wallet',
      });
    }
    setConnected(!!publicKey);
  }, [publicKey, connected, setConnected]);

  return (
    <WalletModalContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
      <WalletModal />
    </WalletModalContext.Provider>
  );
};

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  console.log(`network: ${network}`);

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  console.log(`endpoint: ${endpoint}`);

  const wallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new LedgerWalletAdapter(),
        new SolletWalletAdapter({ network }),
    ],
    [network]
  );
  console.log(`wallets: ${wallets}`);


  // const wallets = useMemo(
  //   () => [
  //     getPhantomWallet(),
  //     getSolflareWallet(),
  //     // getSlopeWallet(),
  //     // getTorusWallet({
  //     //   options: {
  //     //     // @FIXME: this should be changed for Metaplex, and by each Metaplex storefront
  //     //     clientId:
  //     //       'BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ',
  //     //   },
  //     // }),
  //     getLedgerWallet(),
  //     getSolongWallet(),
  //     getMathWallet(),
  //     getSolletWallet(),
  //   ],
  //   [],
  // );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
    notify({
      message: 'Wallet error',
      description: error.message,
    });
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/*<BaseWalletProvider wallets={wallets} onError={onError} autoConnect={false}> */}
      <BaseWalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </BaseWalletProvider>
    </ConnectionProvider>
  );
};

export type WalletSigner = Pick<
  WalletAdapter,
  'publicKey' | 'sendTransaction'
>;