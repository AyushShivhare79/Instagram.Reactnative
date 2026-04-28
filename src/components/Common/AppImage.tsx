import React from 'react';
import FastImage, {
  FastImageProps,
  Priority,
} from '@d11/react-native-fast-image';

type AppImageProps = Omit<FastImageProps, 'source'> & {
  uri?: string;
  fallbackSource?: number;
  priority?: 'low' | 'normal' | 'high';
};

const priorityMap: Record<string, Priority> = {
  low: FastImage.priority.low,
  normal: FastImage.priority.normal,
  high: FastImage.priority.high,
};

const AppImage: React.FC<AppImageProps> = ({
  uri,
  fallbackSource,
  priority = 'normal',
  resizeMode = FastImage.resizeMode.cover,
  ...rest
}) => {
  return (
    <FastImage
      source={
        uri
          ? {
              uri,
              priority: priorityMap[priority],
            }
          : fallbackSource
      }
      resizeMode={resizeMode}
      {...rest}
    />
  );
};

export default AppImage;
