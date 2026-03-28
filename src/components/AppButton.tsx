import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  style?: ViewStyle;
  textColor?: string;
  height?: number;
}

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  style,
  textColor,
  height = 48,
}: AppButtonProps) {
  const variantStyle =
    variant === 'primary'
      ? styles.primary
      : variant === 'secondary'
        ? styles.secondary
        : variant === 'outline'
          ? styles.outline
          : styles.ghost;

  const labelColor =
    textColor ??
    (variant === 'outline' || variant === 'ghost' ? colors.primaryText : colors.white);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, { height, opacity: pressed ? 0.75 : 1 }, variantStyle, style]}
    >
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.deepBlue,
  },
  secondary: {
    backgroundColor: colors.successGreen,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.mediumGray,
    backgroundColor: colors.white,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  label: {
    ...typography.button,
  },
});
