import { COLORS } from '@/theme/color/color';
import { hs, ms, vs } from '@/theme/responsive/responsive';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: { gap: 30, padding: 10 },

  imageOuterBox: { justifyContent: 'center', alignItems: 'center' },

  imageContainer: {
    width: ms(120) ,
    backgroundColor: COLORS.paleGrey,
    height: vs(120),
    borderRadius: ms(16) ,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: { width: '100%', height: '100%' },

  input: {
    height: vs(40),
    borderColor: 'gray',
    backgroundColor: COLORS.transparent,
    borderWidth: ms(1),
    paddingHorizontal: hs(8),
    borderRadius: ms(20),
  },
  error: {
    color: COLORS.error,
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: ms(10),
    width: '80%',
    borderRadius: ms(50),
  },

  bottomContainer: {
    gap: ms(10),
    padding: ms(7),
    position: 'absolute',
    bottom: vs(50),
    left: hs(50),
    right: hs(50),
  },

  bottomTextAlign: { flexDirection: 'row', justifyContent: 'center' },
});
