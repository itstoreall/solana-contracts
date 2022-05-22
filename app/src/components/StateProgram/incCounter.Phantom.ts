// @ts-nocheck
import { Transaction, TransactionInstruction } from '@solana/web3.js';
import { encodeIncIx } from './serialization.ts';

const incCounterWithPhantom = async (keys: {}, connection: {}) => {
  const { provider, programKeypair, counterPubkey, settingsPubkey } = keys;

  console.log('provider -->', provider.publicKey);

  const createTransaction = async () => {
    if (!provider.publicKey) return;

    let transaction = new Transaction().add(
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
      await connection.confirmTransaction(signature);

      console.log('signed -->', signed);
      console.log('signature -->', signature);

      return signature;
    } catch (err) {
      console.warn(err);
    }
  };

  const hash = await sendTransaction();

  console.log('inc counter hash -->', hash);

  return hash;
};

export default incCounterWithPhantom;
