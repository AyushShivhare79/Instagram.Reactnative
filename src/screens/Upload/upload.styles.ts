import { hs, vs } from '@/theme/responsive/responsive';
import { COLORS } from '../../theme/color/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
    paddingVertical: vs(50),
    padding: 10,
  },
  secondContainer: { gap: vs(30), paddingHorizontal: hs(10) },
  imagePosition: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    backgroundColor: COLORS.paleGrey,
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
  textInput: {
    color: COLORS.black,
  },
  buttonPosition: { justifyContent: 'center', alignItems: 'center' },
  buttonStyle: { width: '80%' },
});
