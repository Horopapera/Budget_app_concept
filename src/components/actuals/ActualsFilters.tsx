import { SegmentedControl } from '../ui';
import type { NeedType } from '../../data/types';

type TimeFilter = 'this-period' | 'last-period' | 'all-time';
type NeedFilter = 'all' | NeedType;

interface ActualsFiltersProps {
  timeFilter: TimeFilter;
  onTimeFilterChange: (value: TimeFilter) => void;
  needFilter: NeedFilter;
  onNeedFilterChange: (value: NeedFilter) => void;
}

const timeOptions: { value: TimeFilter; label: string }[] = [
  { value: 'this-period', label: 'This Period' },
  { value: 'last-period', label: 'Last Period' },
  { value: 'all-time', label: 'All Time' },
];

const needOptions: { value: NeedFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'essential', label: 'Essential' },
  { value: 'nonEssential', label: 'Non-Essential' },
];

export function ActualsFilters({
  timeFilter,
  onTimeFilterChange,
  needFilter,
  onNeedFilterChange,
}: ActualsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SegmentedControl
        options={timeOptions}
        value={timeFilter}
        onChange={onTimeFilterChange}
        size="sm"
      />
      <SegmentedControl
        options={needOptions}
        value={needFilter}
        onChange={onNeedFilterChange}
        size="sm"
      />
    </div>
  );
}

export type { TimeFilter, NeedFilter };
