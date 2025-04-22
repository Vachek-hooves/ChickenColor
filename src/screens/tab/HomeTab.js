import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeTab = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={require('../../../assets/images/tab/mainLogo.png')}
            style={styles.image}
          />
          <View style={styles.welcomePartContainer}>
            <Text style={styles.mainText}>Welcome!</Text>
            <Text style={styles.secondaryText}>Best time : 12s</Text>

            <TouchableOpacity
              style={styles.playBtnContainer}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Levels')}>
              <Text style={styles.secondaryText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('HowToPlay')}>
              <Text style={styles.secondaryText}>How to play?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#439638',
    padding: 25,
  },
  mainText: {
    fontFamily: 'Chango-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#272727',
  },
  secondaryText: {
    fontFamily: 'Chango-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#272727',
  },
  image: {width: '100%', marginBottom: 20, marginTop: 30, height: 400},
  welcomePartContainer: {
    backgroundColor: '#FFE88D',
    borderWidth: 5,
    borderColor: '#E9BB67',
    width: '100%',
    paddingVertical: 25,
    borderRadius: 52,
    alignItems: 'center',
    gap: 30,
  },
  playBtnContainer: {
    height: 60,
    width: '50%',
    backgroundColor: '#FDA400',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E9BB67',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeTab;
