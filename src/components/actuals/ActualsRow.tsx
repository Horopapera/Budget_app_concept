import { Badge } from '../ui';
import type { ActualRecord } from '../../data/types';
import { formatCurrency, formatNeedType, formatCostType, formatSource } from '../../lib/formatters';
import { formatShortDate } from '../../lib/dateUtils';

interface ActualsRowProps {
  record: ActualRecord;
}

export function ActualsRow({ record }: ActualsRowProps) {
  const isVariable = record.source === 'variable-checkin';

  return (
    <tr className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${isVariable ? 'bg-slate-25' : ''}`}>
      <td className="py-3 px-4 text-sm text-slate-600">
        {formatShortDate(record.recordedAt)}
      </td>
      <td className="py-3 px-4">
        <span className="text-sm font-medium text-slate-900">
          {record.description}
        </span>
      </td>
      <td className="py-3 px-4">
        <Badge
          variant={record.needType === 'essential' ? 'essential' : 'nonEssential'}
          size="sm"
        >
          {formatNeedType(record.needType)}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <Badge
          variant={record.costType === 'fixed' ? 'fixed' : 'variable'}
          size="sm"
        >
          {formatCostType(record.costType)}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <Badge variant={isVariable ? 'warning' : 'accent'} size="sm">
          {formatSource(record.source)}
        </Badge>
      </td>
      <td className="py-3 px-4 text-right">
        <span className="text-sm font-semibold text-slate-900">
          {formatCurrency(record.amount)}
        </span>
      </td>
    </tr>
  );
}
