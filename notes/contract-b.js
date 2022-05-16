/*

comands:

validator:
solana config get
solana config set --url https://api.devnet.solana.com
solana-test-validator

keypair:
mkdir solana-wallet
solana-keygen new --outfile solana-wallet/keypair.json
solana airdrop 1 $(solana-keygen pubkey solana-wallet/keypair.json)
solana account $(solana-keygen pubkey solana-wallet/keypair.json)

build:
cargo build-bpf --manifest-path=Cargo.toml --bpf-out-dir=dist/solana/program

deploy:
solana deploy -v --keypair solana-wallet/keypair.json dist/solana/program/contract_b.so

pubkey: 3RzayTaeqskZPrww48qeCb1C8Ey6mWNJrSpmK9BrSRh8
================================================================================
perfect output mobile never chef basket march decorate humble judge begin winter

*/
