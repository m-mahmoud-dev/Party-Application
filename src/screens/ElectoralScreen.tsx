import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { StatusBadge } from '../components/StatusBadge';
import {
  checkEligibility,
  getPositionStatus,
  hasSubmittedApplication,
  submitPositionApplication,
} from '../electoral/positionApplication';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { PartyMemberProfile, PartyPosition, PositionApplication } from '../types/electoral';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Electoral'>;

const upcomingElections = [
  {
    id: 1,
    title: 'Regional Leadership Election',
    region: 'North Region',
    date: 'April 15, 2026',
    status: 'Nominations Open',
    statusColor: colors.successGreen,
  },
  {
    id: 2,
    title: 'Branch Committee Election',
    region: 'Central Branch',
    date: 'May 20, 2026',
    status: 'Upcoming',
    statusColor: colors.warningOrange,
  },
];

const myParticipation = [
  {
    id: 1,
    election: 'Regional Elections 2025',
    role: 'Voter',
    date: 'October 10, 2025',
    status: 'Voted',
  },
  {
    id: 2,
    election: 'Branch Elections 2025',
    role: 'Voter',
    date: 'September 5, 2025',
    status: 'Voted',
  },
];

const availablePositions: PartyPosition[] = [
  {
    id: 'party-chairperson',
    title: 'Party Chairperson',
    partyGroup: 'National Leadership Council',
    openedAt: '2026-01-15T00:00:00.000Z',
    applicationDeadline: '2026-04-15T23:59:59.000Z',
  },
  {
    id: 'organizing-secretary',
    title: 'Organizing Secretary',
    partyGroup: 'Regional Coordination Group',
    openedAt: '2025-10-01T00:00:00.000Z',
    applicationDeadline: '2026-01-01T23:59:59.000Z',
  },
];

