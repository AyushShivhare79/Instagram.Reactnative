import { RootStackParamList } from '@/App';
import FastImage from '@d11/react-native-fast-image';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Alert, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { COLORS } from '../../theme/color/color';
import CustomButton from '../../components/CustomButton';
import { uploadToCloudinary } from '../../lib/cloudnary';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../hooks/redux';
import { Toast } from '../../utils/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';

type UploadProps = NativeStackScreenProps<RootStackParamList, 'Upload'>;

export default function Upload({ navigation }: UploadProps) {
  const [caption, setCaption] = useState('');

  const route = useRoute<RouteProp<RootStackParamList>>();
  const uri = route.params?.url;

  const user = useAppSelector(state => state.user.items);

  const handleUpload = async () => {
    if (caption.length <= 0)
      return Toast.error({ title: 'Please enter caption!' });

    try {
      const response = await uploadToCloudinary(uri as string);

      if (!response) {
        Alert.alert('Image upload sucessful!');
      }

      const uploadResonse = await firestore().collection('posts').add({
        userId: user?.uid,
        image: response,
        caption: caption,
        createdAt: new Date(),
      });

      Toast.success({
        title: 'Image uploaded!',
      });

      return navigation.goBack();
    } catch (error) {
      console.error(error);

      return Toast.error({
        title: 'Something went wrong!',
      });
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
          onChangeText={setCaption}
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
