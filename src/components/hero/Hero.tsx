import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface HeroProps {
  onEnterCommandCenter: () => void;
  onSeeHowItWorks: () => void;
}

const flowNodes = [
  { label: 'AMBULANCE', x: 15, y: 50 },
  { label: 'HOSPITAL', x: 15, y: 75 },
  { label: 'POLICE', x: 85, y: 50 },
  { label: 'ROUTE', x: 85, y: 75 },
];

export default function Hero({ onEnterCommandCenter, onSeeHowItWorks }: HeroProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Animated network background */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 1920 1080" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0D1214" />
              <stop offset="100%" stopColor="#080B0D" />
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#heroGlow)" />

          {/* Road network */}
          {[
            'M 0 300 L 1920 280', 'M 0 600 L 1920 620', 'M 0 800 L 1920 780',
            'M 400 0 L 420 1080', 'M 900 0 L 880 1080', 'M 1400 0 L 1420 1080',
            'M 0 150 L 1920 200', 'M 0 950 L 1920 900',
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#141C20"
              strokeWidth={i < 3 ? 1.5 : 0.8}
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 0.6 : 0 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}

          {/* Network nodes */}
          {[
            { x: 200, y: 300 }, { x: 420, y: 600 }, { x: 880, y: 280 },
            { x: 900, y: 800 }, { x: 1400, y: 620 }, { x: 1600, y: 300 },
            { x: 600, y: 150 }, { x: 1200, y: 950 }, { x: 300, y: 950 },
            { x: 1700, y: 800 },
          ].map((node, i) => (
            <g key={i}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="3"
                fill="#4FB3A8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: inView ? [0, 0.4, 0.2] : 0, scale: inView ? 1 : 0 }}
                transition={{ duration: 1, delay: i * 0.15, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill="none"
                stroke="#4FB3A8"
                strokeWidth="0.5"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: inView ? [0.3, 0] : 0, scale: inView ? [1, 2] : 0.5 }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            </g>
          ))}

          {/* Connecting lines */}
          {[
            { from: { x: 200, y: 300 }, to: { x: 420, y: 600 } },
            { from: { x: 420, y: 600 }, to: { x: 880, y: 280 } },
            { from: { x: 880, y: 280 }, to: { x: 900, y: 800 } },
            { from: { x: 900, y: 800 }, to: { x: 1400, y: 620 } },
            { from: { x: 1400, y: 620 }, to: { x: 1600, y: 300 } },
            { from: { x: 600, y: 150 }, to: { x: 880, y: 280 } },
            { from: { x: 1200, y: 950 }, to: { x: 900, y: 800 } },
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.from.x} y1={line.from.y} x2={line.to.x} y2={line.to.y}
              stroke="#1E2830"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 0.5 : 0 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          ))}

          {/* Moving light trails */}
          {[
            { path: 'M 0 300 L 1920 280', delay: 0 },
            { path: 'M 0 800 L 1920 780', delay: 1.5 },
            { path: 'M 900 0 L 880 1080', delay: 0.8 },
          ].map((trail, i) => (
            <motion.circle
              key={`trail-${i}`}
              r="2"
              fill="#67C7BC"
              initial={{ opacity: 0 }}
              animate={inView ? {
                offsetDistance: ['0%', '100%'],
                opacity: [0, 1, 0],
              } : {}}
              transition={{ duration: 4, delay: trail.delay, repeat: Infinity, ease: 'linear' }}
              style={{ offsetPath: `path('${trail.path}')` } as any}
            />
          ))}
        </svg>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-resq-base/40 via-transparent to-resq-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-resq-base/60 via-transparent to-resq-base/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-section section-pad w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-12 bg-resq-teal" />
            <span className="mono-label-teal">Adaptive Emergency Resource Orchestration</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display-xl font-bold text-resq-text-bright leading-[1.05]"
          >
            When emergencies change,<br />
            the response must<br />
            <span className="text-gradient-teal">change with them.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg text-resq-text-dim max-w-xl leading-relaxed"
          >
            Emergency response isn't a one-time dispatch decision — it's a continuously
            adapting orchestration process. RESQ-AI interprets, prioritizes, matches, and
            re-optimizes in real time.
          </motion.p>

          {/* Compact flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <FlowDiagram inView={inView} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <button
              onClick={onEnterCommandCenter}
              className="group flex items-center gap-2 bg-resq-teal text-resq-base px-6 py-3 rounded-sm font-mono text-sm uppercase tracking-[0.15em] font-semibold hover:bg-resq-teal-bright transition-colors"
            >
              Enter Command Center
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onSeeHowItWorks}
              className="group flex items-center gap-2 text-resq-text-dim hover:text-resq-text px-6 py-3 font-mono text-sm uppercase tracking-[0.15em] transition-colors"
            >
              See How It Works
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FlowDiagram({ inView }: { inView: boolean }) {
  return (
    <div className="flex items-center gap-3 md:gap-6 flex-wrap">
      <FlowNode label="INCIDENT" color="coral" delay={0} inView={inView} />
      <FlowConnector delay={0.3} inView={inView} />
      <div className="relative">
        <FlowNode label="RESQ-AI" color="teal" delay={0.5} inView={inView} highlight />
        <motion.div
          className="absolute inset-0 rounded-sm border border-resq-teal/30"
          animate={inView ? { opacity: [0.2, 0.6, 0.2] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <FlowConnector delay={0.8} inView={inView} />
      <div className="flex flex-col gap-1.5">
        {flowNodes.map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1 + i * 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.15em] text-resq-text-dim border border-resq-border px-3 py-1 rounded-sm"
          >
            {node.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FlowNode({ label, color, delay, inView, highlight }: {
  label: string; color: 'coral' | 'teal'; delay: number; inView: boolean; highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.4 }}
      className={`font-mono text-xs uppercase tracking-[0.15em] font-semibold px-4 py-2 rounded-sm ${
        color === 'coral'
          ? 'text-resq-coral border border-resq-coral/30 bg-resq-coral/5'
          : highlight
          ? 'text-resq-teal-bright border border-resq-teal bg-resq-teal/10'
          : 'text-resq-teal border border-resq-teal/30'
      }`}
    >
      {label}
    </motion.div>
  );
}

function FlowConnector({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={inView ? { width: '32px', opacity: 1 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="h-px bg-gradient-to-r from-resq-teal/50 to-resq-teal/20"
    />
  );
}
