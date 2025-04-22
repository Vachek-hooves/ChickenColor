import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Levels = () => {
  const navigation = useNavigation();

  const levels = [
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
  ];

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
            }}>
            {levels.map(level => (
              <View key={level.title} style={styles.levelContainer}>
                <Text style={styles.levelText}>{level.title}</Text>
              </View>
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
    color: '#1E4818',
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
