import { TrendingUp, AlertTriangle, BarChart2, ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui';
import type { Finding, FindingType, FindingSeverity } from '../../data/types';
import { getRelativeDate } from '../../lib/dateUtils';

interface FindingCardProps {
  finding: Finding;
  isSelected: boolean;
  onClick: () => void;
}

const typeIcons: Record<FindingType, typeof TrendingUp> = {
  BILL_INCREASE: TrendingUp,
  CATEGORY_TREND_UP: ArrowUpRight,
  SPIKE_DETECTED: AlertTriangle,
  PERIOD_COMPARISON: BarChart2,
};

const severityVariants: Record<FindingSeverity, 'default' | 'warning' | 'danger'> = {
  info: 'default',
  warning: 'warning',
  attention: 'danger',
};

const severityLabels: Record<FindingSeverity, string> = {
  info: 'Info',
  warning: 'Warning',
  attention: 'Attention',
};

export function FindingCard({ finding, isSelected, onClick }: FindingCardProps) {
  const Icon = typeIcons[finding.type];

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 border-b border-slate-100 transition-colors
        ${isSelected ? 'bg-accent-50' : 'bg-white hover:bg-slate-50'}
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0
            ${
              finding.severity === 'attention'
                ? 'bg-danger-100 text-danger-600'
                : finding.severity === 'warning'
                ? 'bg-warning-100 text-warning-600'
                : 'bg-slate-100 text-slate-600'
            }
          `}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium text-slate-900 line-clamp-2">
              {finding.title}
            </h4>
            <Badge
              variant={severityVariants[finding.severity]}
              size="sm"
              className="flex-shrink-0"
            >
              {severityLabels[finding.severity]}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Detected {getRelativeDate(finding.detectedAt)}
          </p>
        </div>
      </div>
    </button>
  );
}
