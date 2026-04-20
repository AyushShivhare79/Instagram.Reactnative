import { Icons } from '@/assets/Icons';
import FastImage from '@d11/react-native-fast-image';
import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './homeheader.styles';
import { Images } from '@/assets/images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { launchImageLibrary } from 'react-native-image-picker';

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

export default function HomeHeader() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleUpload = async () => {
    const result = await openLibrary();
    const uri = result?.uri;
    if (!uri) return;
    navigation.navigate('Upload', { url: uri });
  };
  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity onPress={handleUpload}>
        <Icons.PlusIcon />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <FastImage
          style={styles.image}
          source={Images.instaLogo}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <Icons.HeartIcon />
    </View>
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
