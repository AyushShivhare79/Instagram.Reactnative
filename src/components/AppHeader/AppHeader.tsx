import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { styles } from './appheader';
import { Appbar } from 'react-native-paper';
import { Icons } from '@/assets/Icons';
import { TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  rightIcon?: ReactNode;
  onRightPress?: () => void;
  showBack?: boolean;
};

const AppHeader = ({ title, showBack = true }: Props) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.headerBackground} mode="center-aligned">
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.ArrowLeftIcon />
        </TouchableOpacity>
      )}
      <Appbar.Content title={title} titleStyle={styles.headerText} />
    </Appbar.Header>
  );
};

export default AppHeader;
