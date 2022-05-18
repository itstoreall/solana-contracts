// @ts-nocheck
import {
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { encodeUpdateSettingsIx } from './serialization.ts';

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const updateCounterSettings = async (
  admin: Uint8Array,
  inc_step: number,
  dec_step: number,
  keys: {},
  connection: {}
) => {
  const updateSettingsIx = new TransactionInstruction({
    programId: keys.programKeypair.publicKey,
    keys: [
      {
        pubkey: keys.adminKeypair.publicKey,
        isSigner: true,
        isWritable: true,
      },
      { pubkey: keys.settingsPubkey[0], isSigner: false, isWritable: true },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: encodeUpdateSettingsIx(admin, inc_step, dec_step),
  });

  const tx = new Transaction().add(updateSettingsIx);

  tx.feePayer = keys.adminKeypair.publicKey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  console.log('tx -->', tx);

  // const txHash = await sendAndConfirmTransaction(
  //   connection,
  //   tx,
  //   [keys.adminKeypair]
  //   // {
  //   //   preflightCommitment: 'max',
  //   // }
  // );

  const txHash = await connection.sendTransaction(tx, [keys.adminKeypair], {
    preflightCommitment: 'max',
  });

  console.log('update settings tx', txHash);
  await delay(3000);
};

export default updateCounterSettings;
