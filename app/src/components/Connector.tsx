import React from 'react';

export default function Connector(user: any) {

    const connectWallet = async () => {
        const { solana } = window as any;
        if(solana) {
            await solana.connect();
        }
    }

    if(!user.isConnected) return(
        <>
            <div className="lg:flex content-center pt-12">
                <button
                    onClick={connectWallet}
                    type="button"
                    className="px-20 py-3 m-auto mt-12 items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                > CONNECT PHANTOM WALLET 
                </button>
            </div>
        </>
    );
    return( <></> );
}