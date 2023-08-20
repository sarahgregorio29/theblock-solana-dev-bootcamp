import React from "react";
import { Header } from "../components/Header";
import { useExpenses } from "../hooks/useExpenses";
import { useWallet } from "@solana/wallet-adapter-react";

export const Expenses = () => {
    
    const { handleInputTextChange, handleInputAmountChange, transactionPending, expenses, inputText, inputAmount, totalExpenses, addRecord } = useExpenses();
    const wallet = useWallet();

    return (
        <div className="App">
            <Header />

            { wallet.connected ? (
                <>
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
                            onClick={addRecord}
                            className="w-full content-center bg-blue-500 text-white px-4 rounded-lg py-3 hover:bg-blue-600 focus:outline-none"
                        >
                           { !transactionPending ? "Add" : "Loading..." }
                        </button>
                        {/* {
                            status ? (
                            <div className='w-full content-center bg-lime-600 text-white px-4 py-3 mt-4'>{status}</div>
                            ): (<></>)
                        }  */}
                        
                        </div>
                        {
                        expenses.length > 0 ? (
                            <div className="w-full">
                            <table className="table-auto w-full text-left border-collapse border">
                                <thead>
                                <tr>
                                    <th className="p-3 border">Transaction</th>
                                    <th className="p-3 border">Expenses</th>
                                    <th className="p-3 border">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {

                                    expenses.map((expense) => {
                                        const link = "https://explorer.solana.com/tx/" + expense.key + "?cluster=devnet"
                                        return (
                                            <tr key={expense.key}>
                                                <td className="p-3 border text-blue-500"><a href={link} target="_blank" rel="noreferrer">View in Explorer</a></td>
                                                <td className="p-3 border"> {expense.text} </td>
                                                <td className="p-3 border"> {expense.amount} </td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan={2} className="p-3 border"><strong>TOTAL</strong></td>
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
                </>
            ) : (
                <div className="w-full pt-10">
                    <p className="text-center">Connect to your wallet to start using the app.</p>
                </div>
            )
            }
        </div>
    );
}