// @ts-nocheck
import {
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import BN from 'bn.js';
import readCounterAccount from './readCounterAccount.ts';
import { encodeCounter, encodeIncIx } from './serialization.ts';

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const createCounterAndInc = async (keys: {}, connection: {}) => {
  const counterSeed = 'counter';

  const counterAccount = await readCounterAccount(keys, connection);

  if (counterAccount.counter > 0) {
    console.log('The account already exists --->', counterAccount.counter);
    return;
  }

  const data = encodeCounter(0, new BN(0));
  const lamports = await connection.getMinimumBalanceForRentExemption(
    data.length
  );

  const createAccountIx = SystemProgram.createAccountWithSeed({
    fromPubkey: keys.userKeypair.publicKey, // the address who will sent rent lamports
    basePubkey: keys.userKeypair.publicKey, // user publicKey
    seed: counterSeed, // "counter"
    newAccountPubkey: keys.counterPubkey,
    space: data.length,
    lamports: lamports,
    programId: keys.programKeypair.publicKey,
  });

  const incIx = new TransactionInstruction({
    programId: keys.programKeypair.publicKey,
    keys: [
      {
        pubkey: keys.userKeypair.publicKey,
        isSigner: true,
        isWritable: false,
      },
      { pubkey: keys.counterPubkey, isSigner: false, isWritable: true },
      { pubkey: keys.settingsPubkey[0], isSigner: false, isWritable: false },
    ],
    data: encodeIncIx(),
  });

  const tx = new Transaction().add(createAccountIx, incIx);
  const res = await connection.sendTransaction(tx, [keys.userKeypair]);

  console.log('create counter and inc tx', res);

  await delay(3000);
};

export default createCounterAndInc;
