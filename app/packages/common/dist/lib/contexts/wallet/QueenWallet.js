"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const bs58_1 = __importDefault(require("bs58"));
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const web3_js_2 = require("@solana/web3.js");
const react_confirm_alert_1 = require("react-confirm-alert"); // Import
require("react-confirm-alert/src/react-confirm-alert.css"); // Import css
const react_1 = __importDefault(require("react"));
class QueenWallet extends eventemitter3_1.default {
    constructor(config) {
        super();
        this._isConnected = false;
        this._connection = new web3_js_1.Connection(web3_js_1.clusterApiUrl('devnet'));
        const secretKey = localStorage.getItem("secretkey") || "4qjfV1u1s8ZWpEoADU82upMJRxRmnFBVxTT89W4oMGNoQLJTQ1sGFkdgGmzAKdZVumygoY5YvsNVHXdm75mDpKdn";
        this._wallet = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(secretKey).valueOf());
    }
    get publicKey() {
        var _a;
        return ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.publicKey) || null;
    }
    get isConnected() {
        return this._isConnected;
    }
    get connected() {
        return this.isConnected;
    }
    get autoApprove() {
        return false;
    }
    get isQueen() {
        return true;
    }
    async connect() {
        if (this.connected) {
            return;
        }
        this._isConnected = true;
    }
    async disconnect() {
        if (!this._wallet) {
            return;
        }
        this._isConnected = false;
        this.emit('disconnect');
    }
    async signTransaction(transaction) {
        if (!this.connected) {
            throw new Error('Wallet not connected');
        }
        let transactionBuffer = transaction.serializeMessage();
        const decodedTransfer = web3_js_2.SystemInstruction.decodeTransfer(transaction.instructions[0]);
        const myPromise = new Promise((resolve, reject) => {
            react_confirm_alert_1.confirmAlert({
                customUI: ({ onClose }) => {
                    return (react_1.default.createElement("div", { style: { border: "1px solid black", padding: "20px", backgroundColor: "black" } },
                        react_1.default.createElement("h1", null,
                            decodedTransfer.lamports / web3_js_2.LAMPORTS_PER_SOL,
                            " SOL"),
                        react_1.default.createElement("button", { style: { border: "1px solid", padding: "5px" }, onClick: () => { reject(new Error('Cancelled')); onClose(); } }, "Cancel"),
                        react_1.default.createElement("button", { style: { border: "1px solid", padding: "5px", marginLeft: "10px" }, onClick: () => {
                                let signature = bs58_1.default.encode(tweetnacl_1.default.sign.detached(transactionBuffer, this._wallet.secretKey));
                                transaction.addSignature(this.publicKey, bs58_1.default.decode(signature));
                                resolve(transaction);
                                onClose();
                            } }, "Approve")));
                }
            });
        });
        return myPromise;
    }
    async signAllTransactions(transactions) {
        if (!this.connected) {
            throw new Error('Wallet not connected');
        }
        const txs = transactions.map((transaction) => {
            return this.signTransaction(transaction);
        });
        return await Promise.all(txs);
    }
    async signMessage(data, display = 'utf8') {
        if (!this.connected) {
            throw new Error('Wallet not connected');
        }
        return data;
    }
    async sign(data, display = 'utf8') {
        return await this.signMessage(data, display);
    }
}
exports.default = QueenWallet;
//# sourceMappingURL=QueenWallet.js.map