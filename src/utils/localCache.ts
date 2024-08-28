class LocalCache {
  setCache<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getCache<T>(key: string): T | null {
    //预期外错误捕获
    let value = null;
    try {
      const result = localStorage.getItem(key);
      if (result) {
        value = JSON.parse(result);
      }
    } catch (error) {
      console.error(error);
    }
    return value;
  }
  removeCache(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear(); // 清除所有本地存储数据
  }
}
export default new LocalCache();
