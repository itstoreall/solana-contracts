// @ts-nocheck
import { PublicKey } from '@solana/web3.js';
import createKeypair from './createKeypair.ts';
import abminPrivatKey from './devnet/admin.json';
import userPrivatKey from './devnet/user.json';
import programPrivatKey from './devnet/program.json';

const adminKeypair = createKeypair(abminPrivatKey);
const userKeypair = createKeypair(userPrivatKey);
const programKeypair = createKeypair(programPrivatKey);
let counterPubkey = new PublicKey(0);
let settingsPubkey = new PublicKey(0);

const counterSeed = 'counter';
const settingsSeed = 'settings';

const init = async (connection: {}) => {
  counterPubkey = await PublicKey.createWithSeed(
    userKeypair.publicKey,
    counterSeed, // "counter"
    programKeypair.publicKey
  );

  settingsPubkey = await PublicKey.findProgramAddress(
    [Buffer.from(settingsSeed, 'utf-8')], // "settings"
    programKeypair.publicKey
  );

  const res = await connection.getAccountInfo(programKeypair.publicKey);

  !res && console.error('Counter is not deployed. Deploy it first.');

  return {
    adminKeypair,
    userKeypair,
    programKeypair,
    counterPubkey,
    settingsPubkey,
  };
};

export default init;
