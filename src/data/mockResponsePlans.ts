import type { ResponsePlan } from '@/types/responsePlan';
import { highwayAccident } from './mockIncidents';
import { resources, resourceById } from './mockResources';
import { hospitals, hospitalById } from './mockHospitals';

export const initialResponsePlan: ResponsePlan = {
  id: 'RP-001',
  incidentId: 'INC-001',
  overallETA: 10,
  confidence: 94,
  timestamp: '14:23:15',
  status: 'initial',
  assignments: [
    {
      patientId: 'P1',
      patient: highwayAccident.patients[0],
      ambulance: resourceById('AMB-B')!,
      hospital: hospitalById('HOS-B')!,
      eta: 9,
      routeStatus: 'active',
      explanation:
        'Ambulance B (trauma-capable) assigned despite longer distance — patient requires ICU and trauma capability. Hospital B has available ICU beds and trauma certification.',
    },
    {
      patientId: 'P2',
      patient: highwayAccident.patients[1],
      ambulance: resourceById('AMB-A')!,
      hospital: hospitalById('HOS-B')!,
      eta: 7,
      routeStatus: 'active',
      explanation:
        'Ambulance A (advanced) is nearest to the scene. Hospital B selected for ICU availability and proximity to Ambulance A\'s current position.',
    },
    {
      patientId: 'P3',
      patient: highwayAccident.patients[2],
      ambulance: resourceById('AMB-A')!,
      hospital: hospitalById('HOS-C')!,
      eta: 12,
      routeStatus: 'active',
      explanation:
        'Ambulance A handles dual transport. Hospital C selected — available ICU and lower current load distributes patients across facilities to avoid overload.',
    },
    {
      patientId: 'P4',
      patient: highwayAccident.patients[3],
      ambulance: resourceById('AMB-C')!,
      hospital: hospitalById('HOS-D')!,
      eta: 14,
      routeStatus: 'active',
      explanation:
        'Minor injury patient assigned to basic ambulance and nearest non-trauma hospital. Resources preserved for critical patients.',
    },
  ],
  policeSupport: resourceById('POL-1'),
};

export const reoptimizedResponsePlan: ResponsePlan = {
  id: 'RP-002',
  incidentId: 'INC-001',
  overallETA: 9,
  confidence: 91,
  timestamp: '14:25:32',
  status: 're-optimized',
  assignments: [
    {
      patientId: 'P1',
      patient: highwayAccident.patients[0],
      ambulance: resourceById('AMB-B')!,
      hospital: hospitalById('HOS-C')!,
      eta: 11,
      routeStatus: 'rerouted',
      explanation:
        'Hospital B ICU filled to capacity. Rerouted to Hospital C — available ICU, trauma-certified, slightly longer route but avoids critical delay from full ICU.',
    },
    {
      patientId: 'P2',
      patient: highwayAccident.patients[1],
      ambulance: resourceById('AMB-A')!,
      hospital: hospitalById('HOS-B')!,
      eta: 9,
      routeStatus: 'rerouted',
      explanation:
        'Primary route was blocked. Alternate route via Oak St adds 2 min but avoids 10 min congestion delay. Hospital B still has capacity for this patient.',
    },
    {
      patientId: 'P3',
      patient: highwayAccident.patients[2],
      ambulance: resourceById('AMB-B')!,
      hospital: hospitalById('HOS-C')!,
      eta: 13,
      routeStatus: 'active',
      explanation:
        'Ambulance B handles dual transport after reassignment. Hospital C has capacity for both critical and severe patients.',
    },
    {
      patientId: 'P4',
      patient: highwayAccident.patients[3],
      ambulance: resourceById('AMB-C')!,
      hospital: hospitalById('HOS-D')!,
      eta: 16,
      routeStatus: 'active',
      explanation:
        'Unchanged — minor injury patient remains assigned to basic ambulance and nearest non-trauma hospital.',
    },
  ],
  policeSupport: resourceById('POL-1'),
};

export { resources, hospitals };
