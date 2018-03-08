(module
 (import "env" "memoryBase" (global $memoryBase i32))
 (global $STACKTOP (mut i32) (i32.const 0))
 (global $STACK_MAX (mut i32) (i32.const 0))
 (export "__post_instantiate" (func $__post_instantiate))
 (export "_fib" (func $_fib))
 (export "runPostSets" (func $runPostSets))
 (func $_fib (; 0 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (set_local $2
   (i32.const 1)
  )
  (loop $while-in
   (block $while-out
    ;;@ ./src/fib.c:1:0
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
     (call $_fib
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
 (func $runPostSets (; 1 ;)
  (nop)
 )
 (func $__post_instantiate (; 2 ;)
  (set_global $STACKTOP
   (get_global $memoryBase)
  )
  (set_global $STACK_MAX
   (i32.add
    (get_global $STACKTOP)
    (i32.const 5242880)
   )
  )
  (call $runPostSets)
 )
)
