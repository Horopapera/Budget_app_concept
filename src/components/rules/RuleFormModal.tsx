import { useState } from 'react';
import { Modal, Button, SegmentedControl, DateInput } from '../ui';
import { useAppContext } from '../../context/AppContext';
import type { Rule, Frequency, NeedType, CostType } from '../../data/types';
import { getTodayISO } from '../../lib/dateUtils';

interface RuleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingRule?: Rule;
}

const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual' },
];

const needTypeOptions: { value: NeedType; label: string }[] = [
  { value: 'essential', label: 'Essential' },
  { value: 'nonEssential', label: 'Non-Essential' },
];

const costTypeOptions: { value: CostType; label: string }[] = [
  { value: 'fixed', label: 'Fixed' },
  { value: 'variable', label: 'Variable' },
];

export function RuleFormModal({ isOpen, onClose, editingRule }: RuleFormModalProps) {
  const { addRule, updateRule } = useAppContext();

  const [name, setName] = useState(editingRule?.name || '');
  const [description, setDescription] = useState(editingRule?.description || '');
  const [amount, setAmount] = useState(editingRule?.amount?.toString() || '');
  const [frequency, setFrequency] = useState<Frequency>(
    editingRule?.frequency || 'monthly'
  );
  const [needType, setNeedType] = useState<NeedType>(
    editingRule?.needType || 'essential'
  );
  const [costType, setCostType] = useState<CostType>(
    editingRule?.costType || 'fixed'
  );
  const [nextDueDate, setNextDueDate] = useState(
    editingRule?.nextDueDate || getTodayISO()
  );

  const resetForm = () => {
    setName('');
    setDescription('');
    setAmount('');
    setFrequency('monthly');
    setNeedType('essential');
    setCostType('fixed');
    setNextDueDate(getTodayISO());
  };

  const handleSubmit = () => {
    if (!name.trim() || !amount) return;

    const ruleData = {
      name: name.trim(),
      description: description.trim(),
      amount: parseFloat(amount),
      frequency,
      needType,
      costType,
      status: 'active' as const,
      nextDueDate,
    };

    if (editingRule) {
      updateRule(editingRule.id, ruleData);
    } else {
      addRule(ruleData);
    }

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingRule ? 'Edit Rule' : 'New Rule'}
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingRule ? 'Save Changes' : 'Create Rule'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Electricity Bill"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            rows={2}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-7 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Frequency
          </label>
          <SegmentedControl
            options={frequencyOptions}
            value={frequency}
            onChange={setFrequency}
            size="sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Need Type
          </label>
          <SegmentedControl
            options={needTypeOptions}
            value={needType}
            onChange={setNeedType}
            size="sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cost Type
          </label>
          <SegmentedControl
            options={costTypeOptions}
            value={costType}
            onChange={setCostType}
            size="sm"
          />
        </div>

        <DateInput
          label="Next Due Date"
          value={nextDueDate}
          onChange={setNextDueDate}
        />
      </div>
    </Modal>
  );
}
