import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Resource } from '@/types/resource';
import { resources } from '@/data/mockResources';

const resourceNodes = resources.map((r) => ({
  ...r,
  networkX: 15 + (r.location.x / 100) * 70,
  networkY: 15 + (r.location.y / 100) * 70,
}));

const centerNode = { x: 50, y: 50 };

const statusColor = (status: string) => {
  if (status === 'available') return '#4FB3A8';
  if (status === 'unavailable') return '#5A6670';
  if (status === 'active') return '#E45B61';
  return '#E8A838';
};

export default function ResourceNetwork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 section-pad">
      <div className="max-w-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="mono-label-teal mb-4 block">04 — Resource Orchestration</span>
          <h2 className="font-display text-display-lg font-bold text-resq-text-bright max-w-3xl">
            One incident. Multiple resources. One coordinated response.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Network visualization */}
          <div className="lg:col-span-2">
            <div className="relative aspect-square max-w-2xl mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Background grid */}
                <defs>
                  <pattern id="netGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#141C20" strokeWidth="0.15" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#netGrid)" rx="2" />

                {/* Connection lines */}
                {resourceNodes.map((node, i) => (
                  <motion.line
                    key={`line-${node.id}`}
                    x1={centerNode.x}
                    y1={centerNode.y}
                    x2={node.networkX}
                    y2={node.networkY}
                    stroke={node.status === 'unavailable' ? '#1E2830' : '#2E7A72'}
                    strokeWidth="0.3"
                    strokeDasharray={node.status === 'unavailable' ? '1 1' : '0'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: node.status === 'unavailable' ? 0.3 : 0.5 } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                ))}

                {/* Center RESQ-AI node */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.circle
                    cx={centerNode.x}
                    cy={centerNode.y}
                    r="6"
                    fill="none"
                    stroke="#4FB3A8"
                    strokeWidth="0.3"
                    animate={inView ? { r: [6, 9], opacity: [0.6, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <circle cx={centerNode.x} cy={centerNode.y} r="5" fill="#0D1214" stroke="#4FB3A8" strokeWidth="0.4" />
                  <circle cx={centerNode.x} cy={centerNode.y} r="2.5" fill="#4FB3A8" opacity="0.8" />
                  <text
                    x={centerNode.x}
                    y={centerNode.y + 9}
                    textAnchor="middle"
                    fontSize="2.5"
                    fill="#67C7BC"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="600"
                  >
                    RESQ-AI
                  </text>
                </motion.g>

                {/* Resource nodes */}
                {resourceNodes.map((node, i) => (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                  >
                    {node.status === 'available' && (
                      <motion.circle
                        cx={node.networkX}
                        cy={node.networkY}
                        r="3"
                        fill="none"
                        stroke={statusColor(node.status)}
                        strokeWidth="0.2"
                        animate={{ r: [3, 5], opacity: [0.4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    )}
                    <circle
                      cx={node.networkX}
                      cy={node.networkY}
                      r="2.5"
                      fill="#0D1214"
                      stroke={statusColor(node.status)}
                      strokeWidth="0.3"
                    />
                    <circle
                      cx={node.networkX}
                      cy={node.networkY}
                      r="1.2"
                      fill={statusColor(node.status)}
                      opacity={node.status === 'unavailable' ? 0.3 : 0.9}
                    />
                    <text
                      x={node.networkX}
                      y={node.networkY - 4}
                      textAnchor="middle"
                      fontSize="1.8"
                      fill="#8A9499"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.networkX}
                      y={node.networkY + 5}
                      textAnchor="middle"
                      fontSize="1.2"
                      fill={statusColor(node.status)}
                      fontFamily="JetBrains Mono, monospace"
                      opacity="0.7"
                    >
                      {node.status.toUpperCase()}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>
          </div>

          {/* Legend / info */}
          <div className="space-y-6">
            <div>
              <span className="mono-label mb-3 block">RESOURCE STATES</span>
              <div className="space-y-3">
                {[
                  { color: 'bg-resq-teal', label: 'Available', desc: 'Ready for assignment' },
                  { color: 'bg-resq-amber', label: 'En route', desc: 'Currently dispatched' },
                  { color: 'bg-resq-coral', label: 'Active', desc: 'Engaged at incident' },
                  { color: 'bg-resq-text-faint', label: 'Unavailable', desc: 'Offline or occupied' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${item.color}`} />
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-resq-text">{item.label}</span>
                      <p className="text-xs text-resq-text-faint">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-px w-full bg-resq-border" />
            <p className="text-sm text-resq-text-dim leading-relaxed">
              Resources are matched by capability — not just proximity. A trauma-certified
              ambulance 3 minutes farther away is selected over a basic unit next door when
              the patient requires advanced life support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
