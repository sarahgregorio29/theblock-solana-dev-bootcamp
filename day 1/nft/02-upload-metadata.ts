import {createMetaplexInstance } from "./metaplex"

async function main() {
    const metaplex = createMetaplexInstance()
    const metadata = {
        name: 'Ichiro',
        symbol: 'ICHIRO',
        image: 'https://arweave.net/D6HMPLUckLR-gV3Usk8VRkwHi0NTShnKxQXuvOU0SPY',
        attributes: [
            {
                trait_type: 'species',
                value: 'canine'
            },
            {
                trait_type: 'gender',
                value: 'male'
            },
            {
                trait_type: 'breed',
                value: 'shih tzu'
            },
        ]
    }
    const result = await metaplex.nfts().uploadMetadata(metadata)
    console.log('result', result)
    console.log('uri', result.uri)

    // Output
    // result {
    // uri: 'https://arweave.net/Bw8bbYs3Xu1dXwo6hNwe7TH6slrqpJ3LblRD33N4JK0',
    // metadata: {
    //     name: 'Ichiro',
    //     symbol: 'ICHIRO',
    //     image: 'https://arweave.net/D6HMPLUckLR-gV3Usk8VRkwHi0NTShnKxQXuvOU0SPY',
    //     attributes: [ [Object], [Object], [Object] ]
    // },
    // assetUris: []
    // }
    // https://arweave.net/Bw8bbYs3Xu1dXwo6hNwe7TH6slrqpJ3LblRD33N4JK0
}

main()