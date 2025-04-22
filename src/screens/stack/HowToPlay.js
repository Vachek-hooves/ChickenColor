import {useNavigation} from '@react-navigation/native';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HowToPlay = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bg.png')}
        style={{flex: 1}}>
        <ScrollView>
          <View style={{marginHorizontal: 30}}>
            <View style={styles.rulesContainer}>
              <Text style={{...styles.mainText, textAlign: 'center'}}>
                How to play?
              </Text>
              <Text style={styles.secondaryText}>Game rules</Text>
              <Text style={styles.secondaryText}>
                1) You need to catch worms that quickly appear from holes
              </Text>
              <Text style={styles.secondaryText}>
                2) Each worm has its own color
              </Text>
              <Text style={styles.secondaryText}>
                3) To win, you need to fill all 3 glasses with worms of the
                corresponding color
              </Text>
              <Text style={styles.secondaryText}>
                4) Avoid bombs, they will break the glasses
              </Text>
              <Text style={styles.secondaryText}>
                5) Enjoy magical tales that you can open in the store
              </Text>
              <Text style={styles.secondaryText}>
                6) You can open new skins for Fowl in the store
              </Text>
              <View style={{alignItems: 'center', gap: 27}}>
                <TouchableOpacity
                  style={styles.playBtnContainer}
                  onPress={() => navigation.navigate('Game')}>
                  <Text style={styles.secondaryText}>Play now</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.secondaryText}>Back home</Text>
                </TouchableOpacity>
              </View>
            </View>
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

  rulesContainer: {
    backgroundColor: '#FFE88D',
    borderWidth: 5,
    borderColor: '#E9BB67',
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 18,
    borderRadius: 52,
    marginTop: 48,
    // alignItems: 'center',
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

export default HowToPlay;
