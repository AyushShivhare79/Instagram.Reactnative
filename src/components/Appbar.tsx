import { COLORS } from '../theme/color/color';
import { Icons } from '../assets/Icons/index';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

const CustomHeader = ({ title }: { title: string }) => {
  return (
    <Appbar.Header
      mode="center-aligned"
      style={{ backgroundColor: COLORS.transparent }}
    >
      <Icons.ArrowLeftIcon />
      <Appbar.Content color={COLORS.black} title={title} />
    </Appbar.Header>
  );
};

export default CustomHeader;
