(module
 (export "fib" (func $fib))
 (func $fib (; 0 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (set_local $2
   (i32.const 1)
  )
  (loop $while-in
   (block $while-out
    ;;@ fib.c:1:0
    (br_if $while-out
     (i32.lt_s
      (get_local $0)
      (i32.const 2)
     )
    )
    (set_local $1
     (i32.add
      (get_local $0)
      (i32.const -2)
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const -1)
     )
    )
    (set_local $3
     (call $fib
      (get_local $0)
     )
    )
    (set_local $0
     (get_local $1)
    )
    (set_local $2
     (i32.add
      (get_local $3)
      (get_local $2)
     )
    )
    (br $while-in)
   )
  )
  (get_local $2)
 )
)
