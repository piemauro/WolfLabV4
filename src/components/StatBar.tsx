import { LucideIcon } from 'lucide-react';

interface StatBarProps {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
  animate?: boolean;
}

export function StatBar({ icon: Icon, label, value, color, animate = true }: StatBarProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <Icon size={16} className="text-gray-400 min-w-[16px]" aria-hidden="true" />
      <div className="flex-1">
        <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500 mb-1">
          <span>{label}</span>
          <span className="text-gray-600">{value}%</span>
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${animate ? 'transition-all duration-1000 ease-out' : ''}`}
            style={{
              width: `${value}%`,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}40`
            }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
}
