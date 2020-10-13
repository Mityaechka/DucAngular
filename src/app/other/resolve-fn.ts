export function resolvePath(path, obj) {
  if (!path) {
    return obj;
  }
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj || self);
}
export function sumFunction(arr: any[], func: (obj: any) => any) {
  let total = 0;
  arr.forEach((x) => {
    total += func(x);
  });
  return total;
}
