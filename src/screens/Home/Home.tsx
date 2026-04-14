import {
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Images } from '../../assets/images/index';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Icons } from '../../assets/Icons/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';

const openLibrary = async () => {
  try {
    const granted = await requestPermission();

    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) return;

    if (result.errorCode) {
      console.log('Error:', result.errorMessage);
      return;
    }

    if (result.assets?.length) {
      const asset = result.assets[0];

      const img = {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || `photo_${Date.now()}.jpg`,
      };

      return img;
    }
  } catch (err) {
    console.log('Picker Error:', err);
  }
};

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [status, setStatus] = useState(Array(10).fill({}));

  const handleUpload = async () => {
    const result = await openLibrary();
    const uri = result?.uri;
    if (!uri) return;
    navigation.navigate('Upload', { url: uri });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={handleUpload}>
          <Icons.PlusIcon />
        </TouchableOpacity>
        <Text>Instagram</Text>
        <Icons.HeartIcon />
      </View>

      <FlatList
        horizontal={true}
        contentContainerStyle={{ flexDirection: 'row', gap: 10 }}
        data={status}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item: _item }) => (
          <Avatar.Image size={70} source={Images.status} />
        )}
      />
      <Text>Hello</Text>
    </SafeAreaView>
  );
}

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
});
