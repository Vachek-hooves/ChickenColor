import {createContext, useContext, useState} from 'react';
import {gameLevels} from '../data/levels';
import {roostersShopData} from '../data/roostersShopData';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [balance, setBalance] = useState(0);
  const [inventoryArticles, setInventoryArticles] = useState([]);
  const [inventoryRoosters, setInventoryRoosters] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  const [roostersShop, setRoostersShop] = useState(roostersShopData);
  const [levels, setLevels] = useState(gameLevels);

  const value = {
    balance,
    setBalance,
    inventoryArticles,
    setInventoryArticles,
    levels,
    setLevels,
    currentIdx,
    setCurrentIdx,
    roostersShop,
    setRoostersShop,
    inventoryRoosters,
    setInventoryRoosters,
    bestTime,
    setBestTime,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
