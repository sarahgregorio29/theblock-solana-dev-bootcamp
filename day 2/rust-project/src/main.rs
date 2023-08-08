fn main() {
    println!("Hello, world!");

    // input: any string
    // output: number of consonants

    let characters = "bootcamps";
    let mut y = 0;
    for (_index, value) in characters.chars().enumerate() { if !['a','e','i','o','u'].contains(&value) { y = y + 1; } }
    println!("consonants: {}", y);
}