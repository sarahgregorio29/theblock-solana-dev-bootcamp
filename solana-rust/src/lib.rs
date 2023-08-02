use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    solana logs: &[u8]
) -> ProgramResult {
    msg!("{},{},{:?}", program_id, accounts.len(), instruction_data);
    Ok(())
}
entrypoint!(process_instruction);