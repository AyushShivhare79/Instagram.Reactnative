import { PaperProvider } from 'react-native-paper';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MyStack } from './navigation/StackNavigation';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Toast />
        <MyStack />
      </PaperProvider>
    </Provider>
  );
}
