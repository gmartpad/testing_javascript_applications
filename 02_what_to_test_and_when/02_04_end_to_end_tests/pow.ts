// const pow: (a: number, b: number, acc?: number) => any | number = (a: number, b: number, acc = 1) => {
//   if (b === 0) return acc;
//   const nextB = b < 0 ? b + 1 : b - 1;
//   const nextAcc = b < 0 ? acc / a : acc * a;
//   return pow(a, nextB, nextAcc)
// } 

const pow = (a: number, b: number) => {
  let result = 1;
  for (let i = 0; i < Math.abs(b); i++) {
    if (b < 0) result = result / a;
    if (b > 0) result = result * a;
  }
  return result;
}

export default pow