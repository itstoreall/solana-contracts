// @ts-nocheck
import { PublicKey } from '@solana/web3.js';
import getOrCreateAssociatedTokenAccount from './getOrCreateAssociatedTokenAccount.ts';
import createKeypair from './createKeypair.ts';
import programPrivatKey from './devnet/program.json';
import alicePrivatKey from './devnet/alice.json';
import bobPrivatKey from './devnet/bob.json';
import carolPrivatKey from './devnet/carol.json';

const init = async (connect: {}) => {
  const mint = new PublicKey('D77WLoiZxiFyN8kuzHfGxTjgf6HZ7HPXysK1ZQbK3iK7');

  const programKeypair = createKeypair(programPrivatKey);
  const aliceKeypair = createKeypair(alicePrivatKey);
  const bobKeypair = createKeypair(bobPrivatKey);
  const carolKeypair = createKeypair(carolPrivatKey);

  const aliceTokenPubkey = await getOrCreateAssociatedTokenAccount(
    connect,
    mint,
    aliceKeypair
  );
  const bobTokenPubkey = await getOrCreateAssociatedTokenAccount(
    connect,
    mint,
    bobKeypair
  );
  const carolTokenPubkey = await getOrCreateAssociatedTokenAccount(
    connect,
    mint,
    carolKeypair
  );

  // console.log('programKeypair -->', programKeypair.publicKey.toBase58());
  // console.log('aliceKeypair -->', aliceKeypair.publicKey.toBase58());
  // console.log('bobKeypair -->', bobKeypair.publicKey.toBase58());
  // console.log('carolKeypair -->', carolKeypair.publicKey.toBase58());

  // console.log('aliceTokenPubkey -->', aliceTokenPubkey.toBase58());
  // console.log('bobTokenPubkey -->', bobTokenPubkey.toBase58());
  // console.log('carolTokenPubkey -->', carolTokenPubkey.toBase58());

  return {
    keys: {
      programKeypair,
      aliceKeypair,
      bobKeypair,
      carolKeypair,
    },
    accs: {
      aliceTokenPubkey,
      bobTokenPubkey,
      carolTokenPubkey,
    },
  };
};

export default init;
