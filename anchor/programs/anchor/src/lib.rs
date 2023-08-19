use anchor_lang::prelude::*;

declare_id!("EozGe4eZCQE3gTuJwUT8ufM4e7EAVc4VSnjP2nHax7om");

#[program]
pub mod record_program {
    use super::*;
    
    pub fn add_record(ctx: Context<AddRecord>, text: String, amount: u64) -> Result<()> {
        let user_account = &mut ctx.accounts.record;
        user_account.text = text;
        user_account.amount = amount;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct AddRecord<'info> {
    #[account(init, payer=authority, space = 9000 )]
    pub record: Account<'info, Record>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Record {
    pub text: String,
    pub amount: u64,
}