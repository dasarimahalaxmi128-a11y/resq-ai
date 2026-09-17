import { Activity } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: 'landing' | 'command-center' | 'incident') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-resq-border bg-resq-base">
      <div className="max-w-section section-pad py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Activity className="h-5 w-5 text-resq-teal" strokeWidth={2.5} />
            <span className="font-display text-lg font-semibold tracking-tight text-resq-text-bright">
              RESQ<span className="text-resq-teal">-AI</span>
            </span>
          </div>
          <p className="text-sm text-resq-text-dim max-w-md">
            Adaptive emergency coordination. Every second changes the equation — the response must change with it.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('command-center')}
              className="font-mono text-xs uppercase tracking-[0.18em] text-resq-text-dim hover:text-resq-teal transition-colors"
            >
              Command Center
            </button>
            <button
              onClick={() => onNavigate('incident')}
              className="font-mono text-xs uppercase tracking-[0.18em] text-resq-text-dim hover:text-resq-teal transition-colors"
            >
              Incident Analysis
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
