import * as borsh from '@project-serum/borsh'

export class Record {
    text: string;
    amount: number;

    constructor(text: string, amount: number) {
        this.text = text;
        this.amount = amount;
    }

    borshInstructionSchema = borsh.struct([
        borsh.u16('variant'),
        borsh.str('text'),
        borsh.u16('amount'),
    ])

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000)
        this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer)
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer))
    }
}