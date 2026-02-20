export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatFrequency(frequency: string): string {
  const labels: Record<string, string> = {
    weekly: 'Weekly',
    fortnightly: 'Fortnightly',
    monthly: 'Monthly',
    annual: 'Annual',
  };
  return labels[frequency] || frequency;
}

export function formatNeedType(needType: string): string {
  return needType === 'essential' ? 'Essential' : 'Non-Essential';
}

export function formatCostType(costType: string): string {
  return costType === 'fixed' ? 'Fixed' : 'Variable';
}

export function formatSource(source: string): string {
  return source === 'recurring-confirmed' ? 'Recurring' : 'Variable';
}
