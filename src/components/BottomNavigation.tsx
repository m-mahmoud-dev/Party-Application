import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ScreenName } from '../types/screens';

interface BottomNavigationProps {
  active: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

const items: Array<{ id: ScreenName; label: string; icon: ComponentProps<typeof Feather>['name'] }> = [
  { id: 'Home', label: 'Home', icon: 'home' },
  { id: 'Notifications', label: 'Notifications', icon: 'bell' },
  { id: 'Profile', label: 'Profile', icon: 'user' },
];

export function BottomNavigation({ active, onNavigate }: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <Pressable key={item.id} onPress={() => onNavigate(item.id)} style={styles.item}>
              <Feather
                name={item.icon}
                size={20}
                color={isActive ? colors.deepBlue : colors.secondaryText}
              />
              <Text style={[styles.label, { color: isActive ? colors.deepBlue : colors.secondaryText }]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray,
  },
  inner: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: '100%',
  },
  label: {
    ...typography.bodyXs,
  },
});
