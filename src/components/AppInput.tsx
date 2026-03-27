import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface AppInputProps extends TextInputProps {
  disabledStyle?: boolean;
}

export function AppInput({ disabledStyle = false, style, ...props }: AppInputProps) {
  return (
    <View style={[styles.container, disabledStyle && styles.disabledContainer]}>
      <TextInput
        placeholderTextColor={colors.secondaryText}
        style={[styles.input, disabledStyle && styles.disabledInput, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  disabledContainer: {
    backgroundColor: colors.mutedBlue,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  input: {
    ...typography.body,
    color: colors.primaryText,
    paddingVertical: 10,
  },
  disabledInput: {
    color: colors.deepBlue,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
  },
});
