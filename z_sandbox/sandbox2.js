const fxn1 = () => {
   return 'dog'
}

// console.log(fxn1)
// console.log(fxn1())

// to reference a funciton (that will be called) you dont need the '()'
// to actually call the function, you need the '()'

const a = [11,22,33,44]
for (const index in a ) {
   console.log(a[index])
}

const b = { aa:11, bb:22, cc:33}
for (const key in b) {
   console.log(key, ':', b[key])
}