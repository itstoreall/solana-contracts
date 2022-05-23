// @ts-nocheck
import { connectPhantom as log } from '../../logs/state-program';

const connectPhantom = async () => {
  const getConnectPhantom = async (provider: {}) => {
    try {
      const { publicKey } = await window.solana.connect({
        onlyIfTrusted: true,
      });
      return publicKey && provider;
    } catch (err) {
      log.error(err);
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
