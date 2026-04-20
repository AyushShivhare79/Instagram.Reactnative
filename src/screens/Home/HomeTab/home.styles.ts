import { COLORS } from '@/theme/color/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  imageOuterBox: {
    marginTop: 10,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    backgroundColor: COLORS.paleGrey,
    height: 28,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: COLORS.paleGrey,
    height: 350,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
  flatListStatusContainer: { flexDirection: 'row', gap: 10 },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomLeftIcons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
