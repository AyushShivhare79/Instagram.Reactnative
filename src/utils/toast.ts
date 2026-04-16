import ToastMessage from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

type ToastOptions = {
  title?: string;
  message?: string;
  duration?: number;
};

const show = (type: ToastType, options: ToastOptions) => {
  ToastMessage.show({
    type,
    text1: options.title,
    text2: options.message,
    visibilityTime: options.duration ?? 3000,
  });
};

export const Toast = {
  success: (options: ToastOptions) => show('success', options),
  error: (options: ToastOptions) => show('error', options),
  info: (options: ToastOptions) => show('info', options),
};
