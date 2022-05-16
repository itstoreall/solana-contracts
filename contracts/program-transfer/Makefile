.PHONY: devnet client

# make <command>

devnet_validator:
	solana-test-validator -r --ledger devnet/ledger

devnet_airdrop:
	solana airdrop 1 devnet/program.json -u devnet
	solana airdrop 1 devnet/alice.json -u devnet
	solana airdrop 1 devnet/bob.json -u devnet

devnet_build:
	cd program; cargo build-bpf

devnet_deploy:
	solana program deploy program/target/deploy/program_transfer.so -u devnet --program-id devnet/program.json

# devnet_deploy:
# 	solana deploy -v --keypair solana-wallet/keypair.json dist/solana/program/program_transfer.so

# devnet_deploy:
# 	solana program deploy target/deploy/program_transfer.so -u devnet --program-id devnet/program.json

# devnet_build:
# 	cargo build-bpf --manifest-path=Cargo.toml --bpf-out-dir=dist/program

# testnet-deploy:
# 	cd program; cargo build-bpf
# 	solana program deploy program/target/deploy/program-transfer.so -u devnet --program-id devnet/program.json --keypair devnet/alice.json --upgrade-authority devnet/alice.json

client-cli:
	cd client/cli; ./node_modules/.bin/ts-node main.ts


# client-browser:
# 	cd client/browser; npm start