// @ts-nocheck
const getBalances = async (connect: {}, keys: {}, phantom: {}) => {
  const adminBalance = await connect?.getBalance(keys.adminKeypair.publicKey);
  const userBalance = await connect?.getBalance(keys.userKeypair.publicKey);
  const phantomBalance = await connect?.getBalance(phantom.publicKey);

  keys &&
    console.log(
      'Balance (user):',
      adminBalance,
      `${keys?.userKeypair.publicKey.toBase58().slice(0, 20)}...`
    );

  keys &&
    console.log(
      'Balance (admin):',
      userBalance,
      `${keys?.adminKeypair.publicKey.toBase58().slice(0, 20)}...`
    );

  phantom &&
    console.log(
      'Balance (phantom):',
      phantomBalance,
      `${phantom.address.slice(0, 20)}...`
    );
};

export default getBalances;
