import { Calendar } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  min?: string;
  className?: string;
}

export function DateInput({
  value,
  onChange,
  label,
  min,
  className = '',
}: DateInputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          className="
            w-full px-3 py-2 pr-10 text-sm
            bg-white border border-slate-200 rounded-lg
            text-slate-900 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent
            hover:border-slate-300 transition-colors
          "
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
