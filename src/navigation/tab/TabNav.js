import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Shop from '../stack/Shop';
import Home from '../stack/Home';
import Inventory from '../stack/Inventory';
import {Image, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('../../../assets/images/tab/shop.png')}
              style={{tintColor: focused ? '#FDA400' : '#439638'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('../../../assets/images/tab/home.png')}
              style={{tintColor: focused ? '#FDA400' : '#439638'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('../../../assets/images/tab/inventory.png')}
              style={{tintColor: focused ? '#FDA400' : '#439638'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 75,
    elevation: 0,
    backgroundColor: '#FFE88D',
    borderRadius: 52,
    borderWidth: 5,
    borderTopWidth: 5,
    borderTopColor: '#E9BB67',
    borderColor: '#E9BB67',
    height: 70,
    marginHorizontal: 33,
    paddingTop: 10,
  },
});

export default TabNav;
