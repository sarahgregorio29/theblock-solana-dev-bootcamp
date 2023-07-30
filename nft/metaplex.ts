import "dotenv/config";
import * as Web3 from "@solana/web3.js"
import base58 from "bs58";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";

const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
const decoded = base58.decode(process.env.PRIVATE_KEY as any)
const payer = Web3.Keypair.fromSecretKey(decoded)

export const createMetaplexInstance = () => {
    const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(payer))
    .use(bundlrStorage({
        address: "https://devnet.bundlr.network/",
        providerUrl: Web3.clusterApiUrl('devnet'),
        timeout: 60000
    }))

    return metaplex
    // Output: https://arweave.net/D6HMPLUckLR-gV3Usk8VRkwHi0NTShnKxQXuvOU0SPY
}