// @ts-nocheck
const connectPhantom = async () => {
  const getConnectPhantom = async (provider: {}) => {
    try {
      const { publicKey } = await window.solana.connect({
        onlyIfTrusted: true,
      });
      return provider;
    } catch (err) {
      console.log('ERROR in getProvider:', err.message);
      const { publicKey } = await window.solana.connect();
      return publicKey && provider;
    }
  };

  if ('solana' in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return getConnectPhantom(provider);
    }
  }
};

export default connectPhantom;
