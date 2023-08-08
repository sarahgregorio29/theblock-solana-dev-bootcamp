import { createMetaplexInstance } from "./metaplex";

async function main() {
    const metaplex = createMetaplexInstance()
    const {nft} = await metaplex.nfts().create({
        uri: 'https://arweave.net/Bw8bbYs3Xu1dXwo6hNwe7TH6slrqpJ3LblRD33N4JK0',
        name: 'Ichiro',
        symbol: 'ICHRO',
        sellerFeeBasisPoints: 5000,
    }, { commitment: 'finalized' })
    console.log(nft)

    // OUTPUT
    // {
    //     model: 'nft',
    //     updateAuthorityAddress: PublicKey [PublicKey(e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW)] {
    //         _bn: <BN: 983057f183ef7d24edba7269d3c5801ba76b0b95b7be0c2a08304351397e4ff>
    //     },
    //     json: {
    //         name: 'Ichiro',
    //         symbol: 'ICHIRO',
    //         image: 'https://arweave.net/D6HMPLUckLR-gV3Usk8VRkwHi0NTShnKxQXuvOU0SPY',
    //         attributes: [ [Object], [Object], [Object] ]
    //     },
    //     jsonLoaded: true,
    //     name: 'Ichiro',
    //     symbol: '',
    //     uri: 'https://arweave.net/Bw8bbYs3Xu1dXwo6hNwe7TH6slrqpJ3LblRD33N4JK0',
    //     isMutable: true,
    //     primarySaleHappened: false,
    //     sellerFeeBasisPoints: 5000,
    //     editionNonce: 250,
    //     creators: [
    //         {
    //         address: [PublicKey [PublicKey(e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW)]],
    //         verified: true,
    //         share: 100
    //         }
    //     ],
    //     tokenStandard: 0,
    //     collection: null,
    //     collectionDetails: null,
    //     uses: null,
    //     programmableConfig: null,
    //     address: PublicKey [PublicKey(FfCkkTgDbQRTc7mBn7zc8mUaUmFeW7KyUBQhu5T4MJsy)] {
    //         _bn: <BN: d9ccfa7494ebf0ddc3dff33122a42e0fbf3d509a57abfe5a3f4a0e9ece4ea880>
    //     },
    //     metadataAddress: Pda [PublicKey(FkEChyBJHwCmTN6hsJ19Q1aGycw8rui7iBaK2Hure49o)] {
    //         _bn: <BN: db1684e50e587887cafb95006f0d3fe6f5c04f3550ac92e243eea8a757a9c042>,
    //         bump: 255
    //     },
    //     mint: {
    //         model: 'mint',
    //         address: PublicKey [PublicKey(FfCkkTgDbQRTc7mBn7zc8mUaUmFeW7KyUBQhu5T4MJsy)] {
    //         _bn: <BN: d9ccfa7494ebf0ddc3dff33122a42e0fbf3d509a57abfe5a3f4a0e9ece4ea880>
    //         },
    //         mintAuthorityAddress: PublicKey [PublicKey(5fT1KeZ28XzxLiQBPAhCCCntsDM1otHPPpjCnEcVrKgh)] {
    //         _bn: <BN: 454839174c2c58db10de08f4077d0964b1c81c06887ed0414dc7ba7663549e8e>
    //         },
    //         freezeAuthorityAddress: PublicKey [PublicKey(5fT1KeZ28XzxLiQBPAhCCCntsDM1otHPPpjCnEcVrKgh)] {
    //         _bn: <BN: 454839174c2c58db10de08f4077d0964b1c81c06887ed0414dc7ba7663549e8e>
    //         },
    //         decimals: 0,
    //         supply: { basisPoints: <BN: 1>, currency: [Object] },
    //         isWrappedSol: false,
    //         currency: { symbol: 'Token', decimals: 0, namespace: 'spl-token' }
    //     },
    //     token: {
    //         model: 'token',
    //         address: Pda [PublicKey(A92UTabEMazxxM9jxjP3gNTwWAQ4U5qj2ngWxeRpc5F7)] {
    //         _bn: <BN: 87c77eabcff47f90ae823858615cf0b93ce4c085feca478f7114cc65ca2b4fea>,
    //         bump: 252
    //         },
    //         isAssociatedToken: true,
    //         mintAddress: PublicKey [PublicKey(FfCkkTgDbQRTc7mBn7zc8mUaUmFeW7KyUBQhu5T4MJsy)] {
    //         _bn: <BN: d9ccfa7494ebf0ddc3dff33122a42e0fbf3d509a57abfe5a3f4a0e9ece4ea880>
    //         },
    //         ownerAddress: PublicKey [PublicKey(e8YdVwLZzG16BJaAHaMxZHMZRzefdNMMzDMj5F1q4QW)] {
    //         _bn: <BN: 983057f183ef7d24edba7269d3c5801ba76b0b95b7be0c2a08304351397e4ff>
    //         },
    //         amount: { basisPoints: <BN: 1>, currency: [Object] },
    //         closeAuthorityAddress: null,
    //         delegateAddress: null,
    //         delegateAmount: { basisPoints: <BN: 0>, currency: [Object] },
    //         state: 1
    //     },
    //     edition: {
    //         model: 'nftEdition',
    //         isOriginal: true,
    //         address: Pda [PublicKey(5fT1KeZ28XzxLiQBPAhCCCntsDM1otHPPpjCnEcVrKgh)] {
    //         _bn: <BN: 454839174c2c58db10de08f4077d0964b1c81c06887ed0414dc7ba7663549e8e>,
    //         bump: 250
    //         },
    //         supply: <BN: 0>,
    //         maxSupply: <BN: 0>
    //     }
    // }
}

main()