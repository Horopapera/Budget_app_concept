import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  Rule,
  InboxItem,
  ActualRecord,
  Finding,
  Period,
  InboxState,
} from '../data/types';
import {
  rules as seedRules,
  inboxItems as seedInboxItems,
  actualRecords as seedActualRecords,
  findings as seedFindings,
} from '../data/seedData';
import { getTodayISO } from '../lib/dateUtils';

interface AppContextValue {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  rules: Rule[];
  inboxItems: InboxItem[];
  actualRecords: ActualRecord[];
  findings: Finding[];
  addRule: (rule: Omit<Rule, 'id' | 'createdAt'>) => void;
  updateRule: (id: string, updates: Partial<Rule>) => void;
  toggleRuleStatus: (id: string) => void;
  getRuleById: (id: string) => Rule | undefined;
  updateInboxItemState: (id: string, state: InboxState) => void;
  delayInboxItem: (id: string, newDueDate: string) => void;
  confirmInboxItem: (id: string, finalAmount: number) => void;
  addVariableCheckIn: (
    record: Omit<ActualRecord, 'id' | 'ruleId' | 'inboxItemId' | 'source'>
  ) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('monthly');
  const [rules, setRules] = useState<Rule[]>(seedRules);
  const [inboxItems, setInboxItems] = useState<InboxItem[]>(seedInboxItems);
  const [actualRecords, setActualRecords] =
    useState<ActualRecord[]>(seedActualRecords);
  const [findings] = useState<Finding[]>(seedFindings);

  const getRuleById = useCallback(
    (id: string) => rules.find((r) => r.id === id),
    [rules]
  );

  const addRule = useCallback(
    (rule: Omit<Rule, 'id' | 'createdAt'>) => {
      const newRule: Rule = {
        ...rule,
        id: `rule-${Date.now()}`,
        createdAt: getTodayISO(),
      };
      setRules((prev) => [...prev, newRule]);
    },
    []
  );

  const updateRule = useCallback((id: string, updates: Partial<Rule>) => {
    setRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule))
    );
  }, []);

  const toggleRuleStatus = useCallback((id: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id
          ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
          : rule
      )
    );
  }, []);

  const updateInboxItemState = useCallback(
    (id: string, state: InboxState) => {
      setInboxItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, state } : item))
      );
    },
    []
  );

  const delayInboxItem = useCallback((id: string, newDueDate: string) => {
    setInboxItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, dueDate: newDueDate, state: 'pending' } : item
      )
    );
  }, []);

  const confirmInboxItem = useCallback(
    (id: string, finalAmount: number) => {
      const item = inboxItems.find((i) => i.id === id);
      if (!item) return;

      const rule = getRuleById(item.ruleId);
      if (!rule) return;

      const newRecord: ActualRecord = {
        id: `actual-${Date.now()}`,
        ruleId: item.ruleId,
        inboxItemId: item.id,
        description: rule.name,
        amount: finalAmount,
        needType: rule.needType,
        costType: rule.costType,
        source: 'recurring-confirmed',
        recordedAt: getTodayISO(),
      };

      setActualRecords((prev) => [...prev, newRecord]);
      updateInboxItemState(id, 'confirmed');
    },
    [inboxItems, getRuleById, updateInboxItemState]
  );

  const addVariableCheckIn = useCallback(
    (
      record: Omit<ActualRecord, 'id' | 'ruleId' | 'inboxItemId' | 'source'>
    ) => {
      const newRecord: ActualRecord = {
        ...record,
        id: `actual-${Date.now()}`,
        ruleId: null,
        inboxItemId: null,
        source: 'variable-checkin',
      };
      setActualRecords((prev) => [...prev, newRecord]);
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        selectedPeriod,
        setSelectedPeriod,
        rules,
        inboxItems,
        actualRecords,
        findings,
        addRule,
        updateRule,
        toggleRuleStatus,
        getRuleById,
        updateInboxItemState,
        delayInboxItem,
        confirmInboxItem,
        addVariableCheckIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
