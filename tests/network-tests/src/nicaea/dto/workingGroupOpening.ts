import BN from 'bn.js';

export class WorkingGroupOpening {
  private activateAtBlock: BN | undefined;
  private maxActiveApplicants!: BN;
  private maxReviewPeriodLength!: BN;
  private applicationStakingPolicyAmount!: BN;
  private applicationCrowdedOutUnstakingPeriodLength!: BN;
  private applicationExpiredUnstakingPeriodLength!: BN;
  private roleStakingPolicyAmount!: BN;
  private roleCrowdedOutUnstakingPeriodLength!: BN;
  private roleExpiredUnstakingPeriodLength!: BN;
  private slashableMaxCount!: BN;
  private slashableMaxPercentPtsPerTime!: BN;
  private successfulApplicantApplicationStakeUnstakingPeriod!: BN;
  private failedApplicantApplicationStakeUnstakingPeriod!: BN;
  private failedApplicantRoleStakeUnstakingPeriod!: BN;
  private terminateApplicationStakeUnstakingPeriod!: BN;
  private terminateRoleStakeUnstakingPeriod!: BN;
  private exitRoleApplicationStakeUnstakingPeriod!: BN;
  private exitRoleStakeUnstakingPeriod!: BN;
  private text!: string;
  private openingType!: string;

  public getActivateAtBlock(): BN | undefined {
    return this.activateAtBlock;
  }

  public getMaxActiveApplicants(): BN {
    return this.maxActiveApplicants;
  }

  public getMaxReviewPeriodLength(): BN {
    return this.maxReviewPeriodLength;
  }

  public getApplicationStakingPolicyAmount(): BN {
    return this.applicationStakingPolicyAmount;
  }

  public getApplicationCrowdedOutUnstakingPeriodLength(): BN {
    return this.applicationCrowdedOutUnstakingPeriodLength;
  }

  public getApplicationExpiredUnstakingPeriodLength(): BN {
    return this.applicationExpiredUnstakingPeriodLength;
  }

  public getRoleStakingPolicyAmount(): BN {
    return this.roleStakingPolicyAmount;
  }

  public getRoleCrowdedOutUnstakingPeriodLength(): BN {
    return this.roleCrowdedOutUnstakingPeriodLength;
  }

  public getRoleExpiredUnstakingPeriodLength(): BN {
    return this.roleExpiredUnstakingPeriodLength;
  }

  public getSlashableMaxCount(): BN {
    return this.slashableMaxCount;
  }

  public getSlashableMaxPercentPtsPerTime(): BN {
    return this.slashableMaxPercentPtsPerTime;
  }

  public getSuccessfulApplicantApplicationStakeUnstakingPeriod(): BN {
    return this.successfulApplicantApplicationStakeUnstakingPeriod;
  }

  public getFailedApplicantApplicationStakeUnstakingPeriod(): BN {
    return this.failedApplicantApplicationStakeUnstakingPeriod;
  }

  public getFailedApplicantRoleStakeUnstakingPeriod(): BN {
    return this.failedApplicantRoleStakeUnstakingPeriod;
  }

  public getTerminateApplicationStakeUnstakingPeriod(): BN {
    return this.terminateApplicationStakeUnstakingPeriod;
  }

  public getTerminateRoleStakeUnstakingPeriod(): BN {
    return this.terminateRoleStakeUnstakingPeriod;
  }

  public getExitRoleApplicationStakeUnstakingPeriod(): BN {
    return this.exitRoleApplicationStakeUnstakingPeriod;
  }

  public getExitRoleStakeUnstakingPeriod(): BN {
    return this.exitRoleStakeUnstakingPeriod;
  }

  public getText(): string {
    return this.text;
  }

  public getOpeningType(): string {
    return this.openingType;
  }

  public setActivateAtBlock(value: BN | undefined) {
    this.activateAtBlock = value;
  }

  public setMaxActiveApplicants(value: BN) {
    this.maxActiveApplicants = value;
  }

  public setMaxReviewPeriodLength(value: BN) {
    this.maxReviewPeriodLength = value;
  }

  public setApplicationStakingPolicyAmount(value: BN) {
    this.applicationStakingPolicyAmount = value;
  }

