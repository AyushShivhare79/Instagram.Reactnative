import { TextInput } from 'react-native-paper';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { styles } from './form.styles';
import { ms } from '@/theme/responsive/responsive';

type AppInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
};

function AppInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  secureTextEntry = false,
  style,
}: AppInputProps<T>) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        outlineColor="#E0E0E0"
        theme={{ roundness: ms(30) }}
        autoCapitalize="none"
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={style}
      />

      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}

export default AppInput;
