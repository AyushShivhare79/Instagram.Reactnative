import { COLORS } from '../../../../theme/color/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { padding: 5 },
  image: { width: '100%', height: '100%' },
  imageContainer: {
    width: 124,
    backgroundColor: COLORS.paleGrey,
    height: 124,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
