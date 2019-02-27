// calculation of 1 + 2 is immediate
// x === 3
const x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
const foo = () => 1 + 2;
