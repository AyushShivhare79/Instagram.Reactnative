import { ActivityIndicator, View } from 'react-native';
import { styles } from './loading.styles';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />;
    </View>
  );
}
