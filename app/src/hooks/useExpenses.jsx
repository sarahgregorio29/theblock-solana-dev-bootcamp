import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import * as buffer from "buffer";

import { SystemProgram, Keypair } from "@solana/web3.js";
import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";

import idl from "../idl.json";

export function useExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [inputText, setInputText] = useState('');
    const [inputAmount, setInputAmount] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [tablekey, setTableKey] = useState("");

    const [transactionPending, setTransactionPending] = useState(false);

    const { connection } = useConnection();
    const { wallet } = useWallet(); // for UI state e.g: wallet name, wallet connected
    const anchorWallet = useAnchorWallet(); // for AnchorProvider
    
    const programId = "EozGe4eZCQE3gTuJwUT8ufM4e7EAVc4VSnjP2nHax7om";

    window.Buffer = buffer.Buffer;

    const handleInputTextChange = (e) => {
        setInputText(e.target.value);
    }

    const handleInputAmountChange = (e) => {
        setInputAmount(parseFloat(e.target.value));
    }

    const handleAddExpenses = (tx, baseAccountPublicKey) => {
        if (inputText.trim() !== '') {
            setTimeout(function() {
                const record = fetchRecords(baseAccountPublicKey);
                const programData = Promise.resolve(record);
                programData.then(value => {
                    const newExpenses = {
                        key: tx,
                        text: value.text,
                        amount: value.amount.toNumber(),
                    };
                    setExpenses([...expenses, newExpenses]);
                    setTableKey('');
                    setInputText('');
                    setInputAmount(0);
                    setTotalExpenses(totalExpenses+inputAmount);
                }).catch(err => {
                    console.log(err);
                });
            }, 1000);
        }
    }

    const getProvider = () => {
        if(!wallet) {
            return null;
        }
        const provider = new anchor.AnchorProvider(
            connection, 
            anchorWallet, 
            anchor.AnchorProvider.defaultOptions()
        );
        return provider;
    }
    
    const getProgram = (provider) => {
        const parsedIdl = JSON.parse(JSON.stringify(idl));
        const program = new anchor.Program(parsedIdl, programId, provider);
        return program;
    }

    const addRecord = async() => {
        const baseAccount = Keypair.generate();
        const provider = getProvider();
        const program = getProgram(provider);
        try {
            setTransactionPending(true);
            const userPublicKey = new anchor.web3.PublicKey(anchorWallet.publicKey);
            const bigAmount = new anchor.BN(inputAmount);
            
            const tx = await program.methods
                .addRecord(inputText, bigAmount)
                .accounts({
                    record: baseAccount.publicKey,   
                    authority: userPublicKey,
                    system_program: SystemProgram.programId,         
                })
                .signers([baseAccount])
                .rpc();
            
            if(tx) handleAddExpenses(tx, baseAccount.publicKey);

        } catch(err) {
            console.log(err)
        } finally {
            setTransactionPending(false);
        }
    }

    const fetchRecords = async(baseAccountPublicKey) => { 
        try {
            const provider = getProvider();
            const program = getProgram(provider);

            return Promise.resolve(await program.account.record.fetch(baseAccountPublicKey));

        } catch(err) {
            console.log(err)
        }
    }

    return { handleInputTextChange, handleInputAmountChange, transactionPending, expenses, inputText, inputAmount, totalExpenses, addRecord, tablekey }
}