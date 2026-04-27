import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './reels.styles';

export default function Reels() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Coming soon</Text>
    </SafeAreaView>
  );
}
