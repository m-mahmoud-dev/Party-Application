export type PositionStatus = 'open' | 'closed';

export interface PartyPosition {
  id: string;
  title: string;
  partyGroup: string;
  openedAt: string;
  applicationDeadline: string;
}

export interface PartyMemberProfile {
  memberId: string;
  age: number;
  memberSinceYear: number;
  belongsToPartyGroup: boolean;
}

export interface EligibilityCheck {
  isMemberForAtLeastThreeYears: boolean;
  isAtLeastThirtyFiveYearsOld: boolean;
  belongsToPartyGroup: boolean;
  isEligible: boolean;
}

export interface PositionApplication {
  id: string;
  positionId: string;
  applicantId: string;
  submittedAt: string;
}

export interface PositionApplicationResult {
  success: boolean;
  error?: string;
  application?: PositionApplication;
}
