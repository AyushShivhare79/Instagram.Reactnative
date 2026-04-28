import { COLORS } from '@/theme/color/color';
import { hs, ms, vs } from '@/theme/responsive/responsive';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: ms(5) },

  flatListStyle: { gap: ms(10) },

  imageContainer: {
    marginTop: vs(10),
    width: hs(100),
    backgroundColor: COLORS.paleGrey,
    height: ms(124),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: { width: '100%', height: '100%' },
});
