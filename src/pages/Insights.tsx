import { useState } from 'react';
import { Lightbulb, Sparkles, BarChart2 } from 'lucide-react';
import { FindingsList, FindingDetail } from '../components/insights';
import { EmptyState, Badge } from '../components/ui';
import { useAppContext } from '../context/AppContext';

export function Insights() {
  const { findings, actualRecords } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedFinding = findings.find((f) => f.id === selectedId) || null;

  if (actualRecords.length < 10) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <EmptyState
          icon={<BarChart2 className="w-6 h-6" />}
          title="Not enough data yet"
          description="Continue tracking your expenses to unlock insights. We need at least a few weeks of data to detect trends and patterns."
        />
      </div>
    );
  }

  if (findings.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <EmptyState
          icon={<Lightbulb className="w-6 h-6" />}
          title="No findings yet"
          description="Your spending patterns look stable. We'll notify you when we detect trends, spikes, or other notable patterns."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Insights</h1>
          <p className="text-sm text-slate-500">
            {findings.length} finding{findings.length !== 1 ? 's' : ''} detected
          </p>
        </div>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg cursor-not-allowed opacity-60"
          title="AI-powered insights coming soon"
        >
          <Sparkles className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">AI Insights</span>
          <Badge variant="default" size="sm">
            Soon
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[calc(100vh-200px)]">
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden">
          <div className="p-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Findings
              </span>
            </div>
          </div>
          <FindingsList
            findings={findings}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="lg:col-span-3">
          <FindingDetail finding={selectedFinding} />
        </div>
      </div>
    </div>
  );
}
