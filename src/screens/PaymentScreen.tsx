import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Payments'>;

const paymentHistory = [
  { id: 1, date: '2026-01-15', amount: 50, status: 'Paid', type: 'Monthly' },
  { id: 2, date: '2025-12-15', amount: 50, status: 'Paid', type: 'Monthly' },
  { id: 3, date: '2025-11-15', amount: 50, status: 'Paid', type: 'Monthly' },
  { id: 4, date: '2025-10-15', amount: 50, status: 'Paid', type: 'Monthly' },
];

export function PaymentScreen({ navigation }: Props) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <AppHeader title="Membership Fees" onBack={() => navigation.navigate('Home')} bottomPadding={96} />

          <View style={styles.contentWrap}>
            <View style={styles.card}>
              <View style={styles.topRow}>
                <View>
                  <Text style={styles.periodLabel}>Current Period</Text>
                  <Text style={styles.amount}>$50.00</Text>
                </View>
                <View style={styles.amountIconWrap}>
                  <Feather name="credit-card" size={28} color={colors.successGreen} />
                </View>
              </View>

              <View style={styles.dueRow}>
                <View>
                  <Text style={styles.dueLabel}>Due Date</Text>
                  <Text style={styles.dueValue}>March 15, 2026</Text>
                </View>
                <StatusBadge label="Current" />
              </View>

              <AppButton
                label="Pay Now"
                variant="secondary"
                style={styles.payNowButton}
                onPress={() => setShowPaymentModal(true)}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Payment History</Text>
              <View style={styles.historyList}>
                {paymentHistory.map((payment) => (
                  <View key={payment.id} style={styles.historyRow}>
                    <View>
                      <Text style={styles.historyType}>{payment.type} Fee</Text>
                      <Text style={styles.historyDate}>{payment.date}</Text>
                    </View>
                    <View style={styles.historyRight}>
                      <Text style={styles.historyAmount}>${payment.amount.toFixed(2)}</Text>
                      <StatusBadge
                        label={payment.status}
                        outlined
                        borderColor={colors.successGreen}
                        textColor={colors.successGreen}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal visible={showPaymentModal} transparent animationType="fade" onRequestClose={() => setShowPaymentModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Select Payment Method</Text>
              <Text style={styles.modalDescription}>Choose a payment method to proceed with your payment.</Text>

              <View style={styles.modalOptions}>
                {[
                  { id: 'card', label: 'Credit/Debit Card', sub: 'Visa, Mastercard, etc.', icon: 'credit-card' as const },
                  { id: 'wallet', label: 'Digital Wallet', sub: 'PayPal, Apple Pay, etc.', icon: 'briefcase' as const },
                  { id: 'bank', label: 'Bank Transfer', sub: 'Direct bank payment', icon: 'home' as const },
                ].map((method) => (
                  <Pressable
                    key={method.id}
                    style={styles.optionRow}
                    onPress={() => {
                      setShowPaymentModal(false);
                      Alert.alert(
                        '✅ Payment Initiated',
                        `Your payment via ${method.label} is being processed. You will receive a confirmation shortly.`,
                        [{ text: 'OK' }],
                      );
                    }}
                  >
                    <View style={styles.optionIconWrap}>
                      <Feather name={method.icon} size={24} color={colors.deepBlue} />
                    </View>
                    <View>
                      <Text style={styles.optionTitle}>{method.label}</Text>
                      <Text style={styles.optionSub}>{method.sub}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>

              <AppButton label="Close" variant="outline" onPress={() => setShowPaymentModal(false)} style={styles.closeButton} />
            </View>
          </View>
        </Modal>
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
    paddingBottom: 24,
  },
  contentWrap: {
    paddingHorizontal: 24,
    marginTop: -64,
    gap: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    ...shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  periodLabel: {
    ...typography.bodySm,
    color: colors.secondaryText,
    marginBottom: 4,
  },
  amount: {
    ...typography.h1,
    color: colors.primaryText,
    fontWeight: '400',
  },
  amountIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2E7D3215',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueRow: {
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray,
    paddingTop: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueLabel: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  dueValue: {
    ...typography.bodySm,
    color: colors.primaryText,
  },
  payNowButton: {
    width: '100%',
  },
  sectionTitle: {
    ...typography.body,
    color: colors.primaryText,
    fontWeight: '500',
    marginBottom: 16,
  },
  historyList: {
    gap: 12,
  },
  historyRow: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyType: {
    ...typography.bodySm,
    color: colors.primaryText,
    marginBottom: 4,
  },
  historyDate: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  historyAmount: {
    ...typography.bodySm,
    color: colors.primaryText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    ...shadows.lg,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.primaryText,
    marginBottom: 4,
  },
  modalDescription: {
    ...typography.bodySm,
    color: colors.secondaryText,
    marginBottom: 16,
  },
  modalOptions: {
    gap: 12,
  },
  optionRow: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    ...typography.bodySm,
    color: colors.primaryText,
    marginBottom: 2,
  },
  optionSub: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  closeButton: {
    marginTop: 16,
  },
});
