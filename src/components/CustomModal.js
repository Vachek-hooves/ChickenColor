import {useState} from 'react';
import {Modal, View} from 'react-native';

const CustomModal = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);

  return (
    <Modal transparent visible={showModal} statusBarTranslucent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',

          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '85%',
            backgroundColor: '#FFE88D',
            borderWidth: 5,
            borderColor: '#E9BB67',
            paddingHorizontal: 5,
            paddingVertical: 28,
            borderRadius: 52,
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
