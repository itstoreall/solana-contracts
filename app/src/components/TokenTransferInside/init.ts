// @ts-nocheck
import { PublicKey } from '@solana/web3.js';
import getOrCreateAssociatedTokenAccount from './getOrCreateAssociatedTokenAccount.ts';
import createKeypair from './createKeypair.ts';
import adminPrivatKey from './devnet/admin.json';
import programPrivatKey from './devnet/program.json';
import capPrivatKey from './devnet/cap.json';
import ronnyPrivatKey from './devnet/ronny.json';
import helgaPrivatKey from './devnet/helga.json';

const init = async (connect: {}) => {
  const mint = new PublicKey('D77WLoiZxiFyN8kuzHfGxTjgf6HZ7HPXysK1ZQbK3iK7');

  const adminKeypair = createKeypair(adminPrivatKey);
  const programKeypair = createKeypair(programPrivatKey);
  const capKeypair = createKeypair(capPrivatKey);
  const ronnyKeypair = createKeypair(ronnyPrivatKey);
  const helgaKeypair = createKeypair(helgaPrivatKey);

  const adminTokenPubkey = await getOrCreateAssociatedTokenAccount(
    connect,
    mint,
    adminKeypair
  );
  const capTokenPubkey = await getOrCreateAssociatedTokenAccount(
    connect,
    mint,
    capKeypair
  );
  const ronnyTokenPubkey = await getOrCreateAssociatedTokenAccount(
    connect,
    mint,
    ronnyKeypair
  );
  const helgaTokenPubkey = await getOrCreateAssociatedTokenAccount(
    connect,
    mint,
    helgaKeypair
  );

  // console.log('programKeypair -->', programKeypair.publicKey.toBase58());
  // console.log('capKeypair -->', capKeypair.publicKey.toBase58());
  // console.log('ronnyKeypair -->', ronnyKeypair.publicKey.toBase58());
  // console.log('helgaKeypair -->', helgaKeypair.publicKey.toBase58());

  // console.log('capTokenPubkey -->', capTokenPubkey.toBase58());
  // console.log('ronnyTokenPubkey -->', ronnyTokenPubkey.toBase58());
  // console.log('helgaTokenPubkey -->', helgaTokenPubkey.toBase58());

  return {
    keys: {
      adminKeypair,
      programKeypair,
      capKeypair,
      ronnyKeypair,
      helgaKeypair,
    },
    accs: {
      adminTokenPubkey,
      capTokenPubkey,
      ronnyTokenPubkey,
      helgaTokenPubkey,
    },
    token: mint,
  };
};

export default init;
