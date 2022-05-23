// @ts-nocheck
const { log } = console;

const consoleAllKeys = (keys: {}) => {
  const {
    adminKeypair,
    userKeypair,
    provider,
    programKeypair,
    counterPubkey,
    settingsPubkey,
  } = keys;

  adminKeypair && log('admin --->', adminKeypair.publicKey.toBase58());
  userKeypair && log('user --->', userKeypair.publicKey.toBase58());
  provider && log('phantom --->', provider.publicKey.toBase58());
  programKeypair && log('program --->', programKeypair.publicKey.toBase58());
  counterPubkey && log('counter --->', counterPubkey.toBase58());
  settingsPubkey && log('settings --->', settingsPubkey[0].toBase58());
};

export default consoleAllKeys;
