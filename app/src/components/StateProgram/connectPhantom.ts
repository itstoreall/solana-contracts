// @ts-nocheck
const connectPhantom = () => {
  const phantomWallet = {
    address: '',
    publicKey: null,
    provider: null,
  };

  const updatePhantomWallet = publicKey => {
    phantomWallet.address = publicKey.toString();
    phantomWallet.publicKey = publicKey;
  };

  const getConnectPhantom = async () => {
    try {
      const { publicKey } = await window.solana.connect({
        onlyIfTrusted: true,
      });
      updatePhantomWallet(publicKey);
    } catch (err) {
      console.log('ERROR in getProvider:', err.message);
      const { publicKey } = await window.solana.connect();
      updatePhantomWallet(publicKey);
    }
  };

  if ('solana' in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      phantomWallet.provider = provider;
      getConnectPhantom();
    }
  }
  // console.log(`Phantom provider: ${window.solana && window.solana.isPhantom}`);
  return phantomWallet;
};

export default connectPhantom;
