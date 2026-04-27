import { FONT_SIZE } from '@/theme/typography/fontSizes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONT_SIZE['2xl'],
  },
});
