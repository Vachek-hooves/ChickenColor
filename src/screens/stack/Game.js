import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomModal from '../../components/CustomModal';

const Game = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../../../assets/images/gameBg.png')}
      style={{...styles.container, filter: isVisible ? 'blur(4)' : null}}>
      <View style={styles.gameContainer}>
        <Image
          source={require('../../../assets/images/bg.png')}
          style={{width: '100%', borderTopRightRadius: 52}}
        />
      </View>

      <CustomModal visible={isVisible}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 175,
              height: 175,
              backgroundColor: 'rgba(253, 164, 0, 1)',
              borderRadius: 99,
            }}>
            <Image
              source={require('../../../assets/images/modalRooster.png')}
            />
          </View>

          <Text style={styles.mainText}>{'Game Over :('}</Text>
          <Text style={{...styles.secondaryText, marginBottom: 20}}>
            You`ve catched the bomb
          </Text>
        </View>

        <View style={{alignItems: 'center', gap: 13}}>
          <TouchableOpacity
            style={styles.playBtnContainer}
            onPress={() => navigation.navigate('Game')}>
            <Text style={styles.secondaryText}>Try again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.secondaryText}>Back home</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 450,
  },
  mainText: {
    fontFamily: 'Chango-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#272727',
    marginBottom: 15,
    marginTop: 20,
  },
  gameContainer: {
    backgroundColor: 'green',
    height: 600,
    width: '100%',
    bottom: 0,
    position: 'absolute',
    borderTopRightRadius: 52,
    borderTopLeftRadius: 52,
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

export default Game;
