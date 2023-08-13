use anchor_lang::prelude::*;

declare_id!("BbqB5v7ukqDquJ1TaDTZfsYtuE51QLJZe76VGdc6xgZC");

#[program]
pub mod record_program {
    use super::*;
    
    pub fn add_record(ctx: Context<AddRecord>, text: String, amount: u64) -> Result<()> {
        let user_account = &mut ctx.accounts.record;
        user_account.author = ctx.accounts.user.key();
        user_account.text = text;
        user_account.amount = amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct AddRecord<'info> {
    #[account(init, payer = user, space = 8 + 4 + 8)]
    pub record: Account<'info, Record>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Record {
    pub author: Pubkey,
    pub text: String,
    pub amount: u64,
}