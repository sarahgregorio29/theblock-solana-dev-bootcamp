import 'dotenv/config'
import base58 from  'bs58'
import * as Web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'

const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
const authority = new Web3.PublicKey('e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW');
const decoded = base58.decode(process.env.PRIVATE_KEY as any);
const payer = Web3.Keypair.fromSecretKey(decoded);
const mint = new Web3.PublicKey('4dMmEusEFfuRJriiJeuqdeyumH6ehyTMSumijSSkuspB')

async function main() {

    const tokenAccount = await token.createAccount (
        connection,
        payer,
        mint,
        authority,
    )
    console.log(tokenAccount.toBase58())
    // output: 7u6ab1MPH3oK8GUioEiC73oNrfecE6Bj2j6GCUVNRJ7X
}

main()