const currentMember: PartyMemberProfile = {
  memberId: 'M-20451',
  age: 38,
  memberSinceYear: 2024,
  belongsToPartyGroup: true,
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ElectoralScreen({ navigation }: Props) {
  const [applications, setApplications] = useState<PositionApplication[]>([]);
  const eligibility = checkEligibility(currentMember);

  const handleApply = (position: PartyPosition) => {
    const result = submitPositionApplication(position, currentMember, applications);

    if (!result.success || !result.application) {
      return;
    }

    setApplications((previous) => [...previous, result.application!]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <AppHeader title="Electoral Module" subtitle="Electoral Operations Committee" onBack={() => navigation.navigate('Home')} bottomPadding={96} />
          </View>

          <View style={styles.contentWrap}>
            <View style={styles.authorizedCard}>
              <View style={styles.authTopRow}>
                <Feather name="check-square" size={24} color={colors.white} />
                <View style={styles.authTextWrap}>
                  <Text style={styles.authTitle}>Electoral Rights</Text>
                  <Text style={styles.authDescription}>
                    You are authorized to participate in electoral processes as a registered member in good standing.
                  </Text>
                </View>
              </View>

              <View style={styles.authFooter}>
                <View>
                  <Text style={styles.authLabel}>Status</Text>
                  <StatusBadge label="Authorized" />
                </View>
                <View>
                  <Text style={styles.authLabel}>Member Since</Text>
                  <Text style={styles.authValue}>2024</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Upcoming Elections</Text>
                <Feather name="calendar" size={20} color={colors.secondaryText} />
              </View>

              <View style={styles.sectionList}>
                {upcomingElections.map((election) => (
                  <View key={election.id} style={[styles.electionItem, { borderLeftColor: election.statusColor }]}> 
                    <View style={styles.electionTopRow}>
                      <View style={styles.electionTextWrap}>
                        <Text style={styles.electionTitle}>{election.title}</Text>
                        <Text style={styles.electionRegion}>{election.region}</Text>
                      </View>

                      <View style={styles.electionStatusWrap}>
                        <StatusBadge
                          label={election.status}
                          backgroundColor={`${election.statusColor}15`}
                          textColor={election.statusColor}
                        />
                      </View>
                    </View>

                    <View style={styles.dateRow}>
                      <Feather name="calendar" size={12} color={colors.secondaryText} />
                      <Text style={styles.dateText}>{election.date}</Text>
                    </View>

                    {election.status === 'Nominations Open' ? (
                      <AppButton label="View Details" style={styles.detailsBtn} height={36} />
                    ) : null}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Party Position Applications</Text>
                <Feather name="briefcase" size={20} color={colors.secondaryText} />
              </View>

              <View style={styles.eligibilityCard}>
                <Text style={styles.eligibilityTitle}>Eligibility Requirements</Text>
                <View style={styles.ruleRow}>
                  <Feather
                    name={eligibility.isMemberForAtLeastThreeYears ? 'check-circle' : 'x-circle'}
                    size={14}
                    color={eligibility.isMemberForAtLeastThreeYears ? colors.successGreen : colors.errorRed}
                  />
                  <Text style={styles.ruleText}>Member for at least 3 years</Text>
                </View>
                <View style={styles.ruleRow}>
                  <Feather
                    name={eligibility.isAtLeastThirtyFiveYearsOld ? 'check-circle' : 'x-circle'}
                    size={14}
                    color={eligibility.isAtLeastThirtyFiveYearsOld ? colors.successGreen : colors.errorRed}
                  />
                  <Text style={styles.ruleText}>35 years old or older</Text>
                </View>
                <View style={styles.ruleRow}>
                  <Feather
                    name={eligibility.belongsToPartyGroup ? 'check-circle' : 'x-circle'}
                    size={14}
                    color={eligibility.belongsToPartyGroup ? colors.successGreen : colors.errorRed}
                  />
                  <Text style={styles.ruleText}>Belongs to the party group</Text>
                </View>
              </View>

              <View style={styles.sectionList}>
                {availablePositions.map((position) => {
                  const positionStatus = getPositionStatus(position);
                  const isSubmitted = hasSubmittedApplication(
                    applications,
                    position.id,
                    currentMember.memberId,
                  );
                  const canApply = positionStatus === 'open' && eligibility.isEligible && !isSubmitted;
                  const badgeColor = positionStatus === 'open' ? colors.successGreen : colors.errorRed;

                  return (
                    <View key={position.id} style={[styles.electionItem, { borderLeftColor: badgeColor }]}> 
                      <View style={styles.electionTopRow}>
                        <View style={styles.electionTextWrap}>
                          <Text style={styles.electionTitle}>{position.title}</Text>
                          <Text style={styles.electionRegion}>{position.partyGroup}</Text>
                        </View>

                        <StatusBadge
                          label={positionStatus === 'open' ? 'Open' : 'Closed'}
                          backgroundColor={`${badgeColor}15`}
                          textColor={badgeColor}
                        />
                      </View>

                      <View style={styles.dateRow}>
                        <Feather name="clock" size={12} color={colors.secondaryText} />
                        <Text style={styles.dateText}>Deadline: {formatDate(position.applicationDeadline)}</Text>
                      </View>

                      {isSubmitted ? (
                        <StatusBadge
                          outlined
                          label="Application Submitted"
                          borderColor={colors.successGreen}
                          textColor={colors.successGreen}
                        />
                      ) : (
                        <AppButton
                          label={
                            positionStatus === 'closed'
                              ? 'Application Closed'
                              : canApply
                                ? 'Apply for Position'
                                : 'Not Eligible'
                          }
                          onPress={canApply ? () => handleApply(position) : undefined}
                          variant={canApply ? 'primary' : 'outline'}
                          style={styles.detailsBtn}
                          height={36}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>My Participation</Text>
                <Feather name="users" size={20} color={colors.secondaryText} />
              </View>

              <View style={styles.sectionList}>
                {myParticipation.map((record) => (
                  <View key={record.id} style={styles.participationItem}>
                    <View>
                      <Text style={styles.participationTitle}>{record.election}</Text>
                      <View style={styles.participationMetaRow}>
                        <Text style={styles.participationMeta}>{record.role}</Text>
                        <Text style={styles.participationMeta}>•</Text>
                        <Text style={styles.participationMeta}>{record.date}</Text>
                      </View>
                    </View>
                    <StatusBadge outlined label={record.status} borderColor={colors.successGreen} textColor={colors.successGreen} />
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.noticeCard}>
              <Feather name="shield" size={20} color={colors.deepBlue} style={styles.noticeIcon} />
              <View>
                <Text style={styles.noticeTitle}>Electoral Integrity</Text>
                <Text style={styles.noticeBody}>
                  All electoral processes are monitored and verified by the Electoral Operations Committee. Your participation is secure and confidential.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
  headerBlock: {
    backgroundColor: colors.deepBlue,
  },
  contentWrap: {
    paddingHorizontal: 24,
    marginTop: -64,
    gap: 24,
  },
  authorizedCard: {
    backgroundColor: colors.royalBlue,
    borderRadius: 16,
    padding: 24,
    ...shadows.card,
  },
  authTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  authTextWrap: {
    flex: 1,
  },
  authTitle: {
    ...typography.body,
    color: colors.white,
    marginBottom: 4,
  },
  authDescription: {
    ...typography.bodySm,
    color: 'rgba(255,255,255,0.8)',
  },
  authFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  authLabel: {
    ...typography.bodyXs,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
  },
  authValue: {
    ...typography.bodySm,
    color: colors.white,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    ...shadows.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    ...typography.body,
    color: colors.primaryText,
    fontWeight: '500',
  },
  sectionList: {
    gap: 12,
  },
  eligibilityCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 8,
  },
  eligibilityTitle: {
    ...typography.bodySm,
    color: colors.primaryText,
    fontWeight: '500',
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ruleText: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  electionItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
  },
  electionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  electionTextWrap: {
    flex: 1,
  },
  electionStatusWrap: {
    flexShrink: 0,
  },
  electionTitle: {
    ...typography.bodySm,
    color: colors.primaryText,
    marginBottom: 4,
  },
  electionRegion: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  dateText: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  detailsBtn: {
    width: '100%',
  },
  participationItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participationTitle: {
    ...typography.bodySm,
    color: colors.primaryText,
    marginBottom: 4,
  },
  participationMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  participationMeta: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  noticeCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...shadows.sm,
  },
  noticeIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  noticeTitle: {
    ...typography.bodySm,
    color: colors.primaryText,
    marginBottom: 4,
  },
  noticeBody: {
    ...typography.bodyXs,
    color: colors.secondaryText,
    lineHeight: 18,
    maxWidth: 280,
  },
});
