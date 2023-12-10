export const saveToLocalStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const retriveFromLocalStorage = <T>(key: string): T | null => {
  const dataString = localStorage.getItem(key);
  return dataString ? (JSON.parse(dataString) as T) : null;
};
