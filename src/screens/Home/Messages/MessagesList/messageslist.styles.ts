import { COLORS } from '@/theme/color/color';
import { hs, ms } from '@/theme/responsive/responsive';
import { FONT_SIZE } from '@/theme/typography/fontSizes';
import { FONT_WEIGHT } from '@/theme/typography/fontWeights';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, gap: 12 },
  messageText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },
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
  input: {
    backgroundColor: COLORS.white,
    height: 52,
    borderWidth: 0,
    borderRadius: ms(30),
    paddingHorizontal: hs(8),
  },
  content: {},
});
