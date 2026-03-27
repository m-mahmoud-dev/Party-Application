import {
  EligibilityCheck,
  PartyMemberProfile,
  PartyPosition,
  PositionApplication,
  PositionApplicationResult,
  PositionStatus,
} from '../types/electoral';

const MINIMUM_MEMBERSHIP_YEARS = 3;
const MINIMUM_APPLICANT_AGE = 35;

export function getPositionStatus(position: PartyPosition, now: Date = new Date()): PositionStatus {
  return now <= new Date(position.applicationDeadline) ? 'open' : 'closed';
}

export function checkEligibility(member: PartyMemberProfile, now: Date = new Date()): EligibilityCheck {
  const memberForYears = now.getFullYear() - member.memberSinceYear;
  const isMemberForAtLeastThreeYears = memberForYears >= MINIMUM_MEMBERSHIP_YEARS;
  const isAtLeastThirtyFiveYearsOld = member.age >= MINIMUM_APPLICANT_AGE;

  return {
    isMemberForAtLeastThreeYears,
    isAtLeastThirtyFiveYearsOld,
    belongsToPartyGroup: member.belongsToPartyGroup,
    isEligible:
      isMemberForAtLeastThreeYears && isAtLeastThirtyFiveYearsOld && member.belongsToPartyGroup,
  };
}

export function hasSubmittedApplication(
  applications: PositionApplication[],
  positionId: string,
  applicantId: string,
): boolean {
  return applications.some(
    (application) => application.positionId === positionId && application.applicantId === applicantId,
  );
}

export function canApplyForPosition(
  position: PartyPosition,
  member: PartyMemberProfile,
  applications: PositionApplication[],
  now: Date = new Date(),
): { canApply: boolean; reason?: string } {
  const status = getPositionStatus(position, now);

  if (status === 'closed') {
    return { canApply: false, reason: 'Application period is closed.' };
  }

  const eligibility = checkEligibility(member, now);

  if (!eligibility.isEligible) {
    return { canApply: false, reason: 'You do not meet the eligibility criteria.' };
  }

  if (hasSubmittedApplication(applications, position.id, member.memberId)) {
    return { canApply: false, reason: 'Application already submitted.' };
  }

  return { canApply: true };
}

export function submitPositionApplication(
  position: PartyPosition,
  member: PartyMemberProfile,
  applications: PositionApplication[],
  now: Date = new Date(),
): PositionApplicationResult {
  const permission = canApplyForPosition(position, member, applications, now);

  if (!permission.canApply) {
    return { success: false, error: permission.reason };
  }

  const application: PositionApplication = {
    id: `${position.id}-${member.memberId}-${now.getTime()}`,
    positionId: position.id,
    applicantId: member.memberId,
    submittedAt: now.toISOString(),
  };

  return {
    success: true,
    application,
  };
}
