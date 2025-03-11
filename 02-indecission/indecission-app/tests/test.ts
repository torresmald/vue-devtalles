export function sum(a: number, b: number): number {
  return a + b;
}

export function sumArray(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

export function sumArray2(arr: number[]): string {
  const expression = arr.reduce((acc, curr) => acc + curr, 0);
  return expression.toString();
}
