import type { ReactNode, HTMLAttributes } from 'react';

type CardShadow = 'none' | 'subtle' | 'card' | 'elevated';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  shadow?: CardShadow;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: ReactNode;
}

const shadowStyles: Record<CardShadow, string> = {
  none: '',
  subtle: 'shadow-subtle',
  card: 'shadow-card',
  elevated: 'shadow-elevated',
};

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  children,
  shadow = 'card',
  padding = 'md',
  header,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg border border-slate-200
        ${shadowStyles[shadow]}
        ${className}
      `}
      {...props}
    >
      {header && (
        <div className="px-4 py-3 border-b border-slate-100">
          {header}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
}
