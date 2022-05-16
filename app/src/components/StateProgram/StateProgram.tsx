// @ts-nocheck
// import { readFileSync } from 'fs';
import {
  Connection,
  // Keypair,
  PublicKey,
  //   SystemProgram,
  //   SYSVAR_RENT_PUBKEY,
  //   Transaction,
  //   TransactionInstruction,
} from '@solana/web3.js';
// import {
//   Counter,
//   decodeCounter,
//   decodeSettings,
//   encodeCounter,
//   encodeDecIx,
//   encodeIncIx,
//   encodeUpdateSettingsIx,
//   Settings,
// } from './serialization';
// import BN from 'bn.js';
import createKeypair from './createKeypair.ts';
import abminPrivatKey from './devnet/admin.json';
import userPrivatKey from './devnet/user.json';
import programPrivatKey from './devnet/program.json';

const StateProgram = () => {
  const counterSeed = 'counter';
  const settingsSeed = 'settings';
  // const delay = (ms: number) => {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // };

  // const readKeypairFromPath = (privatKey: number[]) =>
  //   Keypair.fromSecretKey(new Uint8Array(privatKey));

  const adminKeypair = createKeypair(abminPrivatKey);
  const userKeypair = createKeypair(userPrivatKey);
  const programKeypair = createKeypair(programPrivatKey);
  let counterPubkey = new PublicKey(0);
  let settingsPubkey = new PublicKey(0);

  const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed'
  );

  const init = async () => {
    counterPubkey = await PublicKey.createWithSeed(
      userKeypair.publicKey,
      counterSeed, // "counter"
      programKeypair.publicKey
    );

    settingsPubkey = await PublicKey.findProgramAddress(
      [Buffer.from(settingsSeed, 'utf-8')], // "settings"
      programKeypair.publicKey //
    );

    console.log('counterPubkey --->', counterPubkey);
    console.log('programKeypair.publicKey --->', programKeypair.publicKey);
    console.log('settingsPubkey --->', settingsPubkey);
  };

  init();

  console.log('adminKeypair --->', adminKeypair);
  console.log('userKeypair --->', userKeypair);
  console.log('programKeypair --->', programKeypair);
  console.log('connection --->', connection);
  console.log('counterPubkey --->', counterPubkey);
  console.log('settingsPubkey --->', settingsPubkey);

  return <div>StateProgram</div>;
};

export default StateProgram;
