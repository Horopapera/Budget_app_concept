import { useState } from 'react';
import { Modal, Button, SegmentedControl, DateInput } from '../ui';
import { useAppContext } from '../../context/AppContext';
import type { NeedType, CostType } from '../../data/types';
import { getTodayISO } from '../../lib/dateUtils';

interface VariableCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const needTypeOptions: { value: NeedType; label: string }[] = [
  { value: 'essential', label: 'Essential' },
  { value: 'nonEssential', label: 'Non-Essential' },
];

const costTypeOptions: { value: CostType; label: string }[] = [
  { value: 'fixed', label: 'Fixed' },
  { value: 'variable', label: 'Variable' },
];

export function VariableCheckInModal({ isOpen, onClose }: VariableCheckInModalProps) {
  const { addVariableCheckIn } = useAppContext();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [needType, setNeedType] = useState<NeedType>('nonEssential');
  const [costType, setCostType] = useState<CostType>('variable');
  const [recordedAt, setRecordedAt] = useState(getTodayISO());

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setNeedType('nonEssential');
    setCostType('variable');
    setRecordedAt(getTodayISO());
  };

  const handleSubmit = () => {
    if (!description.trim() || !amount) return;

    addVariableCheckIn({
      description: description.trim(),
      amount: parseFloat(amount),
      needType,
      costType,
      recordedAt,
    });

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
      title="New Variable Check-in"
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Check-in
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Coffee shop, Parking"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
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
          label="Date"
          value={recordedAt}
          onChange={setRecordedAt}
        />
      </div>
    </Modal>
  );
}
