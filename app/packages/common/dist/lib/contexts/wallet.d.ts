import React, { FC, ReactNode } from 'react';
import { WalletAdapter } from '@solana/wallet-adapter-base';
export interface WalletModalContextState {
    visible: boolean;
    setVisible: (open: boolean) => void;
}
export declare const WalletModalContext: React.Context<WalletModalContextState>;
export declare function useWalletModal(): WalletModalContextState;
export declare const WalletModal: FC;
export declare const WalletModalProvider: FC<{
    children: ReactNode;
}>;
export declare const WalletProvider: FC<{
    children: ReactNode;
}>;
export declare type WalletSigner = Pick<WalletAdapter, 'publicKey' | 'sendTransaction'>;
//# sourceMappingURL=wallet.d.ts.map