import {createStackNavigator} from '@react-navigation/stack';

import ShopTab from '../../screens/tab/ShopTab';
import Article from '../../screens/stack/Article';
import InventoryTab from '../../screens/tab/InventoryTab';

const Stack = createStackNavigator();

const Inventory = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="InventoryTab" component={InventoryTab} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
};

export default Inventory;
