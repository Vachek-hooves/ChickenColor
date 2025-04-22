import {createStackNavigator} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import HomeTab from '../../screens/tab/HomeTab';
import HowToPlay from '../../screens/stack/HowToPlay';
import TabNav from '../tab/TabNav';
import Levels from '../../screens/stack/Levels';
import Game from '../../screens/stack/Game';

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="HowToPlay" component={HowToPlay} />
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="Levels" component={Levels} />
    </Stack.Navigator>
  );
};

export default Home;
