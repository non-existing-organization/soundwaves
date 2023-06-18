import { useEffect, useState } from 'react';
import { getItem, setItem, removeItem } from '../utils/localStore';

export function useLocalStorage(key) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const value = await getItem(key);
      setData(value);
    };

    fetchData();
  }, [key]);

  const setKeyItem = async (value) => {
    await setItem(key, value);
    setData(value);
  };

  const removeKeyItem = async () => {
    await removeItem(key);
    setData(null);
  };

  return [data, setKeyItem, removeKeyItem];
}