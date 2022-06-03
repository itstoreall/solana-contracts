// @ts-nocheck
import { getAccount } from '@solana/spl-token';

const getBalances = async (connect: {}, keys: {}, accs: {}) => {
  // --- wallets:
  const adminWalletBalance = await connect?.getBalance(
    keys.adminKeypair.publicKey
  );
  const capWalletBalance = await connect?.getBalance(keys.capKeypair.publicKey);
  const ronnyWalletBalance = await connect?.getBalance(
    keys.ronnyKeypair.publicKey
  );
  const helgaWalletBalance = await connect?.getBalance(
    keys.helgaKeypair.publicKey
  );

  // --- accounts:
  const { amount: adminTokenBalance } = await getAccount(
    connect,
    accs.adminTokenPubkey
  );
  const { amount: capTokenBalance } = await getAccount(
    connect,
    accs.capTokenPubkey
  );
  const { amount: ronnyTokenAccInfo } = await getAccount(
    connect,
    accs.ronnyTokenPubkey
  );
  const { amount: helgaTokenAccInfo } = await getAccount(
    connect,
    accs.helgaTokenPubkey
  );

  // console.log('adminWalletBalance -->', adminWalletBalance);
  // console.log('capWalletBalance -->', capWalletBalance);
  // console.log('ronnyWalletBalance -->', ronnyWalletBalance);
  // console.log('helgaWalletBalance -->', helgaWalletBalance);

  // console.log('adminTokenBalance -->', adminTokenBalance.toString());
  // console.log('capTokenBalance -->', capTokenBalance.toString());
  // console.log('ronnyTokenBalance -->', ronnyTokenAccInfo.toString());
  // console.log('helgaTokenBalance -->', helgaTokenAccInfo.toString());

  return {
    wallet: {
      admin: adminWalletBalance,
      cap: capWalletBalance,
      ronny: ronnyWalletBalance,
      helga: helgaWalletBalance,
    },
    token: {
      admin: adminTokenBalance.toString(),
      cap: capTokenBalance.toString(),
      ronny: ronnyTokenAccInfo.toString(),
      helga: helgaTokenAccInfo.toString(),
    },
  };
};

export default getBalances;
