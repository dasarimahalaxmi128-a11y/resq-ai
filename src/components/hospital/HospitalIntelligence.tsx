import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { hospitals } from '@/data/mockHospitals';

export default function HospitalIntelligence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [expanded, setExpanded] = useState(false);

  const [hospA, hospB] = [hospitals[0], hospitals[1]];

  return (
    <section ref={ref} className="relative py-32 section-pad">
      <div className="max-w-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="mono-label-teal mb-4 block">06 — Hospital Intelligence</span>
          <h2 className="font-display text-display-lg font-bold text-resq-text-bright max-w-3xl">
            The closest hospital isn't always the right hospital.
          </h2>
        </motion.div>

        {/* Two-column comparison */}
        <div className="grid md:grid-cols-2 gap-0 relative">
          {/* Divider line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-resq-border -translate-x-1/2" />

          {/* Hospital A */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:pr-12 pb-8 md:pb-0"
          >
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display text-2xl font-semibold text-resq-text">{hospA.name}</h3>
              <span className="mono-label-coral">REJECTED</span>
            </div>
            <div className="space-y-4">
              <Readout label="DISTANCE" value={`${hospA.distance} km`} />
              <Readout label="TRAVEL TIME" value={`${hospA.travelTime} min`} />
              <Readout
                label="ICU CAPACITY"
                value={hospA.icuCapacity.toUpperCase()}
                color={hospA.icuCapacity === 'full' ? 'coral' : 'teal'}
              />
              <Readout
                label="TRAUMA CENTER"
                value={hospA.traumaCapability ? 'YES' : 'NO'}
                color={hospA.traumaCapability ? 'teal' : 'faint'}
              />
              <Readout
                label="CURRENT LOAD"
                value={`${hospA.currentLoad}/${hospA.maxLoad}`}
                color={hospA.currentLoad >= hospA.maxLoad ? 'coral' : 'teal'}
              />
            </div>
          </motion.div>

          {/* Hospital B */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:pl-12 md:border-l-0"
          >
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display text-2xl font-semibold text-resq-text-bright">{hospB.name}</h3>
              <span className="mono-label-teal">SELECTED</span>
            </div>
            <div className="space-y-4">
              <Readout label="DISTANCE" value={`${hospB.distance} km`} highlight />
              <Readout label="TRAVEL TIME" value={`${hospB.travelTime} min`} highlight />
              <Readout
                label="ICU CAPACITY"
                value={hospB.icuCapacity.toUpperCase()}
                color="teal"
                highlight
              />
              <Readout
                label="TRAUMA CENTER"
                value={hospB.traumaCapability ? 'YES' : 'NO'}
                color="teal"
                highlight
              />
              <Readout
                label="CURRENT LOAD"
                value={`${hospB.currentLoad}/${hospB.maxLoad}`}
                color="teal"
                highlight
              />
            </div>
          </motion.div>
        </div>

        {/* Decision line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-resq-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-resq-teal" />
            <span className="mono-label-teal">RESQ-AI SELECTS</span>
          </div>
          <p className="text-xl text-resq-text-bright font-display max-w-2xl">
            {hospB.name} for the critical patient.
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-sm font-mono uppercase tracking-[0.15em] text-resq-teal hover:text-resq-teal-bright transition-colors mt-4"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            Why this hospital?
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-resq-text-dim leading-relaxed max-w-xl mt-3"
              >
                {hospB.name} was selected because the critical patient (P1 — unconscious, possible
                head trauma) requires ICU capability and trauma certification. {hospA.name} is
                3 km closer but its ICU is at full capacity ({hospA.currentLoad}/{hospA.maxLoad}).
                The additional 3 minutes of travel time to {hospB.name} is offset by immediate
                ICU availability, avoiding a potentially fatal secondary transfer.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Readout({
  label,
  value,
  color = 'default',
  highlight = false,
}: {
  label: string;
  value: string;
  color?: 'default' | 'teal' | 'coral' | 'faint';
  highlight?: boolean;
}) {
  const colorClass = {
    default: 'text-resq-text',
    teal: 'text-resq-teal',
    coral: 'text-resq-coral',
    faint: 'text-resq-text-faint',
  }[color];

  return (
    <div className="flex items-baseline justify-between border-b border-resq-border pb-3">
      <span className="mono-label">{label}</span>
      <span className={`font-mono text-base font-semibold ${colorClass} ${highlight ? 'tabular-nums' : ''}`}>
        {value}
      </span>
    </div>
  );
}
