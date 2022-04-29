import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { ContractA } from '../target/types/contract_a';

describe('contract-a', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.ContractA as Program<ContractA>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
