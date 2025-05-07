import {NavigationContainer} from '@react-navigation/native';
import TabNav from './src/navigation/tab/TabNav';
import {StoreProvider} from './src/store/context';
import {useEffect, useState} from 'react';
import Loader from './src/components/Loader';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 4000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>{loader ? <TabNav /> : <Loader />}</StoreProvider>
    </NavigationContainer>
  );
};

export default App;
