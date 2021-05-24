export function arrayBetween(num1: number, num2: number) {
  const arr: number[] = [];
  for (let i = num1; i < num2; i++) {
    arr.push(i);
  }
  return arr;
}
