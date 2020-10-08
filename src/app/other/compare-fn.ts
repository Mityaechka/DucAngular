import { resolvePath } from './resolve-fn';

export function comparer(path: string) {
  return (obj1: any, obj2: any) => {

    const value1 = resolvePath(path, obj1);
    const value2 = resolvePath(path, obj2);
    return value1 === value2;
  };
}
