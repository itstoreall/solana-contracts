/*

keypair:
mkdir solana-wallet
solana-keygen new --outfile solana-wallet/keypair.json
solana address -k solana-wallet/keypair.json

acc:
*
pubkey: 2nMUYqTgXVPxuBiFEFYmTbMCnACCVfWybyk8gy4eeUzB
===========================================================================
ordinary target year rare magic rain nation bridge early magic bunker equip
*

solana airdrop 1 $(solana-keygen pubkey solana-wallet/keypair.json)

solana account $(solana-keygen pubkey solana-wallet/keypair.json)

*
Public Key: 2nMUYqTgXVPxuBiFEFYmTbMCnACCVfWybyk8gy4eeUzB
Balance: 3 SOL
Owner: 11111111111111111111111111111111
Executable: false
Rent Epoch: 307
*

cargo test (for state.rs)


*/
