import { Text } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView>
      <FontAwesome name="plus" color="black" />
      <Text>Instagram</Text>
      <FontAwesome name="heart" color="black" />
    </SafeAreaView>
  );
}
