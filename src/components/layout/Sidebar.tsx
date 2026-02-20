import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Repeat,
  Receipt,
  Lightbulb,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/inbox', label: 'Inbox', icon: <Inbox className="w-5 h-5" /> },
  { path: '/rules', label: 'Rules', icon: <Repeat className="w-5 h-5" /> },
  { path: '/actuals', label: 'Actuals', icon: <Receipt className="w-5 h-5" /> },
  { path: '/insights', label: 'Insights', icon: <Lightbulb className="w-5 h-5" /> },
];

export function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 bottom-0 z-30 w-16 lg:w-56 bg-white border-r border-slate-200 transition-all duration-200">
      <nav className="flex flex-col gap-1 p-2 lg:p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg
              transition-colors duration-150
              ${
                isActive
                  ? 'bg-accent-50 text-accent-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }
            `}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="font-medium text-sm hidden lg:block">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
