// @ts-nocheck
import { Transaction, TransactionInstruction } from '@solana/web3.js';
import { encodeDecIx } from './serialization.ts';
import { decCounter as log } from '../../logs/state-program';

const decCounter = async (keys: {}, connection: {}) => {
  const { userKeypair, programKeypair, counterPubkey, settingsPubkey } = keys;

  const decIx = new TransactionInstruction({
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
    data: encodeDecIx(),
  });

  const tx = new Transaction().add(decIx);
  const hash = await connection.sendTransaction(tx, [userKeypair]);

  log.hash(hash);

  return hash;
};

export default decCounter;
