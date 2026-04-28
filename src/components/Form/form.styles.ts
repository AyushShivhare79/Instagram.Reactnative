import { COLORS } from '@/theme/color/color';
import { vs } from '@/theme/responsive/responsive';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: vs(12),
  },
  error: {
    color: COLORS.red,
    marginTop: vs(4),
  },
});
