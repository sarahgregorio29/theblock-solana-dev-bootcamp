
import * as Web3 from '@solana/web3.js';

async function main() {
    console.log('Hello Solana')
    const PublicKey = new Web3.PublicKey('e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW')
    console.log(PublicKey)

    const endpoint = Web3.clusterApiUrl('devnet') // this will return the url of the devnet endpoint
    console.log(endpoint)

    const connection = new Web3.Connection(endpoint) // this will connect to the endpoint specified
    // const connection = new Web3.Connection('https://api.devnet.solana.com')
    
    const balance = await connection.getBalance(PublicKey) // this will get the balance of the public key specified
    console.log('balance', balance)

    const accountInfo = await connection.getAccountInfo(PublicKey)
    console.log(accountInfo)

}

main()