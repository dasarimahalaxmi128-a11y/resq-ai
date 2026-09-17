import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface NavbarProps {
  onNavigate: (route: 'landing' | 'command-center' | 'incident') => void;
  current: string;
}

export default function Navbar({ onNavigate, current }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-resq-base/80 backdrop-blur-md border-b border-resq-border"
    >
      <div className="max-w-section section-pad flex items-center justify-between h-16">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative">
            <Activity className="h-5 w-5 text-resq-teal" strokeWidth={2.5} />
            <motion.div
              className="absolute inset-0 rounded-full bg-resq-teal/20 blur-md"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-resq-text-bright">
            RESQ<span className="text-resq-teal">-AI</span>
          </span>
        </button>

        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('command-center')}
            className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
              current === 'command-center' ? 'text-resq-teal' : 'text-resq-text-dim hover:text-resq-text'
            }`}
          >
            Command Center
          </button>
          <button
            onClick={() => onNavigate('incident')}
            className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
              current === 'incident' ? 'text-resq-teal' : 'text-resq-text-dim hover:text-resq-text'
            }`}
          >
            Incident Analysis
          </button>
          <button
            onClick={() => onNavigate('command-center')}
            className="font-mono text-xs uppercase tracking-[0.18em] text-resq-base bg-resq-teal px-4 py-2 rounded-sm hover:bg-resq-teal-bright transition-colors"
          >
            Enter Command Center
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
