import { Grid3X3 } from 'lucide-react';
import { SegmentedControl, AddDropdown } from '../ui';
import { useAppContext } from '../../context/AppContext';
import type { Period } from '../../data/types';

const periodOptions: { value: Period; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual' },
];

interface HeaderProps {
  onNewRule: () => void;
  onNewCheckIn: () => void;
}

export function Header({ onNewRule, onNewCheckIn }: HeaderProps) {
  const { selectedPeriod, setSelectedPeriod } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-600 text-white">
            <Grid3X3 className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold text-slate-900 hidden sm:block">
            Priority Budget Matrix
          </span>
        </div>

        <div className="hidden md:block">
          <SegmentedControl
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            size="sm"
          />
        </div>

        <AddDropdown onNewRule={onNewRule} onNewCheckIn={onNewCheckIn} />
      </div>
    </header>
  );
}
