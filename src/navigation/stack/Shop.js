import {createStackNavigator} from '@react-navigation/stack';

import ShopTab from '../../screens/tab/ShopTab';
import Article from '../../screens/stack/Article';

const Stack = createStackNavigator();

const Shop = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ShopTab" component={ShopTab} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
};

export default Shop;
