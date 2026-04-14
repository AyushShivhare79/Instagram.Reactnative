import { RootStackParamList } from '@/App';
import FastImage from '@d11/react-native-fast-image';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Alert, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { COLORS } from '../../theme/color/color';
import CustomButton from '../../components/CustomButton';
import { uploadToCloudinary } from '../../lib/cloudnary';

export default function Upload() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const uri = route.params?.url;

  const handleUpload = async () => {
    const response = await uploadToCloudinary(uri as string);

    if (response) {
      Alert.alert('Image upload sucessful!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.imagePosition}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>

        <TextInput
          style={styles.textInput}
          placeholderTextColor={COLORS.black}
          placeholder="Add a caption..."
        />
      </View>
      <View style={styles.buttonPosition}>
        <CustomButton
          onPress={handleUpload}
          style={styles.buttonStyle}
          title="Share"
        />
      </View>
    </SafeAreaView>
  );
}
