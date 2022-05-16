/*

Program: 
EHvBKz9G6dKfwoWBeuQoEbpHHDyC9yRE1gWWopSga9XJ

cargo new program-transfer

keypair:
mkdir solana-wallet
solana-keygen new --outfile solana-wallet/keypair.json
solana-keygen new --outfile solana-wallet/alice-keypair.json
solana-keygen new --outfile solana-wallet/bob-keypair.json
solana address -k solana-wallet/keypair.json

acc:
*
pubkey: 6UkHjf7XiyjUek4d71hYsaUwpiRweQNaunjNoavKXgnY [164,161,165
======================================================================
actor place room hat speak want flame beyond scatter crawl please open
*

alice:
*
pubkey: BZzRRr8q47uD9EHXeMvanbxQvK4L1oxcC3MmecEs81uK [108, 201, 88
======================================================================
divert text park talk elder team absent gold note ritual antenna magic
*

bob:
*
pubkey: 3AkioYivUJadiKqvSuevm5PTRZY6NeztddP83BWNJcfT [101, 62, 188
===============================================================================
employ federal case tiger obvious memory shop fiction flash clown since exclude
*

solana airdrop 1 $(solana-keygen pubkey solana-wallet/keypair.json)

solana account $(solana-keygen pubkey solana-wallet/keypair.json)

*
Public Key: 6UkHjf7XiyjUek4d71hYsaUwpiRweQNaunjNoavKXgnY
Balance: 3 SOL
Owner: 11111111111111111111111111111111
Executable: false
Rent Epoch: 307
*

cargo build-bpf --manifest-path=program/Cargo.toml --bpf-out-dir=dist/solana/program

*
$ solana program deploy 
  /Users/serhiistanislav/Rust/solana-contracts/contracts/program-transfer/dist/solana/program/program_transfer.so
The program address will default to this keypair (override with --program-id):
  /Users/serhiistanislav/Rust/solana-contracts/contracts/program-transfer/dist/solana/program/program_transfer-keypair.json
*

solana deploy -v --keypair solana-wallet/keypair.json dist/solana/program/program_transfer.so

*
RPC URL: https://api.devnet.solana.com
Default Signer Path: solana-wallet/keypair.json
Commitment: confirmed
Program Id: EHvBKz9G6dKfwoWBeuQoEbpHHDyC9yRE1gWWopSga9XJ
*

*/
