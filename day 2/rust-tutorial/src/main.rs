use std::io;

fn main() {
    let x = 4;
    println!("x is: {}", x);

    {
        let x = 2;
        println!("x inside interior scope is: {}", x + 1);
    }

    let x = x + 1;
    println!("x is: {}", x);

    const SECONDS_IN_MINUTE: u32 = 60;
    println!("seconds in a minute: {}", SECONDS_IN_MINUTE);

    // Scalar Data Types
    let integer: i32 = 2;
    println!("integer is: {}", integer);

    let unsigned_integer: u32 = 792;
    println!("unsigned integer is: {}", unsigned_integer);

    let floating_point: f32 = 10.9;
    println!("floating point is: {}", floating_point);

    let true_or_false: bool = true;
    println!("boolean is: {}", true_or_false);

    // Dynamic 
    let mut tup: (i32, bool, char) = (1, true, 's');
    println!("tuples are: {} {} {}", tup.0, tup.1, tup.2);

    tup = (2, false, 'b');
	println!("tuples are: {} {} {}", tup.0, tup.1, tup.2);

	let mut arr: [i32; 5] = [1, 2, 3, 4, 5];
	println!("arrays are: {} {} {} {} {}", arr[0], arr[1], arr[2], arr[3], arr[4]);

    arr = [6, 7, 8, 9, 10];
    println!("arrays are: {} {} {} {} {}", arr[0], arr[1], arr[2], arr[3], arr[4]);

    // USER INPUT
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("failed to read line");
    println!("input is: {}", input);

    // Arithmetic
    let x: i32 = 12; // 0 - 255
    let y: i32 = 34; // 
    let z = x + y;
    println!("sum is: {}", z);

    let x: i32 = 12; // 0 - 255
    let y: i32 = 34; // 
    let z = x - y;
    println!("difference is: {}", z);

    let x: f64 = 255.0; // 0 - 255
    let y: f64 = 10.0; // 
    let z = x * y;
    println!("product is: {}", z);

    let x: f64 = 255.0; // 0 - 255
    let y: f64 = 10.0; // 
    let z = x / y;
    println!("division is: {}", z);

    // Mod Operator
    let x: f64 = 255.0; // 0 - 255
    let y: f64 = 10.0; // 
    let z = x % y;
    println!("modulus is: {}", z);    

    // Type Casting and Conversion
    let x = 255.10f32; // 0 - 255
    let y = 10.10f32; // 
    let z = x % y;
    println!("type casted is: {}", z);    

    let x = 155 as i64; // 0 - 255
    let y = 10_i32; // 
    let z = x % (y as i64);
    println!("type casted is: {}", z);  

    let x = (i32::MAX as i64) + 1; // 0 - 255
    let y = 10_i32; // 
    let z = x as i32 / y;
    println!("type casted is: {}", z);  
    // the error here was not catched by the compiler
    // better to convert type from small to large than large to small

    // User Input with Arithmetic
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("failed to read line");
    let int_input: i64 = input.trim().parse().unwrap();
    println!("input sum is: {}", int_input + 2);  

    // Conditions
    let cond = 2 <= 3;
    println!("condition is: {}", cond);  

    // Compound Conditions
    let and = cond && false;
    let or = false || cond;
    let not = !(true && cond);
    println!("compound conditions: {} {} {}", and, or, not);

    // Conditional Flow
    let food = "cookiers";
    if food == "cookie" {
        println!("cookie is true");
    } else if food == "cookies" {
        println!("cookie is false");
    } else {
        println!("cookie is nah");
    }

    // Functions
    test();
    add_numbers(20, 30);

    // Expression
    let number = {
        let x = 3;
        x + 1
    };
    println!("expression: {}", number);

    let result = subtract_numbers(50, 30);
    println!("returned value from subtraction: {}", result);

    let result = multiply_numbers(50, 30);
    println!("returned value from multiplication: {}", result);

    let result = divide_numbers(100, 20);
    println!("returned value from division: {}", result);
}

fn test() {
    println!("calling from main function");
}

fn add_numbers(x: i32, y: i32) {
    println!("the sum is {}", x + y);
}

fn subtract_numbers(x: i32, y: i32) -> i32 {
    x - y
}

fn multiply_numbers(x: i32, y: i32) -> i32 {
    return x * y;
}

fn divide_numbers(x: i32, y: i32) -> i32 {
    let result = x / y;
    if result == 10 {
        return result - 10;
    }
    result
}