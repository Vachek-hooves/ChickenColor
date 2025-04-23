import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [balance, setBalance] = useState(120);
  const [inventoryArticles, setInventoryArticles] = useState([]);
  const [inventoryRoosters, setInventoryRoosters] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [roostersShop, setRoostersShop] = useState([
    {
      id: 1,
      title: 'Fowl Red',
      quantity: 10,
      image: require('../../assets/images/rosster1.png'),
      equiped: true,
      selected: true,
    },
    {
      id: 2,
      title: 'Fowl Blue',
      quantity: 20,
      image: require('../../assets/images/rooster2.png'),
      equiped: false,
      selected: false,
    },
    {
      id: 3,
      title: 'Fowl Elite',
      quantity: 50,
      image: require('../../assets/images/rooster3.png'),
      equiped: false,
      selected: false,
    },
  ]);
  const [levels, setLevels] = useState([
    {
      title: '1',
      passed: false,
      locked: false,
    },
    {
      title: '2',
      passed: false,
      locked: true,
    },
    {
      title: '3',
      passed: false,
      locked: true,
    },
    {
      title: '4',
      passed: false,
      locked: true,
    },
    {
      title: '5',
      passed: false,
      locked: true,
    },
    {
      title: '6',
      passed: false,
      locked: true,
    },
  ]);

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
    levels,
    setLevels,
    currentIdx,
    setCurrentIdx,
    roostersShop,
    setRoostersShop,
    inventoryRoosters,
    setInventoryRoosters,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
