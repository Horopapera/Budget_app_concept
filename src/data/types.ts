export type Frequency = 'weekly' | 'fortnightly' | 'monthly' | 'annual';
export type NeedType = 'essential' | 'nonEssential';
export type CostType = 'fixed' | 'variable';
export type RuleStatus = 'active' | 'paused';
export type InboxState = 'pending' | 'confirmed' | 'skipped' | 'delayed';
export type ActualSource = 'recurring-confirmed' | 'variable-checkin';
export type FindingType = 'BILL_INCREASE' | 'CATEGORY_TREND_UP' | 'SPIKE_DETECTED' | 'PERIOD_COMPARISON';
export type FindingSeverity = 'info' | 'warning' | 'attention';
export type Period = 'weekly' | 'fortnightly' | 'monthly' | 'annual';

export interface Rule {
  id: string;
  name: string;
  description: string;
  amount: number;
  frequency: Frequency;
  needType: NeedType;
  costType: CostType;
  status: RuleStatus;
  nextDueDate: string;
  createdAt: string;
}

export interface InboxItem {
  id: string;
  ruleId: string;
  dueDate: string;
  originalDueDate: string;
  expectedAmount: number;
  state: InboxState;
  notes: string | null;
}

export interface ActualRecord {
  id: string;
  ruleId: string | null;
  inboxItemId: string | null;
  description: string;
  amount: number;
  needType: NeedType;
  costType: CostType;
  source: ActualSource;
  recordedAt: string;
}

export interface Finding {
  id: string;
  type: FindingType;
  title: string;
  description: string;
  severity: FindingSeverity;
  relatedRuleIds: string[];
  detectedAt: string;
  periodStart: string;
  periodEnd: string;
}

export type InboxBucket = 'overdue' | 'due-today' | 'upcoming';
