import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../../store/context';

const Levels = () => {
  const navigation = useNavigation();

  const {levels, setLevels, currentIdx, setCurrentIdx} = useStore();

  const resetGameProgress = () => {
    Alert.alert(
      'Notification',
      'Are you sure want to reset all game progress?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const resetLevels = levels.map(level => {
              return {...level, passed: false, locked: true};
            });
            setLevels(resetLevels);
            setCurrentIdx(0);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const navigateToLevels = level => {
    switch (level) {
      case '1':
        navigation.navigate('Game');
        break;
      case '2':
        navigation.navigate('Lvl2');
        break;
      case '3':
        navigation.navigate('Lvl3');
        break;
      case '4':
        navigation.navigate('Lvl4');
        break;
      case '5':
        navigation.navigate('Lvl5');
        break;
      case '6':
        navigation.navigate('Lvl6');
        break;

      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bg.png')}
        style={{flex: 1}}>
        <ScrollView>
          <View style={{marginHorizontal: 30}}>
            <View style={styles.rulesContainer}>
              <Text style={{...styles.mainText, textAlign: 'center'}}>
                Levels
              </Text>
              <TouchableOpacity
                onPress={() => resetGameProgress()}
                activeOpacity={0.7}
                style={{position: 'absolute', right: 30}}>
                <Image source={require('../../../assets/images/reload.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 30,
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 150,
            }}>
            {levels.map((level, idx) => (
              <TouchableOpacity
                onPress={() => navigateToLevels(level.title)}
                disabled={!level.passed && currentIdx !== idx}
                activeOpacity={0.7}
                key={level.title}
                style={[
                  styles.levelContainer,

                  level.passed
                    ? {backgroundColor: '#87E5FF', borderColor: '#0C6269'}
                    : {backgroundColor: '#AAE3CC', borderColor: '#1E4818'},
                  idx === currentIdx && {
                    backgroundColor: '#F6B1B1',
                    borderColor: '#EC7FAC',
                  },
                ]}>
                <Text
                  style={[
                    styles.levelText,
                    level.passed ? {color: '#0C6269'} : {color: '#1E4818'},
                  ]}>
                  {level.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#439638',
  },
  levelText: {
    fontFamily: 'Chango-Regular',
    fontSize: 69,
    fontWeight: '400',
  },
  levelContainer: {
    width: '48%',
    height: 158,
    backgroundColor: '#AAE3CC',
    borderRadius: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#1E4818',
  },
  mainText: {
    fontFamily: 'Chango-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#272727',
  },
  rulesContainer: {
    backgroundColor: '#FFE88D',
    borderWidth: 5,
    borderColor: '#E9BB67',
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 18,
    borderRadius: 52,
    marginTop: 66,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Levels;
