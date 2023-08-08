const anchor = require('@project-serum/anchor');
const { assert } = require('chai');
const {SystemProgram} = anchor.web3

describe('create_post', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.createPost;
  const ExpensesApp = anchor.web3.Keypair.generate();
  it('Is initialized!', async () => {
    const num = new anchor.BN(2)
    
    await program.rpc.create_post(Date.now(),'Groceries',50,false,{
      accounts:{
        ExpensesApp:ExpensesApp.publicKey,
        user:provider.wallet.publicKey,
        systemProgram:SystemProgram.programId
      },
     signers:[ExpensesApp]
    })

    const account = await program.account.ExpensesApp.fetch(ExpensesApp.publicKey) //get the accounts info from this fetch
    // const tx = await program.rpc.initialize(); 
    // console.log("Your transaction signature", tx);
    assert.ok(account.id === Date.now());
    assert.ok(account.text==='Groceries');
    assert.ok(account.amount===50);
    assert.ok(account.deleted === false);
  });
});