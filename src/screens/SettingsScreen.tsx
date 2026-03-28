import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <AppHeader title="Settings" onBack={() => navigation.navigate('Home')} />

          <View style={styles.contentWrap}>
            <View style={styles.settingsCard}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupHeaderText}>Notifications</Text>
              </View>

              <View style={styles.itemList}>
                <SettingToggleItem
                  icon="bell"
                  label="Push Notifications"
                  description="Receive notifications on your device"
                  value={pushEnabled}
                  onChange={setPushEnabled}
                />
                <SettingToggleItem
                  icon="bell"
                  label="Email Notifications"
                  description="Receive updates via email"
                  value={emailEnabled}
                  onChange={setEmailEnabled}
                />
              </View>
            </View>

            <View style={styles.settingsCard}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupHeaderText}>Privacy & Security</Text>
              </View>

              <View style={styles.itemList}>
                <SettingToggleItem
                  icon="shield"
                  label="Two-Factor Authentication"
                  description="Add extra security to your account"
                  value={twoFactorEnabled}
                  onChange={setTwoFactorEnabled}
                />
                <SettingLinkItem
                  icon="lock"
                  label="Privacy Settings"
                  description="Manage your privacy preferences"
                  onPress={() => Alert.alert('Privacy Settings', 'Privacy settings management coming soon.', [{ text: 'OK' }])}
                />
              </View>
            </View>

            <View style={styles.settingsCard}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupHeaderText}>General</Text>
              </View>

              <View style={styles.itemList}>
                <SettingLinkItem
                  icon="globe"
                  label="Language"
                  description="English"
                  onPress={() => Alert.alert('Language', 'Additional languages coming soon.', [{ text: 'OK' }])}
                />
                <SettingLinkItem
                  icon="help-circle"
                  label="Help & Support"
                  description="Get help with the platform"
                  onPress={() => Alert.alert('Help & Support', 'For assistance, contact support@party.org or call +123 456 7890.', [{ text: 'OK' }])}
                />
              </View>
            </View>

            <AppButton
              label="Logout"
              variant="outline"
              textColor={colors.errorRed}
              style={styles.logoutBtn}
              onPress={handleLogout}
            />

            <View style={styles.versionWrap}>
              <Text style={styles.versionText}>Party Digital Platform</Text>
              <Text style={styles.versionText}>Version 1.0.0 • Build 2024.02</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

type ToggleItemProps = {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

function SettingToggleItem({ icon, label, description, value, onChange }: ToggleItemProps) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.itemLeft}>
        <View style={styles.iconWrap}>
          <Feather name={icon} size={20} color={colors.deepBlue} />
        </View>
        <View style={styles.itemTextWrap}>
          <Text style={styles.itemLabel}>{label}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        thumbColor={colors.white}
        trackColor={{ false: '#cbced4', true: colors.deepBlue }}
      />
    </View>
  );
}

type LinkItemProps = {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  description: string;
  onPress?: () => void;
};

function SettingLinkItem({ icon, label, description, onPress }: LinkItemProps) {
  return (
    <Pressable style={styles.settingItem} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={styles.iconWrap}>
          <Feather name={icon} size={20} color={colors.deepBlue} />
        </View>
        <View style={styles.itemTextWrap}>
          <Text style={styles.itemLabel}>{label}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
      </View>
      <Feather name="chevron-right" size={20} color={colors.secondaryText} />
    </Pressable>
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
    paddingBottom: 24,
  },
  contentWrap: {
    paddingHorizontal: 24,
    marginTop: -48,
    gap: 24,
  },
  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.card,
  },
  groupHeader: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  groupHeaderText: {
    ...typography.bodySm,
    color: colors.secondaryText,
  },
  itemList: {
    borderTopWidth: 0,
  },
  settingItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextWrap: {
    flex: 1,
  },
  itemLabel: {
    ...typography.bodySm,
    color: colors.primaryText,
    marginBottom: 2,
  },
  itemDescription: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  logoutBtn: {
    borderColor: colors.errorRed,
    width: '100%',
  },
  versionWrap: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
});
