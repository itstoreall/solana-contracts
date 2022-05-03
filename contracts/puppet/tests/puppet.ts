// @ts-nocheck
import assert from 'assert';
import * as anchor from '@project-serum/anchor';
const { SystemProgram } = anchor.web3;

describe('Puppet test:', () => {
  // const provider = anchor.AnchorProvider.local();

  // Configure the client to use the local cluster.
  // anchor.setProvider(provider);

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  it('Performs CPI from puppet master to puppet', async () => {
    const puppetMaster = anchor.workspace.PuppetMaster;
    const puppet = anchor.workspace.Puppet;

    const newPuppetAccount = anchor.web3.Keypair.generate();

    await puppet.rpc.initialize({
      accounts: {
        puppet: newPuppetAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [newPuppetAccount],
    });

    console.log(111);

    // Invoke the puppet master to perform a CPI to the puppet.
    await puppetMaster.rpc.pullStrings(new anchor.BN(111), {
      accounts: {
        puppet: newPuppetAccount.publicKey,
        puppetProgram: puppet.programId,
      },
    });

    console.log(222);

    const puppetAccount = await puppet.account.data.fetch(
      newPuppetAccount.publicKey
    );

    console.log('puppetAccount --->', puppetAccount.data.toString());

    assert.ok(puppetAccount.data.eq(new anchor.BN(111)));
  });
});
