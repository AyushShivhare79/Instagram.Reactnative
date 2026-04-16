import { COLORS } from '../../../theme/color/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profilePicture: { borderRadius: 999 },
  image: { width: '100%', height: '100%' },
  imageContainer: {
    width: 124,
    backgroundColor: COLORS.paleGrey,
    height: 124,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
