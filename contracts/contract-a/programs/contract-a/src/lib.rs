use anchor_lang::prelude::*;
use borsh::{BorshDeserialize, BorshSerialize};
use anchor_lang::solana_program::{
    account_info::{next_account_info, AccountInfo},
    msg,
    pubkey::Pubkey,
};

declare_id!("Bqo8fvsrNRfxm3GPcAFqHCzJe2JQB6m5MFyxdaHwin1Z");

#[program]
pub mod contract_a {
    use super::*;

    pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
    ) -> Result<()> {
        msg!("Hello World Rust program entrypoint");
        msg!("program_id: {}", program_id);
        
        let accounts_iter = &mut accounts.iter();
        let account = next_account_info(accounts_iter)?;

        msg!("account.owner: {}", account.owner);

        if account.owner != program_id {
            msg!("Greeted account does not have the correct program id");
            // return Err(Error::ProgramError(ProgramErrorWithOrigin));
            // return Err(ProgramError::IncorrectProgramId);
        }

        let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
        greeting_account.counter += 1;
        greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

        msg!("Greeted {} time(s)!", greeting_account.counter);

        Ok(())
    }
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    pub counter: u32,
}