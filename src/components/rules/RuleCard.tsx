import { Pause, Play, Pencil, Calendar } from 'lucide-react';
import { Card, Badge, Button } from '../ui';
import type { Rule } from '../../data/types';
import { formatCurrency, formatFrequency, formatNeedType, formatCostType } from '../../lib/formatters';
import { formatShortDate } from '../../lib/dateUtils';

interface RuleCardProps {
  rule: Rule;
  onEdit: () => void;
  onToggleStatus: () => void;
}

export function RuleCard({ rule, onEdit, onToggleStatus }: RuleCardProps) {
  const isPaused = rule.status === 'paused';

  return (
    <Card
      shadow="card"
      padding="none"
      className={isPaused ? 'opacity-75' : ''}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 truncate">
                {rule.name}
              </h3>
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  isPaused ? 'bg-slate-400' : 'bg-success-500'
                }`}
              />
            </div>
            {rule.description && (
              <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">
                {rule.description}
              </p>
            )}
          </div>
          <span className="text-lg font-semibold text-slate-900 flex-shrink-0">
            {formatCurrency(rule.amount)}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="default" size="sm">
            {formatFrequency(rule.frequency)}
          </Badge>
          <Badge
            variant={rule.needType === 'essential' ? 'essential' : 'nonEssential'}
            size="sm"
          >
            {formatNeedType(rule.needType)}
          </Badge>
          <Badge
            variant={rule.costType === 'fixed' ? 'fixed' : 'variable'}
            size="sm"
          >
            {formatCostType(rule.costType)}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>Next due: {formatShortDate(rule.nextDueDate)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 bg-slate-50">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Pencil className="w-3.5 h-3.5" />}
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={
            isPaused ? (
              <Play className="w-3.5 h-3.5" />
            ) : (
              <Pause className="w-3.5 h-3.5" />
            )
          }
          onClick={onToggleStatus}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      </div>
    </Card>
  );
}
