interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
}

const sizeStyles = {
  sm: {
    container: 'p-0.5 gap-0.5',
    option: 'px-2.5 py-1 text-xs',
  },
  md: {
    container: 'p-1 gap-1',
    option: 'px-3 py-1.5 text-sm',
  },
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
}: SegmentedControlProps<T>) {
  const styles = sizeStyles[size];

  return (
    <div
      className={`
        inline-flex bg-slate-100 rounded-lg
        ${styles.container}
      `}
      role="tablist"
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(option.value)}
            className={`
              font-medium rounded-md transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-1
              ${styles.option}
              ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-subtle'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
