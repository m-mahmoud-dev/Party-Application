import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

type FilterKey = 'all' | 'general' | 'regional' | 'financial';

const notifications = [
  {
    id: 1,
    type: 'general',
    title: 'Welcome to the Platform',
    body: 'Your membership has been successfully activated. Explore all the features available to you.',
    time: '2 hours ago',
    read: false,
    icon: 'bell' as const,
    color: colors.royalBlue,
  },
  {
    id: 2,
    type: 'regional',
    title: 'North Region Meeting',
    body: 'Monthly regional meeting scheduled for March 20th at the Central Headquarters.',
    time: '5 hours ago',
    read: false,
    icon: 'message-square' as const,
    color: colors.warningOrange,
  },
  {
    id: 3,
    type: 'financial',
    title: 'Payment Received',
    body: 'Your monthly membership fee payment of $50.00 has been successfully processed.',
    time: '1 day ago',
    read: true,
    icon: 'dollar-sign' as const,
    color: colors.successGreen,
  },
  {
    id: 4,
    type: 'electoral',
    title: 'Electoral Committee Update',
    body: 'Nomination period for regional elections will open on April 1st, 2026.',
    time: '2 days ago',
    read: true,
    icon: 'check-square' as const,
    color: colors.errorRed,
  },
  {
    id: 5,
    type: 'general',
    title: 'System Maintenance',
    body: 'The platform will undergo scheduled maintenance on March 18th from 2:00 AM to 4:00 AM.',
    time: '3 days ago',
    read: true,
    icon: 'bell' as const,
    color: colors.royalBlue,
  },
];

export function NotificationsScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<FilterKey>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = useMemo(() => {
    if (filter === 'all') {
      return notifications;
    }

    return notifications.filter((notification) => notification.type === filter);
  }, [filter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <AppHeader
            title="Notifications"
            onBack={() => navigation.navigate('Home')}
            rightNode={
              unreadCount > 0 ? (
                <StatusBadge label={`${unreadCount} New`} backgroundColor={colors.errorRed} />
              ) : undefined
            }
          />

          <View style={styles.contentWrap}>
            <View style={styles.card}>
              <View style={styles.filterRow}>
                {[
                  { key: 'all' as const, label: 'All' },
                  { key: 'general' as const, label: 'General' },
                  { key: 'regional' as const, label: 'Regional' },
                  { key: 'financial' as const, label: 'Finance' },
                ].map((item) => {
                  const active = filter === item.key;
                  return (
                    <Pressable
                      key={item.key}
                      onPress={() => setFilter(item.key)}
                      style={[styles.filterChip, active && styles.filterChipActive]}
                    >
                      <Text style={[styles.filterText, active && styles.filterTextActive]}>{item.label}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.list}>
                {filteredNotifications.map((notification) => (
                  <View
                    key={notification.id}
                    style={[
                      styles.notificationCard,
                      {
                        borderLeftColor: notification.read ? colors.mediumGray : colors.royalBlue,
                        backgroundColor: notification.read ? colors.lightGray : colors.white,
                      },
                      !notification.read ? shadows.sm : null,
                    ]}
                  >
                    <View style={styles.notificationRow}>
                      <View style={[styles.iconWrap, { backgroundColor: `${notification.color}15` }]}> 
                        <Feather name={notification.icon} size={20} color={notification.color} />
                      </View>

                      <View style={styles.notificationBody}>
                        <View style={styles.notificationTitleRow}>
                          <Text style={styles.notificationTitle}>{notification.title}</Text>
                          {!notification.read ? <View style={styles.unreadDot} /> : null}
                        </View>
                        <Text style={styles.notificationText}>{notification.body}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <BottomNavigation active="Notifications" onNavigate={navigation.navigate} />
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
  contentWrap: {
    paddingHorizontal: 24,
    marginTop: -48,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.card,
  },
  filterRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  filterChip: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 2,
    borderBottomWidth: 2,
    borderBottomColor: colors.transparent,
  },
  filterChipActive: {
    borderBottomColor: colors.deepBlue,
    backgroundColor: '#0E2A4710',
  },
  filterText: {
    ...typography.bodySm,
    color: colors.secondaryText,
  },
  filterTextActive: {
    color: colors.deepBlue,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
  },
  notificationRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBody: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    ...typography.bodySm,
    color: colors.primaryText,
    flex: 1,
    paddingRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.royalBlue,
    marginTop: 6,
  },
  notificationText: {
    ...typography.bodyXs,
    color: colors.secondaryText,
    lineHeight: 18,
    marginBottom: 8,
  },
  notificationTime: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
});
