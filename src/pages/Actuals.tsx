import { useState } from 'react';
import { Plus, Receipt } from 'lucide-react';
import {
  ActualsTable,
  ActualsFilters,
  VariableCheckInModal,
  type TimeFilter,
  type NeedFilter,
} from '../components/actuals';
import { Button, EmptyState } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { isDateInPeriod, getPeriodDateRange } from '../lib/periodUtils';
import type { Period } from '../data/types';

export function Actuals() {
  const { actualRecords, selectedPeriod } = useAppContext();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('this-period');
  const [needFilter, setNeedFilter] = useState<NeedFilter>('all');
  const [showModal, setShowModal] = useState(false);

  const getLastPeriod = (period: Period): { start: Date; end: Date } => {
    const { start, end } = getPeriodDateRange(period);
    const duration = end.getTime() - start.getTime();
    const lastStart = new Date(start.getTime() - duration - 86400000);
    const lastEnd = new Date(start.getTime() - 86400000);
    return { start: lastStart, end: lastEnd };
  };

  const filterByTime = (recordedAt: string): boolean => {
    if (timeFilter === 'all-time') return true;
    if (timeFilter === 'this-period') {
      return isDateInPeriod(recordedAt, selectedPeriod);
    }
    const { start, end } = getLastPeriod(selectedPeriod);
    const date = new Date(recordedAt);
    return date >= start && date <= end;
  };

  const filteredRecords = actualRecords
    .filter((r) => filterByTime(r.recordedAt))
    .filter((r) => needFilter === 'all' || r.needType === needFilter)
    .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());

  if (actualRecords.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <EmptyState
          icon={<Receipt className="w-6 h-6" />}
          title="No records yet"
          description="Confirmed expenses and variable check-ins will appear here. Start by confirming items from your inbox."
          action={{
            label: 'Add Variable Check-in',
            onClick: () => setShowModal(true),
          }}
        />
        <VariableCheckInModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">
            Confirmed Records
          </h1>
          <p className="text-sm text-slate-500">
            View all confirmed expenses and variable check-ins
          </p>
        </div>
        <Button
          variant="secondary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowModal(true)}
        >
          Add Variable Check-in
        </Button>
      </div>

      <ActualsFilters
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
        needFilter={needFilter}
        onNeedFilterChange={setNeedFilter}
      />

      {filteredRecords.length > 0 ? (
        <ActualsTable records={filteredRecords} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500">
            No records match your filters.
          </p>
        </div>
      )}

      <VariableCheckInModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
