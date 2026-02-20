import type { InboxItem, InboxBucket } from '../../data/types';
import { formatCurrency } from '../../lib/formatters';
import { getRelativeDate } from '../../lib/dateUtils';

interface InboxListItemProps {
  item: InboxItem;
  ruleName: string;
  bucket: InboxBucket;
  isSelected: boolean;
  onClick: () => void;
}

const bucketStyles: Record<InboxBucket, string> = {
  overdue: 'border-l-danger-500',
  'due-today': 'border-l-accent-500',
  upcoming: 'border-l-slate-300',
};

export function InboxListItem({
  item,
  ruleName,
  bucket,
  isSelected,
  onClick,
}: InboxListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-3 border-l-4 transition-colors
        ${bucketStyles[bucket]}
        ${
          isSelected
            ? 'bg-accent-50'
            : 'bg-white hover:bg-slate-50'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">
            {ruleName}
          </p>
          <p
            className={`text-xs mt-0.5 ${
              bucket === 'overdue' ? 'text-danger-600' : 'text-slate-500'
            }`}
          >
            {getRelativeDate(item.dueDate)}
          </p>
        </div>
        <span className="text-sm font-semibold text-slate-700 flex-shrink-0">
          {formatCurrency(item.expectedAmount)}
        </span>
      </div>
    </button>
  );
}
