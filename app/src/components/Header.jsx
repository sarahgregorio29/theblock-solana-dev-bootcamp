import React from "react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export const Header = () => {
    return (
        <>
            <div className="bg-gray-900 flex flex-col ">
                <div className="md:flex md:items-center md:justify-between mx-3.5 mt-3.5">
                    <div className="min-w-0 flex-0">
                        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        The Blokc | Solana Development Bootcamp
                        </h2>
                    </div>
                    <div className="mt-5 md:ml-4 md:mt-0">
                    <WalletMultiButton />
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
        </>
    );
}