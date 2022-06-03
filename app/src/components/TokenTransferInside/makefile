.PHONY: devnet client

init:
	solana airdrop 2 3ZW4m4DMwhUbP2X5Cyz37wuQQy1ZJeik2HcCfw58RBjB -u devnet
	solana airdrop 2 JBapzqRzxJWV53xke7spq26zn5hfzu7MvPeSe6mjotBE -u devnet
	solana airdrop 2 3H9PuF7JS7p1WV9CVTJTsvKD1QNbBGMdwP8MEjEZbfuN -u devnet

token-acc:
	spl-token create-account D77WLoiZxiFyN8kuzHfGxTjgf6HZ7HPXysK1ZQbK3iK7 --owner devnet/cap.json
	spl-token create-account D77WLoiZxiFyN8kuzHfGxTjgf6HZ7HPXysK1ZQbK3iK7 --owner devnet/ronny.json

state:
	spl-token account-info --address 6NFgmuLYmGWRx8GAq5KQL8GDCdSFELqVUTMS8sQwnsQ9 # YSSC
	spl-token account-info --address FWYSDWhWNUd98mbASWgDRjBgjrhux8kgu37WWDkADFkL # cap
	spl-token account-info --address GhysaXVxNUPLFReuSpXFCR59hMxMV7xs9KwYPBkDkKmr # ronny
	spl-token account-info --address 3go971uFf2CFVkkX9PcLoMXZ3nmnaJfrZcFz14uHCQP9 # helga

mint:
	spl-token mint D77WLoiZxiFyN8kuzHfGxTjgf6HZ7HPXysK1ZQbK3iK7 1000 FWYSDWhWNUd98mbASWgDRjBgjrhux8kgu37WWDkADFkL # mint to cap 1000 SPL

# localnet-validator:
# 	solana-test-validator -r --ledger localnet/ledger

# localnet-init:
# 	solana airdrop 1 CD6To88A4KrApbnDUkHrwpjMY5ufgPpVQzm9rRX5d3ro -ul
# 	solana airdrop 1 CD6To88A4KrApbnDUkHrwpjMY5ufgPpVQzm9rRX5d3ro -ul
# 	solana airdrop 1 2EheLY8aWQcKPsSXpTs7teiwtBume8gLRaFQzB4HHxJP -ul
# 	spl-token create-token localnet/token.json --fee-payer localnet/alice.json -ul
# 	spl-token create-account CZyEKArwVYSKkv9im3grGNXmggbPfS8YGUovBnzoKQ4s --owner localnet/alice.json -ul
# 	spl-token create-account CZyEKArwVYSKkv9im3grGNXmggbPfS8YGUovBnzoKQ4s --owner localnet/bob.json -ul
# 	spl-token mint CZyEKArwVYSKkv9im3grGNXmggbPfS8YGUovBnzoKQ4s 300 G6GTsFAnYP1PaNc1g36SF4iuEiosfTZZCWWdnCNxxA8d -ul # mint to alice 300 SPL

# state:
# 	spl-token account-info --address G6GTsFAnYP1PaNc1g36SF4iuEiosfTZZCWWdnCNxxA8d -ul # alice
# 	spl-token account-info --address 82SyqQyffa3yeUbuCfcfrHGg3LjdKr919aUqVT7uXkez -ul # bob
# 	spl-token account-info --address Eau9odNYvqtAFmAVJx2wcH358gd4PAeshF1X8VEyMHWb -ul # carol

# client:
# 	cd client && npm install && ./node_modules/.bin/ts-node main.ts