// @ts-nocheck
import {
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import BN from 'bn.js';
import readCounterAccount from './readCounterAccount.ts';
import { encodeCounter, encodeIncIx } from './serialization.ts';
// import delay from './delay.ts';
import { COUNTER_SEED } from './constants';

const createCounterAndInc = async (keys: {}, connection: {}) => {
  const { userKeypair, programKeypair, counterPubkey, settingsPubkey } = keys;

  const counterAccount = await readCounterAccount(keys, connection);

  console.log('counterAccount -->', counterAccount);

  if (counterAccount?.counter > 0) {
    console.log('The account already exists --->', counterAccount?.counter);
    return 'acc already exists';
  }

  const data = encodeCounter(0, new BN(0));
  const lamports = await connection.getMinimumBalanceForRentExemption(
    data.length
  );

  const createAccountIx = SystemProgram.createAccountWithSeed({
    fromPubkey: userKeypair.publicKey, // the address who will sent rent lamports
    basePubkey: userKeypair.publicKey, // user publicKey
    seed: COUNTER_SEED, // "counter"
    newAccountPubkey: counterPubkey,
    space: data.length,
    lamports: lamports,
    programId: programKeypair.publicKey,
  });

  const incIx = new TransactionInstruction({
    programId: programKeypair.publicKey,
    keys: [
      {
        pubkey: userKeypair.publicKey,
        isSigner: true,
        isWritable: false,
      },
      { pubkey: counterPubkey, isSigner: false, isWritable: true },
      { pubkey: settingsPubkey[0], isSigner: false, isWritable: false },
    ],
    data: encodeIncIx(),
  });

  const tx = new Transaction().add(createAccountIx, incIx);
  const hash = await connection.sendTransaction(tx, [userKeypair]);

  console.log('create counter and inc tx', hash);

  return hash;
};

export default createCounterAndInc;

/*
await delay(3000)
*/
