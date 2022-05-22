// @ts-nocheck
import {
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import BN from 'bn.js';
import readCounterAccountWithPhantom from './readCounterAccount.Phantom.ts';
import { encodeCounter, encodeIncIx } from './serialization.ts';
// import delay from './delay.ts';
import { COUNTER_SEED } from './constants';

const createCounterAndIncWithPhantom = async (
  keys: {},
  connection: {},
  provider: {}
) => {
  const { programKeypair, counterPubkey, settingsPubkey } = keys;

  const counterAccount = await readCounterAccountWithPhantom(keys, connection);

  console.log('counterAccount -->', counterAccount);

  if (counterAccount?.counter > 0) {
    console.log(
      `The account already exists: ${keys.counterPubkey
        .toString()
        .slice(0, 15)}...`
    );
    return `acc already exists`;
  }

  const data = encodeCounter(0, new BN(0));
  const lamports = await connection.getMinimumBalanceForRentExemption(
    data.length
  );

  console.log('provider -->', provider.publicKey);

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

  const hash = sendTransaction();
  hash.then(data => console.log('create counter hash:', data));

  return hash;
  // console.log('data -->', data);
  // console.log('lamports -->', lamports);

  // const createAccountIx = SystemProgram.createAccountWithSeed({
  //   fromPubkey: provider._publicKey, // the address who will sent rent lamports
  //   basePubkey: provider._publicKey, // user publicKey
  //   seed: COUNTER_SEED, // "counter"
  //   newAccountPubkey: counterPubkey,
  //   space: data.length,
  //   lamports: lamports,
  //   programId: programKeypair.publicKey,
  // });

  // console.log('createAccountIx -->', createAccountIx);

  // const incIx = new TransactionInstruction({
  //   programId: programKeypair.publicKey,
  //   keys: [
  //     {
  //       pubkey: provider._publicKey,
  //       isSigner: true,
  //       isWritable: false,
  //     },
  //     { pubkey: counterPubkey, isSigner: false, isWritable: true },
  //     { pubkey: settingsPubkey[0], isSigner: false, isWritable: false },
  //   ],
  //   data: encodeIncIx(),
  // });

  // console.log('incIx -->', incIx);

  // const tx = new Transaction().add(createAccountIx, incIx);

  // console.log('tx -->', tx);

  // const hash = await connection.sendTransaction(tx);

  // console.log('create counter and inc tx', hash);

  // return hash;
};

export default createCounterAndIncWithPhantom;

/*
await delay(3000)
*/
