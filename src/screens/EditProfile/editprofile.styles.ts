import { COLORS } from '@/theme/color/color';
import { hs, ms, vs } from '@/theme/responsive/responsive';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(10),
    paddingVertical: vs(10),
  },

  input: {
    height: vs(40),
    borderColor: 'gray',
    backgroundColor: COLORS.transparent,
    borderWidth: ms(1),
    paddingHorizontal: hs(8),
    borderRadius: ms(20),
  },

  profilePicture: { borderRadius: ms(999) },

  imageContainer: {
    width: hs(120),
    backgroundColor: COLORS.paleGrey,
    height: vs(120),
    borderRadius: ms(16),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: { width: '100%', height: '100%' },
});
