'use client';

import React, { useState, useEffect } from 'react'
import './App.css';
import { Record } from './record.schema'

import { Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import  * as Web3 from '@solana/web3.js';

window.Buffer = window.Buffer || require("buffer").Buffer; 

interface Expenses {
  id: number;
  text: string;
  amount: number;
  deleted: boolean;
}

function App() {
  const [walletAddress, setWalletAdresss] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [inputText, setInputText] = useState('');
  const [inputAmount, setInputAmount] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const [status, setStatus] = useState<string>('');

  const fromWallet = Keypair.generate();

  useEffect(() => {
    const onLoad = () => {
      checkConnection();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'), 'confirmed')
    const publicKey = new PublicKey(walletAddress);
    const programId = new PublicKey('BbqB5v7ukqDquJ1TaDTZfsYtuE51QLJZe76VGdc6xgZC');

    // Submit the transaction using Phantom wallet
    const {solana} = window as any;
    try {

      const record = new Record(inputText, inputAmount)
      const instruction = new Web3.TransactionInstruction({
          keys: [
              {
                  pubkey: fromWallet.publicKey,
                  isSigner: true,
                  isWritable: false,
              },
              {
                  pubkey: Web3.SystemProgram.programId,
                  isSigner: false,
                  isWritable: false
              }
          ],
          data: record.serialize(),
          programId: programId
      })

      const latestBlockhash = await connection.getLatestBlockhash();
      const transaction = new Web3.Transaction()
      
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = latestBlockhash.blockhash;
      
      transaction.add(instruction);
      const signedTransaction: Transaction = await solana.signTransaction(transaction);
      const signature = await sendAndConfirmTransaction(connection, signedTransaction, [fromWallet]);

      setStatus(`Transaction successful! Signature: ${signature}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      setStatus('Transaction failed.');
    }

  };

  // const handleAddExpenses = () => {
  //   if (inputText.trim() !== '') {
  //     const newExpenses: Expenses = {
  //       id: Date.now(),
  //       text: inputText,
  //       amount: inputAmount,
  //       deleted: false,
  //     };

  //     setExpenses([...expenses, newExpenses]);
  //     setInputText('');
  //     setInputAmount(0);
  //     setTotalExpenses(totalExpenses+inputAmount);

  //   }
  // };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(parseFloat(e.target.value));
  };

  const checkConnection = async () => {
    const { solana } = window as any;
    try {
      setLoading(true)
      if (solana) {
        if (solana.isPhantom && isConnected) {
          const response = await solana.connect({
            onlyIfTrusted: true,
          });
          setWalletAdresss(response.publicKey.toString());
          setIsConnected(true);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };
  
  const disconnectWallet = async () => {
    const { solana } = window as any;
    try {
      setLoading(true)
      if (solana) {
        if (solana.isPhantom) {
          await solana.disconnect();
          setWalletAdresss("");
          setIsConnected(false);
          window.location.href = '';
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  const connectWallet = async () => {
    const { solana } = window as any;
    try {
      setLoading(true)
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect();
          setWalletAdresss(response.publicKey.toString());
          setIsConnected(true);
        } else {
          alert("Please Install Solana's Phantom Wallet");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {
        isConnected && walletAddress ? (
            <div className="App">
              <div className="bg-gray-900 flex flex-col ">
                  {/* HEADER */}
                  <div className="md:flex md:items-center md:justify-between mx-3.5 mt-3.5">
                      <div className="min-w-0 flex-0">
                          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                          The Blokc | Solana Development Bootcamp
                          </h2>
                      </div>
                      <div className="mt-5 md:ml-4 md:mt-0">
                        <button
                            type="button"
                            className="mx-2 inline-block items-center rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled
                        > { !loading ? walletAddress.substring(walletAddress.length - 6) + " is Connected"  : "Loading..."  }
                        </button>
                        <button
                            onClick={disconnectWallet}
                            type="button"
                            className="mx-2 inline-block items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        > { !loading ? "Logout" : "Loading..." }
                        </button>
                      </div>
                  </div>
                  <div className="md:flex md:items-center md:justify-between m-3.5 pb-2">
                      <div className="min-w-0 flex-0">
                          <h2 className="text-lg text-white">
                          Sarah Gregorio | Final Project
                          </h2>
                      </div>
                  </div>
              </div>
              {/* FORM */}
              <div className="bg-white min-h-mi d-block w-full md:w-1/2 mx-auto py-8 px-5">
                <div className="p-6 rounded-lg shadow-lg mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Expenses</h1>
                  <input
                    type="text"
                    value={inputText}
                    onChange={handleInputTextChange}
                    className="w-full text-gray-900 border-gray-200 border-2 p-2 rounded-lg focus:outline-none mb-2"
                    placeholder="i.e. Groceries"
                  />
                  <input
                    type="number"
                    value={inputAmount}
                    onChange={handleInputAmountChange}
                    className="w-full text-gray-900 border-gray-200 border-2 p-2 rounded-lg focus:outline-none mb-2"
                    placeholder="i.e 50.00"
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-full content-center bg-blue-500 text-white px-4 rounded-lg py-3 hover:bg-blue-600 focus:outline-none"
                  >
                    Add
                  </button>
                  { 
                    status ? (
                      <div className='w-full content-center bg-lime-600 text-white px-4 py-3 mt-4'>{status}</div>
                    ): (<></>)
                  }
                  
                </div>
                {
                  expenses.length > 0 ? (
                    <div className="w-full">
                      <table className="table-auto w-full text-left border-collapse border">
                        <thead>
                          <tr>
                            <th className="p-3 border">Expenses</th>
                            <th className="p-3 border">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            expenses.map(expense => (
                              <tr key={expense.id}>
                                <td className="p-3 border"> {expense.text} </td>
                                <td className="p-3 border"> {expense.amount} </td>
                              </tr>
                          ))}
                          <tr>
                              <td className="p-3 border"><strong>TOTAL</strong></td>
                              <td className="p-3 border"><strong>{totalExpenses}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <></>
                  )
                }
              </div>
            </div>
        ) : (
          <div className="w-full content-center pt-12">
              <button
                  onClick={connectWallet}
                  type="button"
                  className="px-20 py-3 mx-auto mt-12 block rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              > { !loading ? "CONNECT PHANTOM WALLET" : "Loading..." }
              </button>
          </div>
        )
      }
    </>
    
  );
}

export default App;