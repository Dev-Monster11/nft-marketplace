import { WalletAdapter, WalletError } from '@solana/wallet-adapter-base';
import {
  useWallet,
  WalletProvider as BaseWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Button, Collapse } from 'antd';
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
import { clusterApiUrl } from '@solana/web3.js';
import { MetaplexModal } from '@oyster/common';
import { notify } from '@oyster/common';
import { useHistory } from 'react-router-dom';
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

  const phatomWallet = useMemo(() => new PhantomWalletAdapter(), []);

  return (
    <MetaplexModal centered visible={visible} onCancel={close} closable={false}>
      <h4 className="mb-3">Pick a wallet to conneect to Queendom</h4>
      <Button
        className="metaplex-button-jumbo d-flex"
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
              fill="gray"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7.5L10 12.5L5 7.5"
                stroke="gray"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="gray"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="gray"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )
        }
      >
        <Panel header={<strong className="ms-4">Other Wallet</strong>} key="1">
          {wallets.map((wallet, idx) => {
            if (wallet.adapter === phatomWallet) return null;

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
  const [connected, setConnected] = useState(!!publicKey);
  const [visible, setVisible] = useState(false);

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
        message: 'Connected',
        description: <h5 className="fw-bold">{keyToDisplay}</h5>,
      });
    }
  }, [publicKey]);

  useEffect(() => {
    if (!publicKey && connected) {
      notify({
        message: 'Disconnected',
        description: '',
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

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
    ],
    [network],
  );
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
    // <BaseWalletProvider wallets={wallets} onError={onError} autoConnect={false}>
    <BaseWalletProvider wallets={wallets} onError={onError} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </BaseWalletProvider>
  );
};

export type WalletSigner = Pick<WalletAdapter, 'publicKey' | 'sendTransaction'>;
