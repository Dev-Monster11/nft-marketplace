import { Cluster, Transaction, PublicKey } from '@solana/web3.js';
import EventEmitter from 'eventemitter3';
export interface MyWalletConfig {
    network?: Cluster;
}
export default class MyWallet extends EventEmitter {
    private _connection;
    private _wallet;
    private _isConnected;
    constructor(config: MyWalletConfig);
    get publicKey(): PublicKey;
    get isConnected(): boolean;
    get connected(): boolean;
    get autoApprove(): boolean;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(data: Uint8Array, display?: 'hex' | 'utf8'): Promise<Uint8Array>;
    sign(data: Uint8Array, display?: 'hex' | 'utf8'): Promise<Uint8Array>;
}
//# sourceMappingURL=MyWallet.d.ts.map