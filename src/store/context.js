import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [balance, setBalance] = useState(120);
  const [inventoryArticles, setInventoryArticles] = useState([]);

  const saveArticle = async (inventory, rooster) => {
    const unlockArticle = inventory.map(art => {
      if (art.id === rooster.id) {
        return {
          ...art,
          locked: false,
        };
      }
      return art;
    });

    try {
      await AsyncStorage.setItem('articles', JSON.stringify(unlockArticle));
      setInventoryArticles(unlockArticle);
    } catch (error) {
      console.error('Error ', error);
    }
  };

  const getArticles = async () => {
    try {
      const storedData = await AsyncStorage.getItem('articles');
      if (storedData) {
        setInventoryArticles(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const value = {
    balance,
    setBalance,
    inventoryArticles,
    setInventoryArticles,
    saveArticle,
    getArticles,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
