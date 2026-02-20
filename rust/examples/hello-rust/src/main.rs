use ferris_says::say;
use std::io::{BufWriter, stdout};

fn main() {
    let stdout = stdout();
    let out = b"Hello Rust";
    let width = 24;
    let mut writer = BufWriter::new(stdout.lock());

    say(out, width, &mut writer).unwrap();
}
