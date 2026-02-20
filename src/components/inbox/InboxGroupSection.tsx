import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Badge } from '../ui';
import type { InboxBucket } from '../../data/types';

interface InboxGroupSectionProps {
  bucket: InboxBucket;
  count: number;
  children: ReactNode;
  defaultExpanded?: boolean;
}

const bucketConfig: Record<
  InboxBucket,
  { label: string; variant: 'danger' | 'accent' | 'default' }
> = {
  overdue: { label: 'Overdue', variant: 'danger' },
  'due-today': { label: 'Due Today', variant: 'accent' },
  upcoming: { label: 'Upcoming', variant: 'default' },
};

export function InboxGroupSection({
  bucket,
  count,
  children,
  defaultExpanded = true,
}: InboxGroupSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const config = bucketConfig[bucket];

  if (count === 0) return null;

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
          <span className="text-sm font-medium text-slate-700">
            {config.label}
          </span>
        </div>
        <Badge variant={config.variant} size="sm">
          {count}
        </Badge>
      </button>

      {isExpanded && <div className="divide-y divide-slate-100">{children}</div>}
    </div>
  );
}
