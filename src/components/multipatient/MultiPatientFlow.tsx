import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { highwayAccident } from '@/data/mockIncidents';
import { initialResponsePlan } from '@/data/mockResponsePlans';

const severityColor = {
  critical: '#E45B61',
  severe: '#E8A838',
  moderate: '#4FB3A8',
  minor: '#5A6670',
};

export default function MultiPatientFlow() {
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
          <span className="mono-label-teal mb-4 block">07 — Multi-Patient Orchestration</span>
          <h2 className="font-display text-display-lg font-bold text-resq-text-bright max-w-3xl">
            Four patients. Four tracks. One coordinated plan.
          </h2>
          <p className="mt-4 text-resq-text-dim max-w-xl">
            All patients from the reference scenario are assigned simultaneously — each
            routed to the right resource and hospital based on severity and capability.
          </p>
        </motion.div>

        {/* Branching flow diagram */}
        <div className="relative">
          <svg viewBox="0 0 100 60" className="w-full h-auto" style={{ minHeight: '300px' }}>
            {/* Incident node */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <circle cx="10" cy="30" r="3" fill="#E45B61" />
              <motion.circle
                cx="10" cy="30"
                r="3"
                fill="none"
                stroke="#E45B61"
                strokeWidth="0.3"
                animate={inView ? { r: [3, 6], opacity: [0.8, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <text x="10" y="37" textAnchor="middle" fontSize="2" fill="#E45B61" fontFamily="JetBrains Mono, monospace">
                INCIDENT
              </text>
            </motion.g>

            {/* Branching lines */}
            {[12, 24, 36, 48].map((y, i) => (
              <motion.path
                key={`branch-${i}`}
                d={`M 13 30 Q 25 30, 30 ${y} L 40 ${y}`}
                stroke={severityColor[highwayAccident.patients[i].severity]}
                strokeWidth="0.4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
              />
            ))}

            {/* Patient tracks */}
            {initialResponsePlan.assignments.map((assignment, i) => {
              const y = 12 + i * 12;
              const sevColor = severityColor[assignment.patient.severity];
              return (
                <motion.g
                  key={assignment.patientId}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.2 }}
                >
                  {/* Patient node */}
                  <rect x="40" y={y - 2} width="12" height="4" rx="0.5" fill="none" stroke={sevColor} strokeWidth="0.2" />
                  <text x="46" y={y + 0.5} textAnchor="middle" fontSize="1.5" fill={sevColor} fontFamily="JetBrains Mono, monospace">
                    {assignment.patient.label}
                  </text>

                  {/* Line to ambulance */}
                  <motion.path
                    d={`M 52 ${y} L 62 ${y}`}
                    stroke={sevColor}
                    strokeWidth="0.3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ delay: 1 + i * 0.2 }}
                  />

                  {/* Ambulance node */}
                  <circle cx="65" cy={y} r="1.5" fill="#4FB3A8" />
                  <text x="65" y={y - 3} textAnchor="middle" fontSize="1.2" fill="#8A9499" fontFamily="JetBrains Mono, monospace">
                    {assignment.ambulance.label}
                  </text>

                  {/* Line to hospital */}
                  <motion.path
                    d={`M 67 ${y} L 77 ${y}`}
                    stroke={sevColor}
                    strokeWidth="0.3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ delay: 1.2 + i * 0.2 }}
                  />

                  {/* Hospital node */}
                  <rect x="77" y={y - 1.5} width="3" height="3" rx="0.3" fill="none" stroke="#4FB3A8" strokeWidth="0.2" />
                  <text x="78.5" y={y - 3} textAnchor="middle" fontSize="1.2" fill="#8A9499" fontFamily="JetBrains Mono, monospace">
                    {assignment.hospital.name.split(' ')[0]}
                  </text>

                  {/* ETA */}
                  <text x="86" y={y + 0.5} textAnchor="start" fontSize="1.5" fill="#F4F1EA" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                    {assignment.eta}min
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Severity legend */}
        <div className="flex items-center gap-6 mt-8 flex-wrap">
          {[
            { color: 'bg-resq-coral', label: 'Critical' },
            { color: 'bg-resq-amber', label: 'Severe' },
            { color: 'bg-resq-teal', label: 'Moderate' },
            { color: 'bg-resq-text-faint', label: 'Minor' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              <span className="font-mono text-xs uppercase tracking-wider text-resq-text-dim">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
