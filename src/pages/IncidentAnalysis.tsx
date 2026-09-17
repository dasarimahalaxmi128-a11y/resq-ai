import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, Loader2, FileText } from 'lucide-react';
import ResponsePlan from '@/components/shared/ResponsePlan';
import { initialResponsePlan } from '@/data/mockResponsePlans';
import type { ResponsePlan as ResponsePlanType } from '@/types/responsePlan';

interface IncidentAnalysisProps {
  onNavigate: (route: 'landing' | 'command-center' | 'incident') => void;
}

const analysisStages = [
  'PARSING INCIDENT',
  'IDENTIFYING PATIENT PRIORITIES',
  'CHECKING RESOURCES',
  'EVALUATING HOSPITALS',
  'OPTIMIZING RESPONSE',
];

const placeholderText = 'Major accident near highway. Four victims. One unconscious and two with severe bleeding.';

export default function IncidentAnalysis({ onNavigate }: IncidentAnalysisProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [input, setInput] = useState(placeholderText);
  const [analyzing, setAnalyzing] = useState(false);
  const [stage, setStage] = useState(-1);
  const [plan, setPlan] = useState<ResponsePlanType | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (analyzing) return;
    setAnalyzing(true);
    setPlan(null);
    setStage(0);

    for (let i = 0; i < analysisStages.length; i++) {
      setStage(i);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    setPlan(initialResponsePlan);
    setAnalyzing(false);
    setStage(analysisStages.length);
  }, [analyzing]);

  return (
    <div ref={ref} className="min-h-screen pt-16 bg-resq-base">
      <div className="max-w-section section-pad py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="mono-label-teal mb-4 block">INCIDENT ANALYSIS</span>
          <h1 className="font-display text-display-md font-bold text-resq-text-bright max-w-3xl">
            Paste an emergency report. Watch the system think.
          </h1>
          <p className="mt-4 text-resq-text-dim max-w-xl">
            The NLP layer extracts structured data. The optimization engine produces a
            coordinated response plan — with explainable decisions.
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-resq-text-dim" />
                <span className="mono-label">FREE-TEXT INCIDENT REPORT</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={analyzing}
                placeholder="Describe the emergency..."
                className="w-full bg-resq-surface border border-resq-border rounded-sm p-4 text-resq-text font-mono text-sm leading-relaxed resize-none focus:outline-none focus:border-resq-teal/50 transition-colors min-h-[120px] disabled:opacity-50"
              />
            </div>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !input.trim()}
            className="mt-4 flex items-center gap-2 bg-resq-teal text-resq-base px-6 py-3 rounded-sm font-mono text-sm uppercase tracking-[0.15em] font-semibold hover:bg-resq-teal-bright transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Incident'
            )}
          </button>
        </motion.div>

        {/* Analysis stages */}
        <AnimatePresence>
          {stage >= 0 && stage < analysisStages.length && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <div className="space-y-3">
                {analysisStages.map((s, i) => (
                  <div
                    key={s}
                    className={`flex items-center gap-3 transition-opacity ${
                      i <= stage ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      {i < stage ? (
                      <Check className="h-4 w-4 text-resq-teal" />
                      ) : i === stage ? (
                      <Loader2 className="h-4 w-4 text-resq-amber animate-spin" />
                      ) : (
                      <span className="h-2 w-2 rounded-full border border-resq-border" />
                      )}
                    </div>
                    <span className={`font-mono text-sm uppercase tracking-[0.15em] ${
                      i < stage ? 'text-resq-teal' : i === stage ? 'text-resq-amber' : 'text-resq-text-faint'
                    }`}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response plan */}
        <AnimatePresence>
          {plan && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="pt-8 border-t border-resq-border">
                <div className="flex items-center gap-3 mb-8">
                  <Check className="h-5 w-5 text-resq-teal" />
                  <span className="mono-label-teal">RESPONSE PLAN</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                  <ResponsePlan plan={plan} showExplainability />
                  <div className="space-y-6">
                    <div>
                      <span className="mono-label mb-3 block">SYSTEM STATUS</span>
                      <div className="space-y-2">
                        {[
                          { label: 'Incident parsed', value: '4 patients, 3 hazards', color: 'text-resq-teal' },
                          { label: 'Resources matched', value: '3 ambulances, 1 police unit', color: 'text-resq-teal' },
                          { label: 'Hospitals evaluated', value: '4 facilities, 2 selected', color: 'text-resq-teal' },
                          { label: 'Plan confidence', value: '94%', color: 'text-resq-teal' },
                        ].map((item) => (
                          <div key={item.label} className="flex items-baseline justify-between border-b border-resq-border pb-2">
                            <span className="mono-label">{item.label}</span>
                            <span className={`font-mono text-sm ${item.color}`}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-resq-surface border border-resq-border rounded-sm p-4">
                      <span className="mono-label-teal mb-2 block">DECISION CONFIDENCE</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-3xl font-bold text-resq-teal tabular-nums">94%</span>
                        <span className="text-sm text-resq-text-dim">HIGH</span>
                      </div>
                      <p className="text-xs text-resq-text-faint mt-2">
                        Confidence reflects data completeness, resource availability, and route certainty.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
