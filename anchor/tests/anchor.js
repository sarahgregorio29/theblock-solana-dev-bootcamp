const anchor = require('@coral-xyz/anchor');
const { assert } = require('chai');
const {SystemProgram} = anchor.web3

describe('add_record', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.add_record;
  const AddRecord = anchor.web3.Keypair.generate();
  it('Is initialized!', async () => {
    const num = new anchor.BN(2)
    
    await program.rpc.add_record('Groceries',50,{
      accounts:{
        record:AddRecord.publicKey,
        user:provider.wallet.publicKey,
        system_program:SystemProgram.programId
      },
     signers:[AddRecord]
    })

    const account = await program.account.AddRecord.fetch(AddRecord.publicKey) //get the accounts info from this fetch
    // const tx = await program.rpc.initialize(); 
    // console.log("Your transaction signature", tx);
    assert.ok(account.author === AddRecord.publicKey);
    assert.ok(account.text==='Groceries');
    assert.ok(account.amount===50);
    console.log(authority);
  });
});