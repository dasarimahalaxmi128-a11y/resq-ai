import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const rawInput = '4 people injured near highway. One unconscious. Two severe bleeding.';

const stages = [
  { label: 'CRITICAL INCIDENT', delay: 0 },
  { label: '4 PATIENTS IDENTIFIED', delay: 0.8 },
];

const patients = [
  { id: 'P1', status: 'Unconscious', severity: 'critical' },
  { id: 'P2', status: 'Severe bleeding', severity: 'severe' },
  { id: 'P3', status: 'Severe bleeding', severity: 'severe' },
  { id: 'P4', status: 'Minor injury', severity: 'minor' },
];

const requirements = [
  'Advanced ambulance',
  'Trauma hospital',
  'Police support',
];

export default function IntelligenceParser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [typedText, setTypedText] = useState('');
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      if (charIdx <= rawInput.length) {
        setTypedText(rawInput.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typeInterval);
        setStage(0);
      }
    }, 40);
    return () => clearInterval(typeInterval);
  }, [inView]);

  useEffect(() => {
    if (!inView || stage < 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (stage === 0) timers.push(setTimeout(() => setStage(1), 1000));
    if (stage === 1) timers.push(setTimeout(() => setStage(2), 1500));
    if (stage === 2) timers.push(setTimeout(() => setStage(3), 1000));
    return () => timers.forEach(clearTimeout);
  }, [stage, inView]);

  return (
    <section ref={ref} className="relative py-32 section-pad bg-resq-surface">
      <div className="max-w-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="mono-label-teal mb-4 block">03 — The RESQ-AI Intelligence</span>
          <h2 className="font-display text-display-lg font-bold text-resq-text-bright max-w-3xl">
            Raw text becomes structured intelligence.
          </h2>
          <p className="mt-4 text-resq-text-dim max-w-xl">
            The NLP layer parses free-text emergency reports and extracts structured
            incident data — victim count, injury indicators, location, hazards.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Input */}
          <div>
            <span className="mono-label mb-4 block">INPUT — FREE TEXT REPORT</span>
            <div className="bg-resq-base border border-resq-border rounded-sm p-6 min-h-[200px]">
              <p className="font-mono text-sm text-resq-text leading-relaxed">
                {typedText}
                {stage < 0 && inView && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-resq-teal ml-1 align-middle"
                  />
                )}
              </p>
            </div>
          </div>

          {/* Output */}
          <div>
            <span className="mono-label-teal mb-4 block">OUTPUT — STRUCTURED INTELLIGENCE</span>
            <div className="bg-resq-base border border-resq-border rounded-sm p-6 min-h-[200px]">
              <AnimatePresence mode="wait">
                {stage >= 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Stage 1: Critical incident */}
                    {stage >= 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-4 w-4 text-resq-teal" />
                        <span className="font-mono text-xs uppercase tracking-[0.18em] text-resq-coral">
                          {stages[0].label}
                        </span>
                      </motion.div>
                    )}

                    {/* Stage 2: Patients */}
                    {stage >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-resq-teal" />
                          <span className="font-mono text-xs uppercase tracking-[0.18em] text-resq-teal">
                            {stages[1].label}
                          </span>
                        </div>
                        <div className="pl-6 space-y-1.5">
                          {patients.map((p, i) => (
                            <motion.div
                              key={p.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.15 }}
                              className="flex items-center gap-3"
                            >
                              <span className="font-mono text-xs text-resq-text-faint w-8">{p.id}</span>
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                p.severity === 'critical' ? 'bg-resq-coral' :
                                p.severity === 'severe' ? 'bg-resq-amber' : 'bg-resq-text-faint'
                              }`} />
                              <span className="font-mono text-sm text-resq-text">{p.status}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Stage 3: Requirements */}
                    {stage >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-resq-teal" />
                          <span className="font-mono text-xs uppercase tracking-[0.18em] text-resq-teal">
                            REQUIRED RESOURCES
                          </span>
                        </div>
                        <div className="pl-6 flex flex-wrap gap-2">
                          {requirements.map((req, i) => (
                            <motion.span
                              key={req}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="font-mono text-xs text-resq-text-dim border border-resq-border-light px-2.5 py-1 rounded-sm"
                            >
                              {req}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
