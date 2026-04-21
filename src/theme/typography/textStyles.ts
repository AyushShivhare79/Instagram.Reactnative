import { StyleSheet } from 'react-native';
import { FONT_SIZE } from './fontSizes';
import { FONT_WEIGHT } from './fontWeights';

export const textStyles = StyleSheet.create({
  xs: { fontSize: FONT_SIZE.xs },
  sm: { fontSize: FONT_SIZE.sm },
  md: { fontSize: FONT_SIZE.base },
  base: { fontSize: FONT_SIZE.base },
  lg: { fontSize: FONT_SIZE.lg },
  xl: { fontSize: FONT_SIZE.xl },
  xxl: { fontSize: FONT_SIZE['2xl'] },

  light: { fontWeight: FONT_WEIGHT.light },
  regular: { fontWeight: FONT_WEIGHT.regular },
  medium: { fontWeight: FONT_WEIGHT.medium },
  semiBold: { fontWeight: FONT_WEIGHT.semiBold },
  bold: { fontWeight: FONT_WEIGHT.bold },
});
