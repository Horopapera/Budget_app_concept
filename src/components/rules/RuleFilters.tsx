import { SegmentedControl } from '../ui';

type RuleFilter = 'all' | 'active' | 'paused';

interface RuleFiltersProps {
  value: RuleFilter;
  onChange: (value: RuleFilter) => void;
  counts: { all: number; active: number; paused: number };
}

export function RuleFilters({ value, onChange, counts }: RuleFiltersProps) {
  const options: { value: RuleFilter; label: string }[] = [
    { value: 'all', label: `All (${counts.all})` },
    { value: 'active', label: `Active (${counts.active})` },
    { value: 'paused', label: `Paused (${counts.paused})` },
  ];

  return (
    <SegmentedControl options={options} value={value} onChange={onChange} size="sm" />
  );
}

export type { RuleFilter };
