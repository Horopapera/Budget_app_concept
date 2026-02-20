import { MatrixQuadrant } from './MatrixQuadrant';
import { useAppContext } from '../../context/AppContext';
import { convertAmountToPeriod, isDateInPeriod } from '../../lib/periodUtils';

export function PriorityMatrix() {
  const { rules, actualRecords, selectedPeriod } = useAppContext();

  const activeRules = rules.filter((r) => r.status === 'active');
  const periodActuals = actualRecords.filter((r) =>
    isDateInPeriod(r.recordedAt, selectedPeriod)
  );

  const calculateAllocated = (
    needType: 'essential' | 'nonEssential',
    costType: 'fixed' | 'variable'
  ) => {
    return activeRules
      .filter((r) => r.needType === needType && r.costType === costType)
      .reduce(
        (sum, r) => sum + convertAmountToPeriod(r.amount, r.frequency, selectedPeriod),
        0
      );
  };

  const calculateConfirmed = (
    needType: 'essential' | 'nonEssential',
    costType: 'fixed' | 'variable'
  ) => {
    return periodActuals
      .filter((r) => r.needType === needType && r.costType === costType)
      .reduce((sum, r) => sum + r.amount, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-slate-200 overflow-hidden">
      <div className="flex items-center border-b border-slate-200">
        <div className="w-24 lg:w-32 flex-shrink-0" />
        <div className="flex-1 grid grid-cols-2 text-center">
          <div className="py-3 border-r border-slate-200">
            <span className="text-sm font-semibold text-slate-700">
              Essential
            </span>
            <span className="block text-xs text-slate-500">Needs</span>
          </div>
          <div className="py-3">
            <span className="text-sm font-semibold text-slate-700">
              Non-Essential
            </span>
            <span className="block text-xs text-slate-500">Wants</span>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-24 lg:w-32 flex-shrink-0 flex flex-col border-r border-slate-200">
          <div className="flex-1 flex items-center justify-center p-3 border-b border-slate-200">
            <div className="text-center">
              <span className="text-sm font-semibold text-slate-700 block">
                Fixed
              </span>
              <span className="text-xs text-slate-500">Obligatory</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-3">
            <div className="text-center">
              <span className="text-sm font-semibold text-slate-700 block">
                Variable
              </span>
              <span className="text-xs text-slate-500">Discretionary</span>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 grid-rows-2">
          <MatrixQuadrant
            position="top-left"
            label="Essential Fixed"
            sublabel="Rent, utilities, insurance"
            allocated={calculateAllocated('essential', 'fixed')}
            confirmed={calculateConfirmed('essential', 'fixed')}
          />
          <MatrixQuadrant
            position="top-right"
            label="Non-Essential Fixed"
            sublabel="Subscriptions, memberships"
            allocated={calculateAllocated('nonEssential', 'fixed')}
            confirmed={calculateConfirmed('nonEssential', 'fixed')}
          />
          <MatrixQuadrant
            position="bottom-left"
            label="Essential Variable"
            sublabel="Groceries, fuel, medical"
            allocated={calculateAllocated('essential', 'variable')}
            confirmed={calculateConfirmed('essential', 'variable')}
          />
          <MatrixQuadrant
            position="bottom-right"
            label="Non-Essential Variable"
            sublabel="Dining, entertainment"
            allocated={calculateAllocated('nonEssential', 'variable')}
            confirmed={calculateConfirmed('nonEssential', 'variable')}
          />
        </div>
      </div>
    </div>
  );
}
