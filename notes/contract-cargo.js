/*

- Cargo

new:
cargo new project_name
cargo build (in target/debug)
./target/debug/project_name
cargo run (build and run)

new bin:
cargo new project_name --bin
cargo build --release (in target/release)

---

update dependencies:
cargo update (updates all dependencies)
cargo update -p rege (updates just “regex”)

---

tests:
cargo test (tests in tests/)
cargo test foo (run any test with foo name)

---

Cargo.toml:

[dependencies]
regex = "1.5.5"
regex = { git = "https://github.com/rust-lang/regex.git" }
regex = { git = "https://github.com/rust-lang/regex.git", rev = "9f9f693" }
spl-token = { version = "3.2", path = "../../token/program", features = [ "no-entrypoint" ] } (spl)

[features]
no-entrypoint = [] (spl)

---

lib.rs

#[cfg(not(feature = "no-entrypoint"))]
mod entrypoint; (spl)

sources:

new:
https://doc.rust-lang.org/cargo/guide/creating-a-new-project.html

test:
https://doc.rust-lang.org/book/ch11-01-writing-tests.html
https://github.com/solana-labs/solana-program-library/blob/master/examples/rust/sysvar/tests/functional.rs

cache:
https://doc.rust-lang.org/cargo/guide/cargo-home.html

solana with rust:
https://docs.solana.com/developing/on-chain-programs/developing-rust

*/
