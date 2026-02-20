import { useState } from 'react';
import { CheckCircle2, Inbox as InboxIcon } from 'lucide-react';
import { InboxList, InboxDetail } from '../components/inbox';
import { EmptyState } from '../components/ui';
import { useAppContext } from '../context/AppContext';

export function Inbox() {
  const { inboxItems } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const pendingItems = inboxItems.filter((i) => i.state === 'pending');
  const selectedItem = inboxItems.find((i) => i.id === selectedId) || null;

  if (pendingItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <EmptyState
          icon={<CheckCircle2 className="w-6 h-6" />}
          title="All caught up!"
          description="You've processed all pending expense confirmations. Check back later when new items are due."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">Inbox</h1>
        <p className="text-sm text-slate-500">
          {pendingItems.length} item{pendingItems.length !== 1 ? 's' : ''} pending
          confirmation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[calc(100vh-200px)]">
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden">
          <div className="p-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <InboxIcon className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                To Confirm
              </span>
            </div>
          </div>
          <InboxList selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className="lg:col-span-3">
          <InboxDetail item={selectedItem} />
        </div>
      </div>
    </div>
  );
}
