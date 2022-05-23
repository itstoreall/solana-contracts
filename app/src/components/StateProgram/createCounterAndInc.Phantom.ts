// @ts-nocheck
import {
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import BN from 'bn.js';
import readCounterAccountWithPhantom from './readCounterAccount.Phantom.ts';
import { encodeCounter, encodeIncIx } from './serialization.ts';
import { COUNTER_SEED } from './constants';
import { createCounter as log } from '../../logs/state-program';
// import delay from './delay.ts';

const createCounterAndIncWithPhantom = async (
  keys: {},
  connection: {},
  provider: {}
) => {
  const { programKeypair, counterPubkey, settingsPubkey } = keys;

  const counterAccount = await readCounterAccountWithPhantom(keys, connection);

  if (counterAccount?.counter > 0) {
    log.exist(keys);
    return `acc already exists`;
  }

  const data = encodeCounter(0, new BN(0));
  const lamports = await connection.getMinimumBalanceForRentExemption(
    data.length
  );

  const createTransaction = async () => {
    if (!provider.publicKey) return;

    let transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: provider.publicKey, // the address who will sent rent lamports
        basePubkey: provider.publicKey, // user publicKey
        seed: COUNTER_SEED, // "counter"
        newAccountPubkey: counterPubkey,
        space: data.length,
        lamports: lamports,
        programId: programKeypair.publicKey,
      }),

      new TransactionInstruction({
        programId: programKeypair.publicKey,
        keys: [
          {
            pubkey: provider.publicKey,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: counterPubkey, isSigner: false, isWritable: true },
          { pubkey: settingsPubkey[0], isSigner: false, isWritable: false },
        ],
        data: encodeIncIx(),
      })
    );

    transaction.feePayer = provider.publicKey;

    const anyTransaction: any = transaction;

    anyTransaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;

    return transaction;
  };

  const sendTransaction = async () => {
    try {
      const transaction = await createTransaction();
      if (!transaction) return;

      let signed = await provider.signTransaction(transaction);
      let signature = await connection.sendRawTransaction(signed.serialize());
      const hash = await connection.confirmTransaction(signature);

      return hash;
    } catch (err) {
      console.warn(err);
    }
  };

  const hash = await sendTransaction();

  log.hash(hash);

  return hash;
};

export default createCounterAndIncWithPhantom;

/*
await delay(3000)
*/
