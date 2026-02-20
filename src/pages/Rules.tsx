import { useState } from 'react';
import { Plus, Repeat } from 'lucide-react';
import { RuleCard, RuleFormModal, RuleFilters, type RuleFilter } from '../components/rules';
import { Button, EmptyState } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import type { Rule } from '../data/types';

export function Rules() {
  const { rules, toggleRuleStatus } = useAppContext();
  const [filter, setFilter] = useState<RuleFilter>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | undefined>(undefined);

  const counts = {
    all: rules.length,
    active: rules.filter((r) => r.status === 'active').length,
    paused: rules.filter((r) => r.status === 'paused').length,
  };

  const filteredRules = rules.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const handleEdit = (rule: Rule) => {
    setEditingRule(rule);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRule(undefined);
  };

  if (rules.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <EmptyState
          icon={<Repeat className="w-6 h-6" />}
          title="No recurring rules yet"
          description="Create rules for your regular expenses like rent, utilities, and subscriptions to track them automatically."
          action={{
            label: 'Create First Rule',
            onClick: () => setShowModal(true),
          }}
        />
        <RuleFormModal isOpen={showModal} onClose={handleCloseModal} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">
            Recurring Rules
          </h1>
          <p className="text-sm text-slate-500">
            Manage your recurring expense templates
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowModal(true)}
        >
          Create Rule
        </Button>
      </div>

      <RuleFilters value={filter} onChange={setFilter} counts={counts} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredRules.map((rule) => (
          <RuleCard
            key={rule.id}
            rule={rule}
            onEdit={() => handleEdit(rule)}
            onToggleStatus={() => toggleRuleStatus(rule.id)}
          />
        ))}
      </div>

      {filteredRules.length === 0 && rules.length > 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-slate-500">
            No {filter} rules found.
          </p>
        </div>
      )}

      <RuleFormModal
        isOpen={showModal}
        onClose={handleCloseModal}
        editingRule={editingRule}
      />
    </div>
  );
}
