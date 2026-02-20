import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { RuleFormModal } from '../rules/RuleFormModal';
import { VariableCheckInModal } from '../actuals/VariableCheckInModal';

export function AppLayout() {
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onNewRule={() => setShowRuleModal(true)}
        onNewCheckIn={() => setShowCheckInModal(true)}
      />
      <Sidebar />
      <main className="pt-16 pl-16 lg:pl-56 min-h-screen">
        <div className="p-4 lg:p-6 max-w-7xl">
          <Outlet />
        </div>
      </main>

      <RuleFormModal
        isOpen={showRuleModal}
        onClose={() => setShowRuleModal(false)}
      />
      <VariableCheckInModal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
      />
    </div>
  );
}
