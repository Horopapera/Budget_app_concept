import { formatCurrency } from '../../lib/formatters';

interface MatrixQuadrantProps {
  label: string;
  sublabel: string;
  allocated: number;
  confirmed: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const positionStyles = {
  'top-left': 'rounded-tl-xl border-r border-b',
  'top-right': 'rounded-tr-xl border-b',
  'bottom-left': 'rounded-bl-xl border-r',
  'bottom-right': 'rounded-br-xl',
};

export function MatrixQuadrant({
  label,
  sublabel,
  allocated,
  confirmed,
  position,
}: MatrixQuadrantProps) {
  const percentage = allocated > 0 ? Math.min((confirmed / allocated) * 100, 100) : 0;
  const isOverBudget = confirmed > allocated && allocated > 0;

  return (
    <div
      className={`
        bg-white p-4 lg:p-5 border-slate-200
        ${positionStyles[position]}
      `}
    >
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-slate-800">{label}</h4>
        <p className="text-xs text-slate-500">{sublabel}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-500">Allocated</span>
          <span className="text-sm font-medium text-slate-700">
            {formatCurrency(allocated)}
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-500">Confirmed</span>
          <span
            className={`text-sm font-semibold ${
              isOverBudget ? 'text-danger-600' : 'text-slate-900'
            }`}
          >
            {formatCurrency(confirmed)}
          </span>
        </div>

        <div className="mt-3">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget ? 'bg-danger-500' : 'bg-accent-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1 text-right">
            {percentage.toFixed(0)}% used
          </p>
        </div>
      </div>
    </div>
  );
}
