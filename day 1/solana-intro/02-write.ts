import 'dotenv/config' // used to access the env file
import * as Web3 from '@solana/web3.js'
import base58 from 'bs58' // used to decode the private key

async function main() {

    const decoded = base58.decode(process.env.PRIVATE_KEY as any) // this will decode the private key
    const payer = Web3.Keypair.fromSecretKey(decoded) 
    console.log('publicKey', keyPair.publicKey)

    const authorityFrom = new Web3.PublicKey('e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW')
    const authorityTo = new Web3.PublicKey('HiA8ThXHLDc5exWAT2LAp6Mk8ya7LU8bf6NMZrbK7r4e')

    // build the instruction to send SOL to other account
    const instruction = Web3.SystemProgram.transfer({ 
        fromPubkey: authorityFrom,
        toPubkey: authorityTo,
        lamports: 1,
    })

    const transaction = new Web3.Transaction() // will instantiate the transaction object
    transaction.add(instruction) // will add the transaction object

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet')) // build connection to devnet
    const txSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [payer]) // run the transfer and get the transaction signature

    console.log('txHash', txSignature)
}

main()