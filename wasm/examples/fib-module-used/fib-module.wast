(module
 (import "env" "__memory_base" (global $__memory_base i32))
 (global $STACKTOP (mut i32) (i32.const 0))
 (global $STACK_MAX (mut i32) (i32.const 0))
 (export "__post_instantiate" (func $__post_instantiate))
 (export "_fib" (func $_fib))
 (func $_fib (; 0 ;) (; has Stack IR ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $1
   (i32.const 1)
  )
  (loop $while-in
   (block $while-out
    ;;@ fib-module.c:5:0
    (br_if $while-out
     (i32.lt_s
      (local.get $0)
      (i32.const 2)
     )
    )
    ;;@ fib-module.c:7:0
    (local.set $2
     (i32.add
      (local.get $0)
      (i32.const -2)
     )
    )
    (local.set $0
     (i32.add
      (local.get $0)
      (i32.const -1)
     )
    )
    (local.set $3
     (call $_fib
      (local.get $0)
     )
    )
    (local.set $0
     (local.get $2)
    )
    (local.set $1
     (i32.add
      (local.get $1)
      (local.get $3)
     )
    )
    (br $while-in)
   )
  )
  ;;@ fib-module.c:5:0
  (local.get $1)
 )
 (func $__post_instantiate (; 1 ;) (; has Stack IR ;)
  (global.set $STACKTOP
   (global.get $__memory_base)
  )
  (global.set $STACK_MAX
   (i32.add
    (global.get $STACKTOP)
    (i32.const 5242880)
   )
  )
 )
)
