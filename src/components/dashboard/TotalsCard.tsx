import { Card } from '../ui';
import { formatCurrency } from '../../lib/formatters';
import type { ReactNode } from 'react';

interface TotalsCardProps {
  label: string;
  amount: number;
  icon: ReactNode;
  variant?: 'default' | 'accent' | 'warning' | 'success';
}

const variantStyles = {
  default: {
    icon: 'bg-slate-100 text-slate-600',
    amount: 'text-slate-900',
  },
  accent: {
    icon: 'bg-accent-100 text-accent-600',
    amount: 'text-accent-700',
  },
  warning: {
    icon: 'bg-warning-100 text-warning-600',
    amount: 'text-warning-700',
  },
  success: {
    icon: 'bg-success-100 text-success-600',
    amount: 'text-success-700',
  },
};

export function TotalsCard({
  label,
  amount,
  icon,
  variant = 'default',
}: TotalsCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card shadow="card" padding="md">
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${styles.icon}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500 mb-0.5">{label}</p>
          <p className={`text-xl font-semibold ${styles.amount}`}>
            {formatCurrency(amount)}
          </p>
        </div>
      </div>
    </Card>
  );
}
