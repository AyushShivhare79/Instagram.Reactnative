import { COLORS } from '@/theme/color/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    backgroundColor: COLORS.paleGrey,
    height: 30,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
});
