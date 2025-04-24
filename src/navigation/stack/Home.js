import {createStackNavigator} from '@react-navigation/stack';
import HomeTab from '../../screens/tab/HomeTab';
import HowToPlay from '../../screens/stack/HowToPlay';
import TabNav from '../tab/TabNav';
import Levels from '../../screens/stack/Levels';
import Game from '../../screens/stack/Game';
import Lvl2 from '../../screens/lvls/Lvl2';
import Lvl3 from '../../screens/lvls/Lvl3';
import Lvl4 from '../../screens/lvls/Lvl4';
import Lvl5 from '../../screens/lvls/Lvl5';
import Lvl6 from '../../screens/lvls/Lvl6';

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="HowToPlay" component={HowToPlay} />
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="Levels" component={Levels} />
      <Stack.Screen name="Lvl2" component={Lvl2} />
      <Stack.Screen name="Lvl3" component={Lvl3} />
      <Stack.Screen name="Lvl4" component={Lvl4} />
      <Stack.Screen name="Lvl5" component={Lvl5} />
      <Stack.Screen name="Lvl6" component={Lvl6} />
    </Stack.Navigator>
  );
};

export default Home;
