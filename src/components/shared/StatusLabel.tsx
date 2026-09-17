import { motion } from 'framer-motion';

type StatusType = 'operational' | 'active' | 'alert' | 'disrupted' | 'available' | 'unavailable' | 'analyzing' | 're-optimizing';

interface StatusLabelProps {
  type: StatusType;
  label: string;
  pulse?: boolean;
  className?: string;
}

const colorMap: Record<StatusType, { text: string; dot: string; ring: string }> = {
  operational: { text: 'text-resq-teal', dot: 'bg-resq-teal', ring: 'shadow-[0_0_8px_rgba(79,179,168,0.5)]' },
  active: { text: 'text-resq-teal', dot: 'bg-resq-teal', ring: 'shadow-[0_0_8px_rgba(79,179,168,0.5)]' },
  available: { text: 'text-resq-teal', dot: 'bg-resq-teal', ring: '' },
  alert: { text: 'text-resq-coral', dot: 'bg-resq-coral', ring: 'shadow-[0_0_8px_rgba(228,91,97,0.5)]' },
  disrupted: { text: 'text-resq-coral', dot: 'bg-resq-coral', ring: 'shadow-[0_0_8px_rgba(228,91,97,0.5)]' },
  unavailable: { text: 'text-resq-text-faint', dot: 'bg-resq-text-faint', ring: '' },
  analyzing: { text: 'text-resq-amber', dot: 'bg-resq-amber', ring: 'shadow-[0_0_8px_rgba(232,168,56,0.5)]' },
  're-optimizing': { text: 'text-resq-amber', dot: 'bg-resq-amber', ring: 'shadow-[0_0_8px_rgba(232,168,56,0.5)]' },
};

export default function StatusLabel({ type, label, pulse = false, className = '' }: StatusLabelProps) {
  const c = colorMap[type];
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] ${c.text} ${className}`}>
      <span className="relative flex h-2 w-2">
        {pulse && (
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-75`}
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${c.dot} ${c.ring}`} />
      </span>
      {label}
    </span>
  );
}
