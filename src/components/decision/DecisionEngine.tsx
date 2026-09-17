import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const factors = [
  { label: 'Travel time', detail: 'Distance weighted by current traffic conditions', weight: '25%' },
  { label: 'Capability match', detail: 'Advanced life support, trauma certification, equipment', weight: '20%' },
  { label: 'Availability', detail: 'Current status and estimated time to scene', weight: '15%' },
  { label: 'Hospital compatibility', detail: 'ICU capacity, trauma center, specialty care', weight: '15%' },
  { label: 'Current load', detail: 'Resource utilization and patient-to-staff ratios', weight: '10%' },
  { label: 'Patient severity', detail: 'Triage priority drives assignment order', weight: '10%' },
  { label: 'Route conditions', detail: 'Road closures, construction, real-time traffic', weight: '5%' },
];

export default function DecisionEngine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 section-pad bg-resq-surface">
      <div className="max-w-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="mono-label-teal mb-4 block">05 — Decision Engine</span>
          <h2 className="font-display text-display-lg font-bold text-resq-text-bright max-w-3xl">
            Every factor enters the pipeline. Only the optimal plan exits.
          </h2>
          <p className="mt-4 text-resq-text-dim max-w-xl">
            The optimization engine evaluates constraints simultaneously — not sequentially —
            and produces a single coordinated response plan.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Funnel visualization */}
          <div className="relative">
            <div className="space-y-2">
              {factors.map((factor, i) => {
                const width = 100 - i * 8;
                return (
                  <motion.div
                    key={factor.label}
                    initial={{ opacity: 0, x: -30, width: 0 }}
                    animate={inView ? { opacity: 1, x: 0, width: `${width}%` } : {}}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    className="mx-auto"
                  >
                    <div className="bg-resq-surface-2 border border-resq-border rounded-sm px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-resq-teal w-6">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-sm text-resq-text-bright">{factor.label}</span>
                      </div>
                      <span className="font-mono text-xs text-resq-text-faint">{factor.weight}</span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Output */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + factors.length * 0.15 + 0.3, duration: 0.5 }}
                className="mx-auto w-1/2 mt-4"
              >
                <div className="bg-resq-teal/10 border border-resq-teal rounded-sm px-4 py-4 text-center">
                  <Check className="h-5 w-5 text-resq-teal mx-auto mb-2" />
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-resq-teal-bright">
                    Optimal Response Plan
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            {factors.map((factor, i) => (
              <motion.div
                key={`detail-${factor.label}`}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-4 pb-3 border-b border-resq-border last:border-0"
              >
                <span className="font-mono text-xs text-resq-teal w-8 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="font-mono text-sm text-resq-text-bright">{factor.label}</span>
                  <p className="text-sm text-resq-text-dim mt-1">{factor.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
