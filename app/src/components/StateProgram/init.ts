// @ts-nocheck
import { PublicKey } from '@solana/web3.js';
import createKeypair from './createKeypair.ts';
import abminPrivatKey from './devnet/admin.json';
import userPrivatKey from './devnet/user.json';
import programPrivatKey from './devnet/program.json';
import { COUNTER_SEED, SETTINGS_SEED } from './constants';

const adminKeypair = createKeypair(abminPrivatKey);
const userKeypair = createKeypair(userPrivatKey);
const programKeypair = createKeypair(programPrivatKey);
let counterPubkey = new PublicKey(0);
let settingsPubkey = new PublicKey(0);

const init = async (connection: {}) => {
  counterPubkey = await PublicKey.createWithSeed(
    userKeypair.publicKey,
    COUNTER_SEED, // "counter"
    programKeypair.publicKey
  );

  settingsPubkey = await PublicKey.findProgramAddress(
    [Buffer.from(SETTINGS_SEED, 'utf-8')], // "settings"
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
