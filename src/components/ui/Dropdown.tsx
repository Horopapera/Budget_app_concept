import { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './Button';

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

export function Dropdown({ trigger, items, align = 'right' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`
            absolute z-50 mt-2 w-48 py-1 bg-white rounded-lg border border-slate-200 shadow-dropdown
            animate-fade-in
            ${align === 'right' ? 'right-0' : 'left-0'}
          `}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="
                w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700
                hover:bg-slate-50 hover:text-slate-900 transition-colors
              "
            >
              {item.icon && (
                <span className="w-4 h-4 text-slate-500">{item.icon}</span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface AddDropdownProps {
  onNewRule: () => void;
  onNewCheckIn: () => void;
}

export function AddDropdown({ onNewRule, onNewCheckIn }: AddDropdownProps) {
  return (
    <Dropdown
      trigger={
        <Button variant="primary" size="sm" rightIcon={<ChevronDown className="w-4 h-4" />}>
          Add
        </Button>
      }
      items={[
        {
          label: 'New Rule',
          onClick: onNewRule,
        },
        {
          label: 'New Variable Check-in',
          onClick: onNewCheckIn,
        },
      ]}
      align="right"
    />
  );
}
