import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useEffect, useState} from 'react';
import {useStore} from '../../store/context';

const InventoryTab = () => {
  const [showSkins, setShowSkins] = useState(false);

  const {
    balance,
    inventoryArticles,
    getArticles,
    roostersShop,
    inventoryRoosters,
  } = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginHorizontal: 25}}>
          <View style={styles.welcomePartContainer}>
            <Text style={styles.mainText}>Inventory</Text>
            <Text style={styles.secondaryText}>Balance : {balance} worms</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '20%',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={() => setShowSkins(!showSkins)}>
            <Text
              style={{
                ...styles.secondaryText,
                color: showSkins ? '#1E4818' : '#fff',
              }}>
              Tales
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSkins(!showSkins)}>
            <Text
              style={{
                ...styles.secondaryText,
                color: showSkins ? '#fff' : '1E4818',
              }}>
              Skins
            </Text>
          </TouchableOpacity>
        </View>

        {showSkins ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 13,
            }}>
            {inventoryRoosters.map(rooster => (
              <View style={styles.roosterCard} key={rooster.title}>
                <Image source={rooster.image} />
                <Text style={styles.secondaryText}>{rooster.title}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.playBtnContainer}>
                  <Text style={styles.secondaryText}>
                    {rooster.equiped && 'Equip'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {inventoryArticles.map(rooster => (
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
                    onPress={() => navigation.navigate('Article', rooster)}
                    activeOpacity={0.7}
                    style={styles.playBtnContainer}>
                    <Text style={styles.secondaryText}>Read (unlocked)</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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

export default InventoryTab;
