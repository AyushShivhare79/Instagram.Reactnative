import { PaperProvider } from 'react-native-paper';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ToastMessage from 'react-native-toast-message';
import { MyStack } from './navigation/StackNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ToastMessage />
        <MyStack />
      </PaperProvider>
    </Provider>
  );
}
