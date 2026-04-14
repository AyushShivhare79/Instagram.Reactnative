import { RootStackParamList } from '@/App';
import FastImage from '@d11/react-native-fast-image';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Button, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export default function Upload() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const uri = route.params?.url;

  return (
    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
      
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: uri || 'https://via.placeholder.com/200', // fallback
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <TextInput placeholder="Add a caption..." />
      <Button title="Share" />
    </SafeAreaView>
  );
}
