import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { AppInput } from '../components/AppInput';
import { BottomNavigation } from '../components/BottomNavigation';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <AppHeader title="My Profile" onBack={() => navigation.navigate('Home')} />

          <View style={styles.contentWrap}>
            <View style={styles.card}>
              <View style={styles.avatarSection}>
                <View style={styles.avatarCircle}>
                  <Feather name="user" size={48} color={colors.deepBlue} />
                </View>
                <Text style={styles.memberId}>Member ID: MBR-2024-0001</Text>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Full Name</Text>
                <AppInput defaultValue="Alex Johnson" />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email Address</Text>
                <AppInput defaultValue="alex.johnson@party.org" keyboardType="email-address" />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <AppInput defaultValue="+1 555 000 1234" keyboardType="phone-pad" />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Address</Text>
                <AppInput defaultValue="123 Democracy Ave, Capital City" />
              </View>

              <View style={styles.rowTwoCols}>
                <View style={styles.col}>
                  <Text style={styles.label}>National ID</Text>
                  <AppInput defaultValue="••••••••" editable={false} disabledStyle />
                </View>

                <View style={styles.col}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <AppInput defaultValue="1990-01-01" editable={false} disabledStyle />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.saveWrap}>
          <AppButton
            label="Save Changes"
            style={styles.saveButton}
            onPress={() =>
              Alert.alert('✅ Profile Updated', 'Your profile changes have been saved successfully.', [
                { text: 'OK' },
              ])
            }
          />
        </View>

        <BottomNavigation active="Profile" onNavigate={navigation.navigate} />
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
    paddingBottom: 180,
  },
  contentWrap: {
    paddingHorizontal: 24,
    marginTop: -48,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    ...shadows.card,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  memberId: {
    ...typography.bodySm,
    color: colors.secondaryText,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    ...typography.body,
    color: colors.primaryText,
    fontWeight: '500',
    marginBottom: 8,
  },
  rowTwoCols: {
    flexDirection: 'row',
    gap: 16,
  },
  col: {
    flex: 1,
  },
  saveWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 84,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.lightGray,
  },
  saveButton: {
    width: '100%',
  },
});
