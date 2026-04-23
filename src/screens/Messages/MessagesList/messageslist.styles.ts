import { COLORS } from '@/theme/color/color';
import { FONT_SIZE } from '@/theme/typography/fontSizes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: FONT_SIZE.sm,
  },
  message: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
  },
});
