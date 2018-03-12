#[no_mangle]
pub fn fib(x: i32) -> i32 {
  match x {
    0 | 1 => x,
    _     => fib(x - 1) + fib(x - 2),
  }
}