  public setApplicationCrowdedOutUnstakingPeriodLength(value: BN) {
    this.applicationCrowdedOutUnstakingPeriodLength = value;
  }

  public setApplicationExpiredUnstakingPeriodLength(value: BN) {
    this.applicationExpiredUnstakingPeriodLength = value;
  }

  public setRoleStakingPolicyAmount(value: BN) {
    this.roleStakingPolicyAmount = value;
  }

  public setRoleCrowdedOutUnstakingPeriodLength(value: BN) {
    this.roleCrowdedOutUnstakingPeriodLength = value;
  }

  public setRoleExpiredUnstakingPeriodLength(value: BN) {
    this.roleExpiredUnstakingPeriodLength = value;
  }

  public setSlashableMaxCount(value: BN) {
    this.slashableMaxCount = value;
  }

  public setSlashableMaxPercentPtsPerTime(value: BN) {
    this.slashableMaxPercentPtsPerTime = value;
  }

  public setSuccessfulApplicantApplicationStakeUnstakingPeriod(value: BN) {
    this.successfulApplicantApplicationStakeUnstakingPeriod = value;
  }

  public setFailedApplicantApplicationStakeUnstakingPeriod(value: BN) {
    this.failedApplicantApplicationStakeUnstakingPeriod = value;
  }

  public setFailedApplicantRoleStakeUnstakingPeriod(value: BN) {
    this.failedApplicantRoleStakeUnstakingPeriod = value;
  }

  public setTerminateApplicationStakeUnstakingPeriod(value: BN) {
    this.terminateApplicationStakeUnstakingPeriod = value;
  }

  public setTerminateRoleStakeUnstakingPeriod(value: BN) {
    this.terminateRoleStakeUnstakingPeriod = value;
  }

  public setExitRoleApplicationStakeUnstakingPeriod(value: BN) {
    this.exitRoleApplicationStakeUnstakingPeriod = value;
  }

  public setExitRoleStakeUnstakingPeriod(value: BN) {
    this.exitRoleStakeUnstakingPeriod = value;
  }

  public setText(value: string) {
    this.text = value;
  }

  public setOpeningType(value: string) {
    this.openingType = value;
  }

  constructor() {
    return;
  }

  public getActivateAt() {
    return this.activateAtBlock === undefined ? 'CurrentBlock' : { ExactBlock: this.activateAtBlock };
  }

  public getCommitment() {
    return {
      application_rationing_policy: { max_active_applicants: this.maxActiveApplicants },
      max_review_period_length: this.maxReviewPeriodLength,
      application_staking_policy: {
        amount: this.applicationStakingPolicyAmount,
        amount_mode: 'AtLeast',
        crowded_out_unstaking_period_length: this.applicationCrowdedOutUnstakingPeriodLength,
        review_period_expired_unstaking_period_length: this.applicationExpiredUnstakingPeriodLength,
      },
      role_staking_policy: {
        amount: this.roleStakingPolicyAmount,
        amount_mode: 'AtLeast',
        crowded_out_unstaking_period_length: this.roleCrowdedOutUnstakingPeriodLength,
        review_period_expired_unstaking_period_length: this.roleExpiredUnstakingPeriodLength,
      },
      role_slashing_terms: {
        Slashable: {
          max_count: this.slashableMaxCount,
          max_percent_pts_per_time: this.slashableMaxPercentPtsPerTime,
        },
      },
      fill_opening_successful_applicant_application_stake_unstaking_period: this
        .successfulApplicantApplicationStakeUnstakingPeriod,
      fill_opening_failed_applicant_application_stake_unstaking_period: this
        .failedApplicantApplicationStakeUnstakingPeriod,
      fill_opening_failed_applicant_role_stake_unstaking_period: this.failedApplicantRoleStakeUnstakingPeriod,
      terminate_application_stake_unstaking_period: this.terminateApplicationStakeUnstakingPeriod,
      terminate_role_stake_unstaking_period: this.terminateRoleStakeUnstakingPeriod,
      exit_role_application_stake_unstaking_period: this.exitRoleApplicationStakeUnstakingPeriod,
      exit_role_stake_unstaking_period: this.exitRoleStakeUnstakingPeriod,
    };
  }
}