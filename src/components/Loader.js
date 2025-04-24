import {Image, View} from 'react-native';

const Loader = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('../../assets/images/loader.png')} />
    </View>
  );
};

export default Loader;
