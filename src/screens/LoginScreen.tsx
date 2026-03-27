import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { AppInput } from '../components/AppInput';
import { BrandMarkCard } from '../components/BrandMarkCard';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <View style={styles.logoWrap}>
              <Text style={styles.logoEmoji}>🏛️</Text>
            </View>
            <Text style={styles.headerTitle}>Party Digital Platform</Text>
            <Text style={styles.headerSubtitle}>Member Login</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Membership Number</Text>
              <AppInput placeholder="Enter your membership ID" />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Access Code</Text>
              <AppInput placeholder="Enter your code" secureTextEntry />
            </View>

            <AppButton
              label="Login to Portal"
              onPress={() => navigation.replace('Home')}
              style={styles.loginButton}
            />

            <View style={styles.cardFooter}>
              <Text style={styles.requestCode}>Request Access Code</Text>
              <View style={styles.supportRow}>
                <Feather name="phone" size={16} color={colors.secondaryText} />
                <Text style={styles.supportText}>Support: +123 456 7890</Text>
              </View>
            </View>
          </View>

          <View style={styles.securityRow}>
            <Feather name="shield" size={16} color={colors.secondaryText} />
            <Text style={styles.securityText}>Secure Authentication</Text>
          </View>
        </View>
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
  header: {
    backgroundColor: colors.deepBlue,
    paddingTop: 12,
    paddingBottom: 128,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerCenter: {
    alignItems: 'center',
  },
  logoWrap: {
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 30,
    lineHeight: 30,
  },
  headerTitle: {
    ...typography.h2,
    fontWeight: '400',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...typography.bodySm,
    color: colors.mediumGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -80,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    ...shadows.card,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    ...typography.body,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 8,
  },
  loginButton: {
    width: '100%',
    marginTop: 0,
  },
  cardFooter: {
    marginTop: 24,
    gap: 12,
  },
  requestCode: {
    ...typography.bodySm,
    color: colors.royalBlue,
    textAlign: 'center',
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  supportText: {
    ...typography.bodySm,
    color: colors.secondaryText,
  },
  securityRow: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  securityText: {
    ...typography.bodySm,
    color: colors.secondaryText,
  },
});
