// @ts-nocheck
import { Transaction, TransactionInstruction } from '@solana/web3.js';
import { encodeIncIx } from './serialization.ts';
import { incCounter as log } from '../../logs/state-program';

const incCounter = async (keys: {}, connection: {}) => {
  const { userKeypair, programKeypair, counterPubkey, settingsPubkey } = keys;

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

  const tx = new Transaction().add(incIx);
  const hash = await connection.sendTransaction(tx, [userKeypair]);

  log.hash(hash);

  return hash;
};

export default incCounter;
