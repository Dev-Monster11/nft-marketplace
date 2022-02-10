import { BaseMessageSignerWalletAdapter, WalletAdapterNetwork, WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { PublicKey, Transaction } from '@solana/web3.js';
export interface MyWalletAdapterConfig {
    network?: WalletAdapterNetwork;
}
export declare const MyWalletName: WalletName;
export declare class MyWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName;
    url: string;
    icon: string;
    private _connecting;
    private _wallet;
    private _publicKey;
    private _config;
    private _readyState;
    constructor(config?: MyWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    private _disconnected;
}
//# sourceMappingURL=MyWalletAdapter.d.ts.map