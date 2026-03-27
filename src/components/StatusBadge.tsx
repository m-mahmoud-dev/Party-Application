import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface StatusBadgeProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  outlined?: boolean;
  borderColor?: string;
}

export function StatusBadge({
  label,
  backgroundColor = colors.successGreen,
  textColor = colors.white,
  outlined = false,
  borderColor,
}: StatusBadgeProps) {
  return (
    <View
      style={[
        styles.base,
        outlined
          ? { backgroundColor: colors.transparent, borderColor: borderColor ?? textColor, borderWidth: 1 }
          : { backgroundColor },
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.bodyXs,
    fontWeight: '500',
  },
});
