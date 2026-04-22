import { COLORS } from '@/theme/color/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  error: {
    color: COLORS.error,
  },
  profilePicture: { borderRadius: 999 },
  imageContainer: {
    width: 120,
    backgroundColor: COLORS.paleGrey,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
});
