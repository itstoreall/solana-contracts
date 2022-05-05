use regex::Regex;

fn main() {
    let re = Regex::new(r"^\d{4}-\d{2}-\d{2}$").unwrap();
    
    println!("Did our date match? {}", re.is_match("2022-01-01"));
    println!("Did our date match? {}", re.is_match("2022-1-1"));
}
