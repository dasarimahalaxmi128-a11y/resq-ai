import { motion } from 'framer-motion';
import type { Resource } from '@/types/resource';
import type { Hospital } from '@/types/hospital';

interface RouteMapProps {
  resources?: Resource[];
  hospitals?: Hospital[];
  incidentPos?: { x: number; y: number };
  routes?: { from: { x: number; y: number }; to: { x: number; y: number }; status: 'active' | 'disrupted' | 'rerouted' }[];
  height?: string;
  showLabels?: boolean;
  className?: string;
}

const statusColor = {
  active: '#4FB3A8',
  disrupted: '#E45B61',
  rerouted: '#E8A838',
};

export default function RouteMap({
  resources = [],
  hospitals = [],
  incidentPos = { x: 50, y: 50 },
  routes = [],
  height = '100%',
  showLabels = true,
  className = '',
}: RouteMapProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-resq-surface ${className}`} style={{ height }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1A2428" strokeWidth="0.15" />
          </pattern>
          <pattern id="gridMajor" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E2830" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        <rect width="100" height="100" fill="url(#gridMajor)" />

        {/* Road network suggestion */}
        <path d="M 0 50 L 100 50" stroke="#162024" strokeWidth="0.8" fill="none" />
        <path d="M 50 0 L 50 100" stroke="#162024" strokeWidth="0.8" fill="none" />
        <path d="M 0 25 L 100 30" stroke="#141C20" strokeWidth="0.5" fill="none" />
        <path d="M 0 75 L 100 70" stroke="#141C20" strokeWidth="0.5" fill="none" />

        {/* Routes */}
        {routes.map((route, i) => (
          <g key={i}>
            <motion.path
              d={`M ${route.from.x} ${route.from.y} L ${route.to.x} ${route.to.y}`}
              stroke={statusColor[route.status]}
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={route.status === 'disrupted' ? '2 2' : '0'}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: route.status === 'disrupted' ? 0.5 : 0.85 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          </g>
        ))}

        {/* Hospitals */}
        {hospitals.map((h) => (
          <g key={h.id}>
            <rect
              x={h.location.x - 1.5}
              y={h.location.y - 1.5}
              width="3"
              height="3"
              rx="0.3"
              fill="none"
              stroke={h.icuCapacity === 'full' ? '#E45B61' : '#4FB3A8'}
              strokeWidth="0.3"
            />
            <rect
              x={h.location.x - 0.8}
              y={h.location.y - 0.8}
              width="1.6"
              height="1.6"
              rx="0.2"
              fill={h.icuCapacity === 'full' ? '#8A3940' : '#2E7A72'}
            />
            {showLabels && (
              <text
                x={h.location.x}
                y={h.location.y + 4}
                textAnchor="middle"
                fontSize="1.8"
                fill="#8A9499"
                fontFamily="JetBrains Mono, monospace"
              >
                {h.name}
              </text>
            )}
          </g>
        ))}

        {/* Resources */}
        {resources.map((r) => {
          const color = r.status === 'available' ? '#4FB3A8' : r.status === 'unavailable' ? '#5A6670' : '#E45B61';
          return (
            <g key={r.id}>
              <circle
                cx={r.location.x}
                cy={r.location.y}
                r="1.2"
                fill={color}
                opacity={r.status === 'unavailable' ? 0.3 : 0.9}
              />
              <circle
                cx={r.location.x}
                cy={r.location.y}
                r="2"
                fill="none"
                stroke={color}
                strokeWidth="0.2"
                opacity={r.status === 'available' ? 0.4 : 0.15}
              />
              {showLabels && (
                <text
                  x={r.location.x}
                  y={r.location.y - 3}
                  textAnchor="middle"
                  fontSize="1.5"
                  fill="#8A9499"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {r.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Incident marker */}
        <g>
          <motion.circle
            cx={incidentPos.x}
            cy={incidentPos.y}
            r="2"
            fill="none"
            stroke="#E45B61"
            strokeWidth="0.3"
            animate={{ r: [2, 5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.circle
            cx={incidentPos.x}
            cy={incidentPos.y}
            r="2"
            fill="none"
            stroke="#E45B61"
            strokeWidth="0.3"
            animate={{ r: [2, 5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
          />
          <circle cx={incidentPos.x} cy={incidentPos.y} r="1.5" fill="#E45B61" />
        </g>
      </svg>
    </div>
  );
}
