import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ProblemComparison() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="how-it-works" className="relative py-32 section-pad">
      <div className="max-w-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <span className="mono-label-teal mb-4 block">02 — The Problem</span>
          <h2 className="font-display text-display-lg font-bold text-resq-text-bright max-w-3xl">
            Proximity-only dispatch fails when the situation is complex.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pr-12 pb-12 md:pb-0 md:border-r border-resq-border"
          >
            <span className="mono-label-coral mb-6 block">Traditional Dispatch</span>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-resq-text-dim">Nearest ambulance</span>
                <ArrowRight className="h-4 w-4 text-resq-text-faint" />
                <span className="font-mono text-sm text-resq-text-dim">Nearest hospital</span>
              </div>
              <div className="h-px w-full bg-resq-border" />
              <p className="text-sm text-resq-text-faint leading-relaxed max-w-sm">
                One decision. No capability matching. No hospital readiness check.
                No re-evaluation when conditions change.
              </p>
            </div>
          </motion.div>

          {/* RESQ-AI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pl-0 md:pl-12"
          >
            <span className="mono-label-teal mb-6 block">RESQ-AI Orchestration</span>
            <div className="space-y-3">
              {[
                { label: 'Incident', delay: 0.5 },
                { label: 'Patient priorities', delay: 0.6 },
                { label: 'Resources by capability', delay: 0.7 },
                { label: 'Hospital readiness', delay: 0.8 },
                { label: 'Route & ETA evaluation', delay: 0.9 },
                { label: 'Adaptive response', delay: 1.0 },
              ].map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: step.delay, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <span className="font-mono text-xs text-resq-teal w-6">{String(i + 1).padStart(2, '0')}</span>
                  {i > 0 && <ArrowRight className="h-3 w-3 text-resq-teal/40 absolute" style={{ marginLeft: '-20px' }} />}
                  <span className="font-mono text-sm text-resq-text-bright">{step.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-resq-border max-w-2xl"
        >
          <p className="text-lg text-resq-text leading-relaxed">
            In a multi-victim, multi-constraint scenario — where the closest hospital has no ICU
            capacity and the closest ambulance lacks the required equipment — proximity alone
            sends the wrong patient to the wrong place. Every time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
