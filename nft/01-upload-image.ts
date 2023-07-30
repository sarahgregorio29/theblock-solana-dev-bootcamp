import fs from 'fs'
import { toMetaplexFile } from '@metaplex-foundation/js'
import { createMetaplexInstance } from './metaplex'

const buffer = fs.readFileSync(__dirname + '/ichiro.png')
const file = toMetaplexFile(buffer, "image.png")
const metaplex = createMetaplexInstance()

async function main() {
    const imageUrl = await metaplex.storage().upload(file)
    console.log('imageUrl', imageUrl)
}

main()
