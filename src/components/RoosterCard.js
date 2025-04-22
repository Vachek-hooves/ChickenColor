import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {useStore} from '../store/context';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const RoosterCard = ({rooster}) => {
  const {
    balance,
    setBalance,
    inventoryArticles,
    setInventoryArticles,
    saveArticle,
  } = useStore();
  const navigation = useNavigation();
  const [unlock, setUnlock] = useState(false);

  console.log('rooster', rooster);

  const unlockArticle = () => {
    const filtered = inventoryArticles.find(val => val.id === rooster.id);

    if (!filtered) {
      const inventory = [...inventoryArticles, rooster];

      if (balance >= 20) {
        setUnlock(true);
        saveArticle(inventory, rooster);
      }
      if (!unlock) {
        setBalance(balance - 20);
      }
    }
    if (unlock) {
      navigation.navigate('Article', rooster);
    }
  };

  return (
    <View
      key={rooster.title}
      style={{
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 25,
      }}>
      <Image source={rooster.image} style={styles.image} />
      <View
        style={{
          width: '98%',
          height: 110,
          backgroundColor: '#AAE3CC',
          position: 'absolute',
          bottom: 4,
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.secondaryText}>{rooster.title}</Text>
        <TouchableOpacity
          onPress={() => unlockArticle()}
          activeOpacity={0.7}
          style={styles.playBtnContainer}>
          <Text style={styles.secondaryText}>
            {unlock ? 'Read (unlocked)' : 'Unlock for 20 worms'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: 'center',
  },
  roosterCard: {
    backgroundColor: '#AAE3CC',
    width: '43%',
    borderRadius: 52,
    borderWidth: 5,
    borderColor: '#1E4818',
    alignItems: 'center',
    paddingBottom: 27,
  },

  welcomePartContainer: {
    backgroundColor: '#FFE88D',
    borderWidth: 5,
    borderColor: '#E9BB67',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 52,
    marginTop: 66,
    alignItems: 'center',
    marginBottom: 24,
    gap: 6,
  },
  playBtnContainer: {
    height: 60,
    width: '80%',
    backgroundColor: '#FDA400',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#F7D22B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },

  image: {
    width: '100%',
    height: 290,
    borderRadius: 52,
    borderWidth: 5,
    borderColor: '#1E4818',
  },
});

export default RoosterCard;
