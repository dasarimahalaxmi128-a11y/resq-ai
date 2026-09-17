import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Radio, MapPin, Clock, ArrowRight } from 'lucide-react';
import StatusLabel from '@/components/shared/StatusLabel';
import RouteMap from '@/components/shared/RouteMap';
import { resources } from '@/data/mockResources';
import { hospitals } from '@/data/mockHospitals';
import { highwayAccident, secondaryIncident } from '@/data/mockIncidents';
import { initialResponsePlan } from '@/data/mockResponsePlans';

interface CommandCenterProps {
  onNavigate: (route: 'landing' | 'command-center' | 'incident') => void;
}

const timeline = [
  { time: '14:23:07', event: 'INCIDENT DETECTED', detail: 'Highway 101, Exit 418B', type: 'alert' as const },
  { time: '14:23:09', event: 'AI ANALYSIS COMPLETE', detail: '4 patients identified, 2 critical/severe', type: 'teal' as const },
  { time: '14:23:12', event: 'RESOURCE MATCH', detail: 'Ambulance B (trauma) + Ambulance A (advanced)', type: 'teal' as const },
  { time: '14:23:15', event: 'RESPONSE PLAN DEPLOYED', detail: '4 patients → 3 hospitals, overall ETA 10 min', type: 'teal' as const },
  { time: '14:23:18', event: 'POLICE DISPATCHED', detail: 'Unit 12 — route clearance and scene security', type: 'teal' as const },
  { time: '14:25:30', event: 'ROUTE DISRUPTION', detail: 'Primary route congested — re-optimizing', type: 'alert' as const },
  { time: '14:25:32', event: 'NEW RESPONSE PLAN', detail: 'Rerouted via Pine St, ETA updated to 9 min', type: 'amber' as const },
];

