import { Calendar, Link as LinkIcon, BarChart, Lightbulb } from 'lucide-react';
import { Badge, Button, EmptyState } from '../ui';
import { useAppContext } from '../../context/AppContext';
import type { Finding, FindingSeverity } from '../../data/types';
import { formatDate } from '../../lib/dateUtils';

interface FindingDetailProps {
  finding: Finding | null;
}

const severityVariants: Record<FindingSeverity, 'default' | 'warning' | 'danger'> = {
  info: 'default',
  warning: 'warning',
  attention: 'danger',
};

const severityLabels: Record<FindingSeverity, string> = {
  info: 'Info',
  warning: 'Warning',
  attention: 'Attention',
};

export function FindingDetail({ finding }: FindingDetailProps) {
  const { getRuleById } = useAppContext();

  if (!finding) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
        <EmptyState
          icon={<Lightbulb className="w-6 h-6" />}
          title="Select a finding"
          description="Choose a finding from the list to view details and related information."
        />
      </div>
    );
  }

  const relatedRules = finding.relatedRuleIds
    .map((id) => getRuleById(id))
    .filter(Boolean);

  return (
    <div className="h-full bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden flex flex-col">
      <div className="p-4 lg:p-5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">
            {finding.title}
          </h3>
          <Badge variant={severityVariants[finding.severity]}>
            {severityLabels[finding.severity]}
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-5 space-y-5 overflow-y-auto">
        <div>
          <label className="text-sm font-medium text-slate-500 block mb-2">
            Description
          </label>
          <p className="text-sm text-slate-700 leading-relaxed">
            {finding.description}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-500 block mb-2">
            Period Analyzed
          </label>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>
              {formatDate(finding.periodStart)} - {formatDate(finding.periodEnd)}
            </span>
          </div>
        </div>

        {relatedRules.length > 0 && (
          <div>
            <label className="text-sm font-medium text-slate-500 block mb-2">
              Related Rules
            </label>
            <div className="space-y-2">
              {relatedRules.map((rule) => (
                <div
                  key={rule!.id}
                  className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"
                >
                  <LinkIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">
                    {rule!.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-slate-500 block mb-2">
            Visualization
          </label>
          <div className="h-40 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center">
            <div className="text-center">
              <BarChart className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Chart coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-5 border-t border-slate-100 bg-slate-50">
        <Button variant="ghost" size="sm">
          Mark as Reviewed
        </Button>
      </div>
    </div>
  );
}
