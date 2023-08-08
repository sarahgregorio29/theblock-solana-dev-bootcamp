use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("BbqB5v7ukqDquJ1TaDTZfsYtuE51QLJZe76VGdc6xgZC");

#[program]
pub mod anchor {
    use super::*;

    pub fn create_post(ctx: Context<CreatePost>,id:u64,text:String,amount:i64,deleted:bool,) -> ProgramResult {
        let post = &mut ctx.accounts.post_expenses;
        post.id  = id;
        post.text = text;
        post.amount = amount;
        post.deleted = deleted;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreatePost<'info,> { 
    #[account(init,payer=user,space=9000)] 
    pub post_expenses : Account<'info,ExpensesApp>, 
    #[account(mut)]
    pub user:Signer<'info,>, 
    pub system_program: Program<'info, System> 
}

#[account] 
pub struct ExpensesApp{ 
    pub id:u64,
    pub text:String,
    pub amount:i64, 
    pub deleted:bool
}