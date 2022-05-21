// @ts-nocheck
import { PublicKey } from '@solana/web3.js';
import createKeypair from './createKeypair.ts';
import abminPrivatKey from './devnet/admin.json';
import userPrivatKey from './devnet/user.json';
import programPrivatKey from './devnet/program.json';
import { COUNTER_SEED, SETTINGS_SEED } from './constants';
import nacl from 'tweetnacl';

const adminKeypair = createKeypair(abminPrivatKey);
const userKeypair = createKeypair(userPrivatKey);
const programKeypair = createKeypair(programPrivatKey);
let counterPubkey = new PublicKey(0);
let settingsPubkey = new PublicKey(0);

const init = async (connection: {}, wallet: {}) => {
  // const isPhantomInstalled = window.solana && window.solana.isPhantom;

  // console.log('isPhantomInstalled -->', isPhantomInstalled);
  // console.log('wallet -->', wallet.publicKey);

  counterPubkey = await PublicKey.createWithSeed(
    userKeypair.publicKey,
    COUNTER_SEED, // "counter"
    programKeypair.publicKey
  );

  settingsPubkey = await PublicKey.findProgramAddress(
    [Buffer.from(SETTINGS_SEED, 'utf-8')], // "settings"
    programKeypair.publicKey
  );

  // console.log('userKeypair 1 --->', userKeypair.publicKey._bn.words);
  // console.log('wallet --->', wallet.publicKey._bn.words);
  // userKeypair.publicKey._bn.words = wallet.publicKey._bn.words;
  // const e = userKeypair.publicKey._bn.words.splice(1, 2);
  // console.log('userKeypair 2 --->', e);

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
