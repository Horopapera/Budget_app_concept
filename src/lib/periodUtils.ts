import type { Period, Frequency } from '../data/types';

export function getMultiplierForPeriod(
  frequency: Frequency,
  targetPeriod: Period
): number {
  const weeklyAmounts: Record<Frequency, number> = {
    weekly: 1,
    fortnightly: 0.5,
    monthly: 12 / 52,
    annual: 1 / 52,
  };

  const periodMultipliers: Record<Period, number> = {
    weekly: 1,
    fortnightly: 2,
    monthly: 52 / 12,
    annual: 52,
  };

  return weeklyAmounts[frequency] * periodMultipliers[targetPeriod];
}

export function convertAmountToPeriod(
  amount: number,
  frequency: Frequency,
  targetPeriod: Period
): number {
  const multiplier = getMultiplierForPeriod(frequency, targetPeriod);
  return Math.round(amount * multiplier * 100) / 100;
}

export function getPeriodDateRange(period: Period): { start: Date; end: Date } {
  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);

  switch (period) {
    case 'weekly':
      start.setDate(today.getDate() - today.getDay());
      end.setDate(start.getDate() + 6);
      break;
    case 'fortnightly':
      start.setDate(today.getDate() - today.getDay() - 7);
      end.setDate(start.getDate() + 13);
      break;
    case 'monthly':
      start.setDate(1);
      end.setMonth(today.getMonth() + 1);
      end.setDate(0);
      break;
    case 'annual':
      start.setMonth(0, 1);
      end.setMonth(11, 31);
      break;
  }

  return { start, end };
}

export function isDateInPeriod(dateString: string, period: Period): boolean {
  const date = new Date(dateString);
  const { start, end } = getPeriodDateRange(period);
  return date >= start && date <= end;
}
