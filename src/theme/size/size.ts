import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

export const hs = (size: number) => scale(size);

export const vs = (size: number) => verticalScale(size);

export const ms = (size: number, factor = 0.5) => moderateScale(size, factor);

export const mvs = (size: number, factor = 0.5) =>
  moderateVerticalScale(size, factor);
