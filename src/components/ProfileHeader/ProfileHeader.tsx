import auth from '@react-native-firebase/auth';
import { Icons } from '@/assets/Icons';
import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './profileheader.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { openLibrary } from '../HomeHeader/HomeHeader';
import { ICON_SIZE } from '@/screens/Home/HomeTab/Home';

export default function ProfileHeader() {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleUpload = async () => {
    const result = await openLibrary();
    const uri = result?.uri;
    if (!uri) return;
    navigation.navigate('Upload', { url: uri });
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const slider = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={() => handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Text>Hide Modal</Text>
        </Pressable>
      </Modal>
    );
  };

  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity onPress={handleUpload}>
        <Icons.PlusIcon size={ICON_SIZE} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Icons.MenuIcon size={ICON_SIZE} />
      </TouchableOpacity>
      {slider()}
    </View>
  );
}
