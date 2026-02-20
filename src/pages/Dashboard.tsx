import { Wallet, CheckCircle, Clock, PiggyBank, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TotalsCard, PriorityMatrix } from '../components/dashboard';
import { EmptyState } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { convertAmountToPeriod, isDateInPeriod } from '../lib/periodUtils';
import { formatFrequency } from '../lib/formatters';

export function Dashboard() {
  const navigate = useNavigate();
  const { rules, inboxItems, actualRecords, selectedPeriod } = useAppContext();

  const activeRules = rules.filter((r) => r.status === 'active');
  const pendingInbox = inboxItems.filter((i) => i.state === 'pending');
  const periodActuals = actualRecords.filter((r) =>
    isDateInPeriod(r.recordedAt, selectedPeriod)
  );

  const totalBudget = activeRules.reduce(
    (sum, r) => sum + convertAmountToPeriod(r.amount, r.frequency, selectedPeriod),
    0
  );

  const totalConfirmed = periodActuals.reduce((sum, r) => sum + r.amount, 0);

  const totalPending = pendingInbox.reduce((sum, i) => sum + i.expectedAmount, 0);

  const remaining = Math.max(0, totalBudget - totalConfirmed - totalPending);

  if (rules.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <EmptyState
          icon={<Plus className="w-6 h-6" />}
          title="Set up your budget"
          description="Create recurring expense rules to start tracking your budget with the Priority Matrix."
          action={{
            label: 'Create First Rule',
            onClick: () => navigate('/rules'),
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">Dashboard</h1>
        <p className="text-sm text-slate-500">
          {formatFrequency(selectedPeriod)} overview of your budget
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TotalsCard
          label="Period Budget"
          amount={totalBudget}
          icon={<Wallet className="w-5 h-5" />}
          variant="default"
        />
        <TotalsCard
          label="Confirmed"
          amount={totalConfirmed}
          icon={<CheckCircle className="w-5 h-5" />}
          variant="accent"
        />
        <TotalsCard
          label="Pending"
          amount={totalPending}
          icon={<Clock className="w-5 h-5" />}
          variant="warning"
        />
        <TotalsCard
          label="Remaining"
          amount={remaining}
          icon={<PiggyBank className="w-5 h-5" />}
          variant="success"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Priority Matrix
        </h2>
        <PriorityMatrix />
      </div>
    </div>
  );
}
