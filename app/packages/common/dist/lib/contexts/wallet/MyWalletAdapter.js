"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWalletAdapter = exports.MyWalletName = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const web3_js_1 = require("@solana/web3.js");
const MyWallet_1 = __importDefault(require("./MyWallet"));
exports.MyWalletName = 'My Wallet';
class MyWalletAdapter extends wallet_adapter_base_1.BaseMessageSignerWalletAdapter {
    constructor(config = {}) {
        super();
        this.name = exports.MyWalletName;
        this.url = 'https://solflare.com';
        this.icon = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ3LjUgNDcuNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuNSA0Ny41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgdmVyc2lvbj0iMS4xIiBpZD0ic3ZnMiI+PGRlZnMgaWQ9ImRlZnM2Ij48Y2xpcFBhdGggaWQ9ImNsaXBQYXRoMTYiIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aDE4IiBkPSJNIDAsMzggMzgsMzggMzgsMCAwLDAgMCwzOCBaIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yNSwwLDAsLTEuMjUsMCw0Ny41KSIgaWQ9ImcxMCI+PGcgaWQ9ImcxMiI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoMTYpIiBpZD0iZzE0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNyw1KSIgaWQ9ImcyMCI+PHBhdGggaWQ9InBhdGgyMiIgc3R5bGU9ImZpbGw6IzNiODhjMztmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIgZD0ibSAwLDAgYyAwLC0yLjIwOSAtMS43OTEsLTQgLTQsLTQgbCAtMjgsMCBjIC0yLjIwOSwwIC00LDEuNzkxIC00LDQgbCAwLDI4IGMgMCwyLjIwOSAxLjc5MSw0IDQsNCBsIDI4LDAgYyAyLjIwOSwwIDQsLTEuNzkxIDQsLTQgTCAwLDAgWiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4wODc5LDE1LjA2OTMpIiBpZD0iZzI0Ij48cGF0aCBpZD0icGF0aDI2IiBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lIiBkPSJtIDAsMCBjIDAuNTI2LDEuMTc5IDAuNzQ0LDIuNTQyIDAuNzQ0LDMuOTY5IDAsMy42ODkgLTEuOTU0LDcuMTMxIC01LjgyOSw3LjEzMSAtMy44NzYsMCAtNS44MywtMy4zNzkgLTUuODMsLTcuMTMxIDAsLTMuNzgyIDEuODkyLC03LjEzMiA1LjgzLC03LjEzMiAwLjcxMiwwIDEuMzY0LDAuMDk0IDEuOTgzLDAuMjE4IGwgLTEuMTE1LDEuMDg1IGMgLTAuMzQyLDAuMzEgLTAuNTksMC44MDYgLTAuNTksMS4yNCAwLDEuMjA5IDAuODM4LDIuMjMyIDIuMTA5LDIuMjMyIDAuNDM0LDAgMC44MDUsLTAuMTU1IDEuMTc4LC0wLjQwMyBMIDAsMCBaIG0gMC4zNzEsLTYuMDc3IGMgLTEuNTE5LC0wLjg2OCAtMy4zNDgsLTEuMzY0IC01LjQ1NiwtMS4zNjQgLTYuMjk1LDAgLTEwLjY2Niw0Ljk5MiAtMTAuNjY2LDExLjQxIDAsNi40NDkgNC4zNCwxMS40MSAxMC42NjYsMTEuNDEgNi4yMzEsMCAxMC42NjUsLTUuMTE2IDEwLjY2NSwtMTEuNDEgMCwtMi43MjkgLTAuNzEzLC01LjIwOSAtMi4wNzgsLTcuMTYyIGwgMS43NjgsLTEuNTIgYyAwLjU4OSwtMC41MjcgMS4wODUsLTEuMDIzIDEuMDg1LC0xLjg5MSAwLC0xLjA4NSAtMS4wODUsLTEuOTU0IC0yLjEzOCwtMS45NTQgLTAuNjg0LDAgLTEuMjQsMC4yOCAtMi4wNzgsMC45OTMgbCAtMS43NjgsMS40ODggeiIvPjwvZz48L2c+PC9nPjwvZz4KCQoJPG1ldGFkYXRhPgoJCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6cmRmcz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KCQkJPHJkZjpEZXNjcmlwdGlvbiBhYm91dD0iaHR0cHM6Ly9pY29uc2NvdXQuY29tL2xlZ2FsI2xpY2Vuc2VzIiBkYzp0aXRsZT0iUSwgQ2hhcmFjdGVycywgQ2hhcmFjdGVyLCBBbHBoYWJldCwgTGV0dGVyIiBkYzpkZXNjcmlwdGlvbj0iUSwgQ2hhcmFjdGVycywgQ2hhcmFjdGVyLCBBbHBoYWJldCwgTGV0dGVyIiBkYzpwdWJsaXNoZXI9Ikljb25zY291dCIgZGM6ZGF0ZT0iMjAxNi0xMi0xNCIgZGM6Zm9ybWF0PSJpbWFnZS9zdmcreG1sIiBkYzpsYW5ndWFnZT0iZW4iPgoJCQkJPGRjOmNyZWF0b3I+CgkJCQkJPHJkZjpCYWc+CgkJCQkJCTxyZGY6bGk+VHdpdHRlciBFbW9qaTwvcmRmOmxpPgoJCQkJCTwvcmRmOkJhZz4KCQkJCTwvZGM6Y3JlYXRvcj4KCQkJPC9yZGY6RGVzY3JpcHRpb24+CgkJPC9yZGY6UkRGPgogICAgPC9tZXRhZGF0YT48L3N2Zz4K';
        this._readyState = typeof window === 'undefined' ? wallet_adapter_base_1.WalletReadyState.Unsupported : wallet_adapter_base_1.WalletReadyState.Loadable;
        this._disconnected = () => {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._publicKey = null;
                this.emit('error', new wallet_adapter_base_1.WalletDisconnectedError());
                this.emit('disconnect');
            }
        };
        this._connecting = false;
        this._publicKey = null;
        this._wallet = null;
        this._config = config;
    }
    get publicKey() {
        return this._publicKey;
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        var _a;
        return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.connected);
    }
    get readyState() {
        return this._readyState;
    }
    async connect() {
        try {
            if (this.connected || this.connecting)
                return;
            if (this._readyState !== wallet_adapter_base_1.WalletReadyState.Loadable)
                throw new wallet_adapter_base_1.WalletNotReadyError();
            if (!this._wallet) {
                this._wallet = new MyWallet_1.default({ network: this._config.network });
            }
            this._connecting = true;
            const wallet = this._wallet;
            if (!wallet.connected) {
                try {
                    await wallet.connect();
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            if (!wallet.publicKey)
                throw new wallet_adapter_base_1.WalletConnectionError();
            let publicKey;
            try {
                publicKey = new web3_js_1.PublicKey(wallet.publicKey.toBytes());
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
            }
            wallet.on('disconnect', this._disconnected);
            this._wallet = wallet;
            this._publicKey = publicKey;
            this.emit('connect', publicKey);
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
            this._publicKey = null;
            try {
                await wallet.disconnect();
            }
            catch (error) {
                this.emit('error', new wallet_adapter_base_1.WalletDisconnectionError(error === null || error === void 0 ? void 0 : error.message, error));
            }
        }
        this.emit('disconnect');
    }
    async signTransaction(transaction) {
        try {
            const wallet = this._wallet;
            if (!wallet)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            try {
                return (await wallet.signTransaction(transaction)) || transaction;
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
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
                return (await wallet.signAllTransactions(transactions)) || transactions;
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    async signMessage(message) {
        try {
            const wallet = this._wallet;
            if (!wallet)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            try {
                return await wallet.signMessage(message, 'utf8');
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}
exports.MyWalletAdapter = MyWalletAdapter;
//# sourceMappingURL=MyWalletAdapter.js.map