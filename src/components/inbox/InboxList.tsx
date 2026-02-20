import { InboxGroupSection } from './InboxGroupSection';
import { InboxListItem } from './InboxListItem';
import { useAppContext } from '../../context/AppContext';
import { getInboxBucket } from '../../lib/dateUtils';
import type { InboxItem, InboxBucket } from '../../data/types';

interface InboxListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InboxList({ selectedId, onSelect }: InboxListProps) {
  const { inboxItems, getRuleById } = useAppContext();

  const pendingItems = inboxItems.filter((i) => i.state === 'pending');

  const groupedItems: Record<InboxBucket, InboxItem[]> = {
    overdue: [],
    'due-today': [],
    upcoming: [],
  };

  pendingItems.forEach((item) => {
    const bucket = getInboxBucket(item.dueDate);
    groupedItems[bucket].push(item);
  });

  const buckets: InboxBucket[] = ['overdue', 'due-today', 'upcoming'];

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      {buckets.map((bucket) => (
        <InboxGroupSection
          key={bucket}
          bucket={bucket}
          count={groupedItems[bucket].length}
          defaultExpanded={bucket !== 'upcoming'}
        >
          {groupedItems[bucket].map((item) => {
            const rule = getRuleById(item.ruleId);
            return (
              <InboxListItem
                key={item.id}
                item={item}
                ruleName={rule?.name || 'Unknown Rule'}
                bucket={bucket}
                isSelected={item.id === selectedId}
                onClick={() => onSelect(item.id)}
              />
            );
          })}
        </InboxGroupSection>
      ))}
    </div>
  );
}
