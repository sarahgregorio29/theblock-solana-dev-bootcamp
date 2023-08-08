'use client';

import React, { useState, useEffect } from 'react'
import './App.css';
import Form from './view/Form';

function App() {
  const [walletAddress, setWalletAdresss] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      checkConnection();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  });

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
            <Form />
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
