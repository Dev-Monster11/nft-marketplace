import { Cluster, clusterApiUrl, Transaction, PublicKey, Keypair, sendAndConfirmTransaction, Connection, TransactionInstruction} from '@solana/web3.js';
import EventEmitter from 'eventemitter3';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { Message, SystemInstruction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import React from 'react';

export interface QueenWalletConfig {
  network?: Cluster
}

export default class QueenWallet extends EventEmitter {
  private _connection: Connection;

  private _wallet: Keypair;

  private _isConnected: boolean = false;

  constructor (config: QueenWalletConfig) {
    super();
    this._connection = new Connection(clusterApiUrl('devnet'));
    const secretKey = localStorage.getItem("secretkey") || "4qjfV1u1s8ZWpEoADU82upMJRxRmnFBVxTT89W4oMGNoQLJTQ1sGFkdgGmzAKdZVumygoY5YvsNVHXdm75mDpKdn";
    this._wallet = Keypair.fromSecretKey(bs58.decode(secretKey).valueOf());
  }

  get publicKey () {
    return this._wallet?.publicKey || null;
  }

  get isConnected () {
    return this._isConnected;
  }

  get connected () {
    return this.isConnected;
  }

  get autoApprove () {
    return false;
  }

  get isQueen () {
    return true;
  }

  async connect () {
    if (this.connected) {
      return;
    }

    this._isConnected = true;
  }

  async disconnect () {
    if (!this._wallet) {
      return;
    }

    this._isConnected = false;

    this.emit('disconnect');
  }

  async signTransaction (transaction: Transaction): Promise<Transaction> {
    if (!this.connected) {
      throw new Error('Wallet not connected');
    }
    let transactionBuffer = transaction.serializeMessage();
    const decodedTransfer = SystemInstruction.decodeTransfer(transaction.instructions[0]);
    
    const myPromise = new Promise<Transaction>((resolve, reject) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div style={{border: "1px solid black", padding: "20px", backgroundColor: "black"}}>
              <h1>{decodedTransfer.lamports/LAMPORTS_PER_SOL} SOL</h1>
              <button style={{ border: "1px solid", padding: "5px" }} onClick = {() => {reject(new Error('Cancelled')); onClose()}}>Cancel</button>
              <button style={{ border: "1px solid", padding: "5px", marginLeft: "10px" }}
                onClick={() => {
                  
                  
                  let signature = bs58.encode(nacl.sign.detached(transactionBuffer, this._wallet.secretKey));
                  transaction.addSignature(this.publicKey, bs58.decode(signature));
                  resolve(transaction);
                  onClose()}}
              >
                Approve
              </button>
            </div>
          );
        }
      });
    });
    return myPromise;
  }

  async signAllTransactions (transactions: Transaction[]): Promise<Transaction[]> {
    if (!this.connected) {
      throw new Error('Wallet not connected');
    }
    const txs = transactions.map((transaction)=>{
      return this.signTransaction(transaction)
    });
    return await Promise.all(txs);
  }

  async signMessage (data: Uint8Array, display: 'hex' | 'utf8' = 'utf8'): Promise<Uint8Array> {
    if (!this.connected) {
      throw new Error('Wallet not connected');
    }

    return data;
  }

  async sign (data: Uint8Array, display: 'hex' | 'utf8' = 'utf8'): Promise<Uint8Array> {
    return await this.signMessage(data, display);
  }
}
