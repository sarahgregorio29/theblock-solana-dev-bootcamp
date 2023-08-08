import 'dotenv/config'
import * as Web3 from '@solana/web3.js'
import { Movie } from './movie.schema'
import base58 from 'bs58'

const keypairFromSecretKey = Web3.Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY as any))
async function main() {
    const movie = new Movie('The Matrix', 5, 'A movie about the matrix')
    const publicKey = new Web3.PublicKey('e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW')
    const programId = new Web3.PublicKey('8GvHtgb3huq9QpkAniovPEcSeKwMRc3qAg2vcmzwtLwf')
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: Web3.SystemProgram.programId,
                isSigner: false,
                isWritable: false
            }
        ],
        data: movie.serialize(),
        programId: programId
    })

    const transaction = new Web3.Transaction()
    transaction.add(instruction)

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keypairFromSecretKey]
    )
    console.log('SIGNATURE', signature)
    // OUTPUT: HfkcPNgjnCSJ7pr3kv1R96M2KXMSPhQi1z6wAp4Ko7nFKAf6E94yomTEsX7q2qu88T6v1iqj3hSyjMeVvhkYia5
}

main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
})