import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ComponentProps, useEffect, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation } from '../components/BottomNavigation';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { RootStackParamList, ScreenName } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const menuItems: Array<{
  id: ScreenName;
  label: string;
  icon: ComponentProps<typeof Feather>['name'];
  color: string;
}> = [
  { id: 'Profile', label: 'My Profile', icon: 'user', color: colors.royalBlue },
  { id: 'Payments', label: 'Membership Fees', icon: 'credit-card', color: colors.successGreen },
  { id: 'Documents', label: 'Documents', icon: 'file-text', color: colors.warningOrange },
  { id: 'Map', label: 'Headquarters', icon: 'map-pin', color: colors.errorRed },
  { id: 'Electoral', label: 'Electoral Module', icon: 'check-square', color: colors.deepBlue },
  { id: 'Settings', label: 'Settings', icon: 'settings', color: colors.secondaryText },
];

const memberStats = [
  { label: 'Meetings', value: '12' },
  { label: 'Votes Cast', value: '8' },
  { label: 'Streak', value: '3 mo' },
];

export function HomeDashboardScreen({ navigation }: Props) {
  const [animatedValues] = useState<Animated.Value[]>(() =>
    menuItems.map(() => new Animated.Value(0)),
  );

  useEffect(() => {
    Animated.stagger(
      80,
      animatedValues.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 60,
          friction: 8,
        }),
      ),
    ).start();
  }, [animatedValues]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubtitle}>Member Portal</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.profileCard}>
              <View style={styles.profileTopRow}>
                <View style={styles.profileLeft}>
                  <View style={styles.avatarCircle}>
                    <Feather name="user" size={24} color={colors.deepBlue} />
                  </View>
                  <View>
                    <Text style={styles.memberName}>Alex Johnson</Text>
                    <Text style={styles.memberId}>ID: MRT-2024-0001</Text>
                  </View>
                </View>
                <StatusBadge label="Active" />
              </View>

              <View style={styles.metaRow}>
                <View>
                  <Text style={styles.metaLabel}>Member Since</Text>
                  <Text style={styles.metaValue}>2024</Text>
                </View>
                <View>
                  <Text style={styles.metaLabel}>Region</Text>
                  <Text style={styles.metaValue}>North</Text>
                </View>
                <View>
                  <Text style={styles.metaLabel}>Branch</Text>
                  <Text style={styles.metaValue}>Central</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              {memberStats.map((stat) => (
                <View key={stat.label} style={styles.statCard}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.grid}>
              {menuItems.map((item, index) => (
                <Animated.View
                  key={item.id}
                  style={{
                    width: '48%',
                    opacity: animatedValues[index],
                    transform: [
                      {
                        translateY: animatedValues[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [24, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Pressable style={styles.gridItem} onPress={() => navigation.navigate(item.id)}>
                    <View style={[styles.gridIconWrap, { backgroundColor: `${item.color}15` }]}>
                      <Feather name={item.icon} size={24} color={item.color} />
                    </View>
                    <Text style={styles.gridLabel}>{item.label}</Text>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </View>
        </ScrollView>

        <BottomNavigation active="Home" onNavigate={navigation.navigate} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollContent: {
    paddingBottom: 92,
  },
  header: {
    backgroundColor: colors.deepBlue,
    paddingTop: 12,
    paddingBottom: 96,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    ...typography.h2,
    fontWeight: '400',
    color: colors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    ...typography.bodySm,
    color: colors.mediumGray,
  },
  content: {
    paddingHorizontal: 24,
    marginTop: -64,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    ...shadows.card,
  },
  profileTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberName: {
    ...typography.h3,
    fontWeight: '400',
    color: colors.primaryText,
  },
  memberId: {
    ...typography.bodySm,
    color: colors.secondaryText,
  },
  metaRow: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    ...typography.bodyXs,
    color: colors.secondaryText,
    marginBottom: 4,
  },
  metaValue: {
    ...typography.bodySm,
    color: colors.primaryText,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    ...shadows.sm,
  },
  statValue: {
    ...typography.h3,
    color: colors.deepBlue,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  gridItem: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    ...shadows.sm,
  },
  gridIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLabel: {
    ...typography.bodySm,
    color: colors.primaryText,
  },
});
