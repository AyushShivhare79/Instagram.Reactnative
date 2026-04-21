import { COLORS } from '@/theme/color/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
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
