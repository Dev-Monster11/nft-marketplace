import { EventEmitter, WalletAdapter, WalletAdapterEvents } from '@solana/wallet-adapter-base';
import { PublicKey, Transaction } from '@solana/web3.js';
export interface QueenWalletAdapterConfig {
    pollInterval?: number;
    pollCount?: number;
}
export declare class QueenWalletAdapter extends EventEmitter<WalletAdapterEvents> implements WalletAdapter {
    private _connecting;
    private _wallet;
    private _publicKey;
    constructor(config?: QueenWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get ready(): boolean;
    get connecting(): boolean;
    get connected(): boolean;
    get autoApprove(): boolean;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    private _disconnected;
}
//# sourceMappingURL=QueenWalletAdapter.d.ts.map