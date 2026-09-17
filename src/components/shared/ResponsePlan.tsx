import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowDown } from 'lucide-react';
import type { ResponsePlan as ResponsePlanType } from '@/types/responsePlan';
import type { Severity } from '@/types/incident';

interface ResponsePlanProps {
  plan: ResponsePlanType;
  showExplainability?: boolean;
}

const severityColor: Record<Severity, string> = {
  critical: 'border-l-resq-coral',
  severe: 'border-l-resq-amber',
  moderate: 'border-l-resq-teal',
  minor: 'border-l-resq-text-faint',
};

const severityLabel: Record<Severity, string> = {
  critical: 'CRITICAL',
  severe: 'SEVERE',
  moderate: 'MODERATE',
  minor: 'MINOR',
};

export default function ResponsePlan({ plan, showExplainability = true }: ResponsePlanProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {plan.assignments.map((assignment, idx) => (
        <motion.div
          key={`${assignment.patientId}-${idx}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.15, duration: 0.4 }}
          className={`border-l-2 ${severityColor[assignment.patient.severity]} pl-6`}
        >
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-sm font-semibold tracking-wider text-resq-text-bright">
                {assignment.patient.label}
              </span>
              <span className={`font-mono text-xs uppercase tracking-[0.18em] ${
                assignment.patient.severity === 'critical' ? 'text-resq-coral' :
                assignment.patient.severity === 'severe' ? 'text-resq-amber' :
                assignment.patient.severity === 'moderate' ? 'text-resq-teal' : 'text-resq-text-faint'
              }`}>
                {severityLabel[assignment.patient.severity]}
              </span>
            </div>

            <p className="text-sm text-resq-text-dim">{assignment.patient.description}</p>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-resq-teal">{assignment.ambulance.label}</span>
              <span className="text-resq-text-faint">·</span>
              <span className="font-mono text-resq-text-dim uppercase">{assignment.ambulance.capability}</span>
            </div>

            <div className="flex items-center justify-center py-1">
              <ArrowDown className="h-4 w-4 text-resq-text-faint" />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-resq-teal-bright">{assignment.hospital.name}</span>
              <span className="text-resq-text-faint">·</span>
              <span className={`font-mono text-xs uppercase ${
                assignment.hospital.icuCapacity === 'available' ? 'text-resq-teal' :
                assignment.hospital.icuCapacity === 'limited' ? 'text-resq-amber' : 'text-resq-coral'
              }`}>
                ICU {assignment.hospital.icuCapacity.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-center py-1">
              <ArrowDown className="h-4 w-4 text-resq-text-faint" />
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl font-semibold text-resq-text-bright tabular-nums">
                {assignment.eta}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-resq-text-dim">MIN ETA</span>
              {assignment.routeStatus === 'rerouted' && (
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-resq-amber ml-auto">
                  REROUTED
                </span>
              )}
            </div>

            {showExplainability && (
              <button
                onClick={() => setExpanded(expanded === assignment.patientId ? null : assignment.patientId)}
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-resq-teal hover:text-resq-teal-bright transition-colors mt-2"
              >
                <ChevronDown className={`h-3 w-3 transition-transform ${expanded === assignment.patientId ? 'rotate-180' : ''}`} />
                Why this decision?
              </button>
            )}

            <AnimatePresence>
              {showExplainability && expanded === assignment.patientId && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-resq-text-dim leading-relaxed pt-1"
                >
                  {assignment.explanation}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}

      <div className="flex items-center justify-between pt-4 border-t border-resq-border">
        <div className="flex items-center gap-4">
          <span className="mono-label">DECISION CONFIDENCE</span>
          <span className="font-mono text-lg font-semibold text-resq-teal tabular-nums">
            {plan.confidence}%
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="mono-label">OVERALL ETA</span>
          <span className="font-mono text-lg font-semibold text-resq-text-bright tabular-nums">
            {plan.overallETA} MIN
          </span>
        </div>
      </div>
    </div>
  );
}
