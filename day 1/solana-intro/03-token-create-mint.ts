import 'dotenv/config'
import base58 from  'bs58'
import * as Web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'

const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
const authority = new Web3.PublicKey('e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW');
const decoded = base58.decode(process.env.PRIVATE_KEY as any);
const payer = Web3.Keypair.fromSecretKey(decoded);

async function main() {

    const tokenMint = await token.createMint (
        connection,
        payer,
        authority,
        authority,
        9
    )
    console.log(tokenMint.toBase58())
    // Output Mint: 4dMmEusEFfuRJriiJeuqdeyumH6ehyTMSumijSSkuspB
}

main()