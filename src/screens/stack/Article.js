import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Article = ({route}) => {
  const rooster = route.params;

  const onShare = async () => {
    try {
      await Share.share({
        message: rooster.description,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginHorizontal: 25}}>
          <View style={styles.welcomePartContainer}>
            <Text style={styles.mainText}>Reading</Text>
          </View>
        </View>

        <View>
          <View
            key={rooster.title}
            style={{
              marginBottom: 10,
              marginHorizontal: 25,
            }}>
            <Image source={rooster.image} style={styles.image} />
            <View
              style={{
                width: '98%',
                justifyContent: 'center',
              }}>
              <Text style={styles.secondaryText}>{rooster.title}</Text>
              <Text style={styles.defaultText}>{rooster.description}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.playBtnContainer}
                onPress={() => onShare()}>
                <Text style={styles.secondaryText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainText: {
    fontFamily: 'Chango-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#272727',
  },
  defaultText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#272727',
    marginTop: 15,
  },
  secondaryText: {
    fontFamily: 'Chango-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#272727',
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
    marginBottom: 22,
  },
});

export default Article;
