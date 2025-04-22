import {NavigationContainer} from '@react-navigation/native';
import TabNav from './src/navigation/tab/TabNav';
import {StoreProvider} from './src/store/context';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <TabNav />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
