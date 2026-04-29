import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import { Platform } from 'react-native';

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    return true;
  }

  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS
      : PERMISSIONS.IOS.NOTIFICATIONS;

  const status = await check(permission);

  if (status === RESULTS.GRANTED) return true;

  if (status === RESULTS.BLOCKED) {
    console.log('🚫 Permission blocked, opening settings');
    openSettings();
    return false;
  }

  const result = await request(permission);

  return result === RESULTS.GRANTED;
};
