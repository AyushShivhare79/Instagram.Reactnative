import { StyleSheet } from 'react-native';
import { COLORS } from '@/theme/color/color';
import { hs, ms, vs } from '@/theme/responsive/responsive';
import { FONT_WEIGHT } from '@/theme/typography/fontWeights';

export const styles = StyleSheet.create({
  container: { flexDirection: 'column' },

  statusContainer: { padding: ms(8) },

  flatListStatusContainer: { flexDirection: 'row', gap: ms(10) },

  flatListPostContainer: { paddingBottom: vs(80) },

  renderPostsContainer: { padding: ms(4), paddingBottom: vs(17) },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(10),
  },

  usernameStyle: {
    fontWeight: FONT_WEIGHT.semiBold,
  },

  postHeaderRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageOuterBox: {
    marginTop: vs(10),
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },

  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: vs(350),
    backgroundColor: COLORS.paleGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },

  bottomContainer: {
    marginHorizontal: hs(3),
    marginTop: vs(10),
  },

  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomLeftIcons: {
    flexDirection: 'row',
    gap: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  captionContainer: { flexDirection: 'row', paddingTop: vs(6) },
});
