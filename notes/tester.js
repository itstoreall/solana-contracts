/*

solana config set --url https://api.devnet.solana.com

solana-test-validator

cargo new tester

mkdir solana-wallet

solana-keygen new --outfile solana-wallet/keypair.json

*
pubkey: FEypPPiohq4K2jKpk79w34fX4TTfiwfLssbmEgYefH2i
============================================================================
pond focus debris fruit omit obvious glimpse program sign bulk simple laptop
*

solana airdrop 1 $(solana-keygen pubkey solana-wallet/keypair.json)

solana account $(solana-keygen pubkey solana-wallet/keypair.json)

*
Public Key: FEypPPiohq4K2jKpk79w34fX4TTfiwfLssbmEgYefH2i
Balance: 3 SOL
Owner: 11111111111111111111111111111111
Executable: false
Rent Epoch: 307
*

cargo build-bpf --manifest-path=Cargo.toml --bpf-out-dir=dist/solana/program

*
$ solana program deploy /Users/serhiistanislav/Rust/solana-contracts/contracts/tester/dist/solana/program/tester.so
The program address will default to this keypair (override with --program-id):
  /Users/serhiistanislav/Rust/solana-contracts/contracts/tester/dist/solana/program/tester-keypair.json
*

solana deploy -v --keypair solana-wallet/keypair.json dist/solana/program/tester.so

RPC URL: https://api.devnet.solana.com
Default Signer Path: solana-wallet/keypair.json
Commitment: confirmed
Program Id: 2zq5hJ5VY8d3PR9wNkmcCzd3uTRKXUdKLkVdqYbXqzmf

*/
