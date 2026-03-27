import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function BrandMarkCard() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoEmoji}>🏛️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoEmoji: {
    ...typography.logoEmoji,
  },
});
