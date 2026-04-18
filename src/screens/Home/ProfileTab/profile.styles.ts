import { COLORS } from '../../../theme/color/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 5 },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profilePicture: { borderRadius: 999 },
  image: { width: '100%', height: '100%' },
  imageContainer: {
    width: 120,
    backgroundColor: COLORS.paleGrey,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: { marginTop: 20, flex: 1 },
  countText: { fontWeight: 'bold', fontSize: 16 },
  labelText: { fontSize: 14 },
});