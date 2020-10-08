export function resolvePath(path, obj) {
  if(!path){
    return obj;
  }
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj || self);
}
