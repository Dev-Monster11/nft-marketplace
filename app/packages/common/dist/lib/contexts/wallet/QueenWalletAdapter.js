"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueenWalletAdapter = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const web3_js_1 = require("@solana/web3.js");
const QueenWallet_1 = __importDefault(require("./QueenWallet"));
class QueenWalletAdapter extends wallet_adapter_base_1.EventEmitter {
    constructor(config = {}) {
        super();
        this._disconnected = () => {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                this._publicKey = null;
                this.emit('error', new wallet_adapter_base_1.WalletDisconnectedError());
                this.emit('disconnect');
            }
        };
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        // if (!this.ready) pollUntilReady(this, config.pollInterval || 1000, config.pollCount || 3);
    }
    get publicKey() {
        return this._publicKey;
    }
    get ready() {
        var _a;
        return !!((_a = window.queen) === null || _a === void 0 ? void 0 : _a.isQueen);
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        var _a;
        return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.isConnected);
    }
    get autoApprove() {
        var _a;
        return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.autoApprove);
    }
    async connect() {
        try {
            if (this.connected || this.connecting)
                return;
            this._connecting = true;
            const wallet = window.queen || new QueenWallet_1.default({ network: 'devnet' });
            if (!wallet)
                throw new wallet_adapter_base_1.WalletNotFoundError();
            if (!wallet.isQueen)
                throw new wallet_adapter_base_1.WalletNotInstalledError();
            if (!wallet.isConnected) {
                try {
                    await wallet.connect();
                }
                catch (error) {
                    if (error instanceof wallet_adapter_base_1.WalletError)
                        throw error;
                    throw new wallet_adapter_base_1.WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            let buffer;
            try {
                buffer = wallet.publicKey.toBuffer();
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletAccountError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            let publicKey;
            try {
                publicKey = new web3_js_1.PublicKey(buffer);
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            wallet.on('disconnect', this._disconnected);
            this._wallet = wallet;
            this._publicKey = publicKey;
            this.emit('connect');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
        finally {
            this._connecting = false;
        }
    }
    async disconnect() {
        const wallet = this._wallet;
        if (wallet) {
            wallet.off('disconnect', this._disconnected);
            this._wallet = null;
            this._publicKey = null;
            try {
                await wallet.disconnect();
            }
            catch (error) {
                this.emit('error', new wallet_adapter_base_1.WalletDisconnectionError(error.message, error));
            }
            this.emit('disconnect');
        }
    }
    async signTransaction(transaction) {
        try {
            const wallet = this._wallet;
            if (!wallet)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            try {
                return wallet.signTransaction(transaction);
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignatureError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    async signAllTransactions(transactions) {
        try {
            const wallet = this._wallet;
            if (!wallet)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            try {
                return wallet.signAllTransactions(transactions);
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignatureError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}
exports.QueenWalletAdapter = QueenWalletAdapter;
//# sourceMappingURL=QueenWalletAdapter.js.map