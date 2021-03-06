// @ts-nocheck
import {
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { encodeUpdateSettingsIx } from './serialization.ts';
import { updateSettings as log } from '../../logs/state-program';

const updateCounterSettings = async (
  admin: Uint8Array,
  inc_step: number,
  dec_step: number,
  keys: {},
  connection: {}
) => {
  const { adminKeypair, programKeypair, settingsPubkey } = keys;

  const updateSettingsIx = new TransactionInstruction({
    programId: programKeypair.publicKey,
    keys: [
      {
        pubkey: adminKeypair.publicKey,
        isSigner: true,
        isWritable: true,
      },
      { pubkey: settingsPubkey[0], isSigner: false, isWritable: true },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: encodeUpdateSettingsIx(admin, inc_step, dec_step),
  });

  const tx = new Transaction().add(updateSettingsIx);

  tx.feePayer = adminKeypair.publicKey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  const hash = await connection.sendTransaction(tx, [adminKeypair], {
    preflightCommitment: 'max',
  });

  log.hash(hash);

  return hash;
};

export default updateCounterSettings;

/*
await delay(3000)
*/
