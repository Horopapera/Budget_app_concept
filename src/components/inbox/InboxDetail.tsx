import { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button, Badge, DateInput, EmptyState } from '../ui';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../lib/formatters';
import { formatDate, getRelativeDate, getTodayISO, getInboxBucket } from '../../lib/dateUtils';
import type { InboxItem } from '../../data/types';

interface InboxDetailProps {
  item: InboxItem | null;
}

export function InboxDetail({ item }: InboxDetailProps) {
  const { getRuleById, confirmInboxItem, updateInboxItemState, delayInboxItem } =
    useAppContext();

  const [editAmount, setEditAmount] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [showDelay, setShowDelay] = useState(false);
  const [delayDate, setDelayDate] = useState('');

  if (!item) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
        <EmptyState
          icon={<Calendar className="w-6 h-6" />}
          title="Select an item"
          description="Choose an item from the list to view details and take action."
        />
      </div>
    );
  }

  const rule = getRuleById(item.ruleId);
  const bucket = getInboxBucket(item.dueDate);
  const wasDelayed = item.dueDate !== item.originalDueDate;

  const handleConfirm = () => {
    const finalAmount = isEditing && editAmount ? parseFloat(editAmount) : item.expectedAmount;
    confirmInboxItem(item.id, finalAmount);
    setIsEditing(false);
    setEditAmount('');
  };

  const handleSkip = () => {
    updateInboxItemState(item.id, 'skipped');
  };

  const handleDelay = () => {
    if (delayDate) {
      delayInboxItem(item.id, delayDate);
      setShowDelay(false);
      setDelayDate('');
    }
  };

  const startEdit = () => {
    setEditAmount(item.expectedAmount.toString());
    setIsEditing(true);
  };

  return (
    <div className="h-full bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden flex flex-col">
      <div className="p-4 lg:p-5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {rule?.name || 'Unknown Rule'}
            </h3>
            {rule?.description && (
              <p className="text-sm text-slate-500 mt-1">{rule.description}</p>
            )}
          </div>
          <Badge
            variant={bucket === 'overdue' ? 'danger' : bucket === 'due-today' ? 'accent' : 'default'}
          >
            {bucket === 'overdue' ? 'Overdue' : bucket === 'due-today' ? 'Due Today' : 'Upcoming'}
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-5 space-y-5 overflow-y-auto">
        <div>
          <label className="text-sm font-medium text-slate-500 block mb-2">
            Expected Amount
          </label>
          {isEditing ? (
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                $
              </span>
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-lg font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                autoFocus
              />
            </div>
          ) : (
            <p className="text-2xl font-semibold text-slate-900">
              {formatCurrency(item.expectedAmount)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-500 block mb-1">
              Due Date
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-900">
                {formatDate(item.dueDate)}
              </span>
            </div>
            <p
              className={`text-xs mt-1 ${
                bucket === 'overdue' ? 'text-danger-600' : 'text-slate-500'
              }`}
            >
              {getRelativeDate(item.dueDate)}
            </p>
          </div>

          {wasDelayed && (
            <div>
              <label className="text-sm font-medium text-slate-500 block mb-1">
                Originally Due
              </label>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-warning-500" />
                <span className="text-sm text-slate-700">
                  {formatDate(item.originalDueDate)}
                </span>
              </div>
              <p className="text-xs text-warning-600 mt-1">Delayed</p>
            </div>
          )}
        </div>

        {item.notes && (
          <div>
            <label className="text-sm font-medium text-slate-500 block mb-1">
              Notes
            </label>
            <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
              <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{item.notes}</p>
            </div>
          </div>
        )}

        {showDelay && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Delay until
            </label>
            <DateInput
              value={delayDate}
              onChange={setDelayDate}
              min={getTodayISO()}
            />
            <div className="flex gap-2 mt-3">
              <Button variant="secondary" size="sm" onClick={handleDelay}>
                Confirm Delay
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowDelay(false);
                  setDelayDate('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 lg:p-5 border-t border-slate-100 bg-slate-50">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={handleConfirm}>
            {isEditing ? 'Confirm Edited' : 'Confirm'}
          </Button>
          {!isEditing && (
            <Button variant="secondary" onClick={startEdit}>
              Edit + Confirm
            </Button>
          )}
          {isEditing && (
            <Button
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setEditAmount('');
              }}
            >
              Cancel Edit
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setShowDelay(true);
              setDelayDate('');
            }}
          >
            Delay
          </Button>
        </div>
      </div>
    </div>
  );
}
