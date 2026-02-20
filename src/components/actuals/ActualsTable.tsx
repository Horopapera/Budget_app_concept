import { ActualsRow } from './ActualsRow';
import type { ActualRecord } from '../../data/types';
import { formatCurrency } from '../../lib/formatters';

interface ActualsTableProps {
  records: ActualRecord[];
}

export function ActualsTable({ records }: ActualsTableProps) {
  const total = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Description
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Need Type
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Cost Type
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Source
              </th>
              <th className="py-3 px-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <ActualsRow key={record.id} record={record} />
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 border-t border-slate-200">
              <td
                colSpan={5}
                className="py-3 px-4 text-sm font-semibold text-slate-700"
              >
                Total ({records.length} records)
              </td>
              <td className="py-3 px-4 text-right text-base font-bold text-slate-900">
                {formatCurrency(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
