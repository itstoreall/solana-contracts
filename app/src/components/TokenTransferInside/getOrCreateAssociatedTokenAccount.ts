import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import {
  createAssociatedTokenAccount,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

const getOrCreateAssociatedTokenAccount = async (
  connection: Connection,
  mint: PublicKey,
  wallet: Keypair
): Promise<PublicKey> => {
  const associatedTokenAddress = await getAssociatedTokenAddress(
    mint,
    wallet.publicKey
  );

  if (await connection.getAccountInfo(associatedTokenAddress)) {
    return associatedTokenAddress;
  }

  console.log(
    'create associated token account for',
    wallet.publicKey.toBase58()
  );

  return await createAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    wallet.publicKey
  );
};

export default getOrCreateAssociatedTokenAccount;
