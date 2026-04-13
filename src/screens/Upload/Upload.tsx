import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function Upload() {
  const [image, setImage] = useState(null);

  const options = {
    mediaType: 'photo',
    quality: 1,
    selectionLimit: 1,
  };

  const openLibrary = async () => {
    try {
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

        setImage(img);
      }
    } catch (err) {
      console.log('Picker Error:', err);
    }
  };

  requestPermission();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      {/* Button */}
      <TouchableOpacity
        onPress={openLibrary}
        style={{
          backgroundColor: 'black',
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white' }}>Pick Image</Text>
      </TouchableOpacity>

      {/* Preview */}
      {image?.uri && (
        <View style={{ marginTop: 20 }}>
          <Image
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

