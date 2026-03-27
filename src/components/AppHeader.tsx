import { Feather } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightNode?: ReactNode;
  bottomPadding?: number;
}

export function AppHeader({
  title,
  subtitle,
  onBack,
  rightNode,
  bottomPadding = 80,
}: AppHeaderProps) {
  return (
    <View style={[styles.header, { paddingBottom: bottomPadding }]}> 
      <View style={styles.row}>
        <View style={styles.leftSection}>
          {onBack ? (
            <Pressable onPress={onBack} style={styles.backButton}>
              <Feather name="arrow-left" size={20} color={colors.white} />
            </Pressable>
          ) : null}

          <View>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>

        {rightNode}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.deepBlue,
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    ...typography.h2,
    color: colors.white,
  },
  subtitle: {
    ...typography.bodyXs,
    color: colors.mediumGray,
    marginTop: 4,
  },
});
