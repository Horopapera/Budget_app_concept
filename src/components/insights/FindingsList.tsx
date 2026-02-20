import { FindingCard } from './FindingCard';
import type { Finding } from '../../data/types';

interface FindingsListProps {
  findings: Finding[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const severityOrder = { attention: 0, warning: 1, info: 2 };

export function FindingsList({ findings, selectedId, onSelect }: FindingsListProps) {
  const sortedFindings = [...findings].sort((a, b) => {
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (severityDiff !== 0) return severityDiff;
    return new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime();
  });

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      {sortedFindings.map((finding) => (
        <FindingCard
          key={finding.id}
          finding={finding}
          isSelected={finding.id === selectedId}
          onClick={() => onSelect(finding.id)}
        />
      ))}
    </div>
  );
}
