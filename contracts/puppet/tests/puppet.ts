// @ts-nocheck
import assert from 'assert';
import * as anchor from '@project-serum/anchor';
const { SystemProgram } = anchor.web3;

describe('Puppet test:', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  it('Performs CPI from puppet master to puppet', async () => {
    const puppet = anchor.workspace.Puppet;
    const puppetMaster = anchor.workspace.PuppetMaster;
    const newPuppetAccount = anchor.web3.Keypair.generate();

    // ---

    // console.log('puppet --->', puppet);
    // console.log('puppetMaster --->', puppetMaster);
    // console.log('newPuppetAccount --->', newPuppetAccount);
    // console.log('puppet.rpc --->', puppet.rpc);
    // console.log('provider.wallet.publicKey --->', provider.wallet.publicKey);
    // console.log('SystemProgram.programId --->', SystemProgram.programId); // PublicKey { _bn: <BN: 0> } ---> 11111111111111111111111111111111

    // ---

    await puppet.rpc.initialize({
      accounts: {
        puppet: newPuppetAccount.publicKey, // +
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [newPuppetAccount],
    });

    console.log(111);

    await puppetMaster.rpc.pullStrings(new anchor.BN(888), {
      accounts: {
        puppet: newPuppetAccount.publicKey, // +
        puppetProgram: puppet.programId,
      },
    });

    console.log(222);

    const puppetAccount = await puppet.account.data.fetch(
      newPuppetAccount.publicKey
    );

    console.log('puppetAccount --->', puppetAccount.data.toString());

    assert.ok(puppetAccount.data.eq(new anchor.BN(888)));
  });
});
