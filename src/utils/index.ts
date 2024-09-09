import { AppRouteObject } from '@/router/types';

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

/**
 * 菜单过滤
 * @param items 菜单数据
 * @returns
 */
export const menuFilter = (items: AppRouteObject[]) => {
  return items.filter((item) => {
    // 去除子路由首项 {index: true, element: {…}}
    const show = item.meta?.key;
    if (show && item.children) {
      item.children = menuFilter(item.children);
    }
    return show;
  });
};
