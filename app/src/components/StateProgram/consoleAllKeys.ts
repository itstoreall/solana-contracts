// @ts-nocheck
const { log } = console;

const consoleAllKeys = (keys: {}) => {
  log('admin --->', keys.adminKeypair.publicKey.toBase58());
  log('user --->', keys.userKeypair.publicKey.toBase58());
  log('program --->', keys.programKeypair.publicKey.toBase58());
  log('counter --->', keys.counterPubkey.toBase58());
  log('settings --->', keys.settingsPubkey[0].toBase58());
};

export default consoleAllKeys;
