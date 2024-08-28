/**
 * 扁平化数组
 * @param array
 * @returns
 */
export function flattenTree(array: any[]) {
  const flatArray: any[] = [];
  const _recursion = (arr: any[]) => {
    for (const it of arr) {
      flatArray.push(it);
      if (it.children) {
        _recursion(it.children);
      }
    }
  };
  _recursion(array);
  return flatArray;
}
