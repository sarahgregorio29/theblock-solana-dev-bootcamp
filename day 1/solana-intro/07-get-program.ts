import 'dotenv/config'
import base58 from  'bs58'
import * as Web3 from '@solana/web3.js'

const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
const authority = new Web3.PublicKey('e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW');
const decoded = base58.decode(process.env.PRIVATE_KEY as any);
const payer = Web3.Keypair.fromSecretKey(decoded);
const programId = new Web3.PublicKey('8GvHtgb3huq9QpkAniovPEcSeKwMRc3qAg2vcmzwtLwf');

async function main() {
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: authority,
                isSigner: true,
                isWritable: false
            }
        ],
        data: Buffer.alloc(20),
        programId: programId
    });
    const transaction = new Web3.Transaction() // will instantiate the transaction object
    transaction.add(instruction) // will add the transaction object
    const txSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [payer]) // run the transfer and get the transaction signature
    console.log('SIGNATURE', txSignature)
    // Output: 4y9gMQUJQBwZbhmD2duPpM96aTY9QDDLExmh4yq4tudDugbLKTBcqitBMbtVtwNZRYo63FgxZY18PGDH7htaTLBL
}
main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
});