export default function CommandCenter({ onNavigate }: CommandCenterProps) {
  const [activeIncidentIdx, setActiveIncidentIdx] = useState(0);
  const incidents = [highwayAccident, secondaryIncident];
  const activeIncident = incidents[activeIncidentIdx];
  const plan = initialResponsePlan;

  const routes = plan.assignments.map((a) => ({
    from: a.ambulance.location,
    to: a.hospital.location,
    status: a.routeStatus as 'active' | 'disrupted' | 'rerouted',
  }));

  const availableAmbulances = resources.filter((r) => r.type === 'ambulance' && r.status === 'available').length;
  const activeAmbulances = resources.filter((r) => r.type === 'ambulance' && r.status === 'active').length;
  const availableHospitals = hospitals.filter((h) => h.icuCapacity === 'available').length;

  return (
    <div className="min-h-screen pt-16 bg-resq-base">
      {/* System status strip */}
      <div className="border-b border-resq-border bg-resq-surface px-6 md:px-12 py-3 flex items-center gap-6 overflow-x-auto">
        <StatusLabel type="operational" label="SYSTEM OPERATIONAL" pulse />
        <div className="h-4 w-px bg-resq-border" />
        <span className="mono-label">ACTIVE INCIDENTS: <span className="text-resq-coral">{incidents.length}</span></span>
        <div className="h-4 w-px bg-resq-border" />
        <span className="mono-label">AMBULANCES: <span className="text-resq-teal">{availableAmbulances}</span> AVAILABLE · <span className="text-resq-amber">{activeAmbulances}</span> ACTIVE</span>
        <div className="h-4 w-px bg-resq-border" />
        <span className="mono-label">HOSPITALS: <span className="text-resq-teal">{availableHospitals}</span> WITH ICU</span>
        <div className="h-4 w-px bg-resq-border hidden md:block" />
        <span className="mono-label hidden md:block">14:25:32 PST</span>
      </div>

      {/* Main layout: map dominant + side panel */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem-3rem)]">
        {/* Map area — 65-75% on desktop */}
        <div className="flex-1 lg:flex-[3] relative min-h-[400px] lg:min-h-0">
          <RouteMap
            resources={resources}
            hospitals={hospitals}
            incidentPos={{ x: 50, y: 50 }}
            routes={routes}
            height="100%"
            showLabels={false}
            className="border-r-0 lg:border-r border-resq-border"
          />

          {/* Incident selector overlay */}
          <div className="absolute top-4 left-4 flex gap-2">
            {incidents.map((inc, i) => (
              <button
                key={inc.id}
                onClick={() => setActiveIncidentIdx(i)}
                className={`font-mono text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm border transition-colors ${
                  activeIncidentIdx === i
                    ? 'border-resq-coral text-resq-coral bg-resq-coral/5'
                    : 'border-resq-border text-resq-text-dim hover:text-resq-text'
                }`}
              >
                {inc.id}
              </button>
            ))}
          </div>

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 bg-resq-base/80 backdrop-blur-sm border border-resq-border rounded-sm p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-resq-coral" />
              <span className="font-mono text-xs text-resq-text-dim uppercase tracking-wider">Incident</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-resq-teal" />
              <span className="font-mono text-xs text-resq-text-dim uppercase tracking-wider">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-resq-amber" />
              <span className="font-mono text-xs text-resq-text-dim uppercase tracking-wider">En route</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-resq-text-faint" />
              <span className="font-mono text-xs text-resq-text-dim uppercase tracking-wider">Unavailable</span>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:w-[400px] xl:w-[440px] bg-resq-surface border-t lg:border-t-0 border-resq-border overflow-y-auto">
          {/* Incident header */}
          <div className="p-6 border-b border-resq-border">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-resq-coral" />
              <span className="mono-label-coral">{activeIncident.id} · {activeIncident.type.toUpperCase().replace('-', ' ')}</span>
            </div>
            <h2 className="font-display text-xl font-semibold text-resq-text-bright">
              {activeIncident.location.label}
            </h2>
            <p className="text-sm text-resq-text-dim mt-2">{activeIncident.rawText}</p>
            <div className="flex items-center gap-2 mt-3">
              <Clock className="h-3.5 w-3.5 text-resq-text-faint" />
              <span className="font-mono text-xs text-resq-text-faint">{activeIncident.timestamp}</span>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="p-6 border-b border-resq-border">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-resq-teal" />
              <span className="mono-label-teal">AI RECOMMENDATION</span>
            </div>
            <div className="space-y-3">
              {plan.assignments.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    a.patient.severity === 'critical' ? 'bg-resq-coral' :
                    a.patient.severity === 'severe' ? 'bg-resq-amber' : 'bg-resq-text-faint'
                  }`} />
                  <span className="font-mono text-xs text-resq-text-faint w-12">{a.patient.label}</span>
                  <span className="font-mono text-xs text-resq-text">{a.ambulance.label}</span>
                  <ArrowRight className="h-3 w-3 text-resq-text-faint" />
                  <span className="font-mono text-xs text-resq-teal">{a.hospital.name}</span>
                  <span className="font-mono text-xs text-resq-text-bright ml-auto">{a.eta}m</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-resq-border">
              <p className="text-xs text-resq-text-dim leading-relaxed">
                {plan.assignments[0].explanation}
              </p>
            </div>
          </div>

          {/* Response timeline */}
          <div className="p-6">
            <span className="mono-label mb-4 block">RESPONSE TIMELINE</span>
            <div className="space-y-4">
              {timeline.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="flex flex-col items-center">
                    <span className={`h-2 w-2 rounded-full ${
                      event.type === 'alert' ? 'bg-resq-coral' :
                      event.type === 'amber' ? 'bg-resq-amber' : 'bg-resq-teal'
                    }`} />
                    {i < timeline.length - 1 && <span className="w-px flex-1 bg-resq-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <span className="font-mono text-xs text-resq-text-faint block">{event.time}</span>
                    <span className={`font-mono text-xs uppercase tracking-wider ${
                      event.type === 'alert' ? 'text-resq-coral' :
                      event.type === 'amber' ? 'text-resq-amber' : 'text-resq-teal'
                    }`}>
                      {event.event}
                    </span>
                    <p className="text-xs text-resq-text-dim mt-1">{event.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
