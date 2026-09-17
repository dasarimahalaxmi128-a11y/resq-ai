import type { Incident, DisruptionEvent } from '@/types/incident';

export const highwayAccident: Incident = {
  id: 'INC-001',
  type: 'highway-accident',
  rawText: '4 people injured near highway. One unconscious. Two severe bleeding.',
  location: { lat: 37.7749, lng: -122.4194, label: 'Highway 101, Exit 418B' },
  patients: [
    {
      id: 'P1',
      label: 'PATIENT 01',
      severity: 'critical',
      status: 'unconscious',
      description: 'Unconscious, possible head trauma',
      requiredCapability: 'trauma',
    },
    {
      id: 'P2',
      label: 'PATIENT 02',
      severity: 'severe',
      status: 'severe-bleeding',
      description: 'Severe bleeding, requires immediate care',
      requiredCapability: 'advanced',
    },
    {
      id: 'P3',
      label: 'PATIENT 03',
      severity: 'severe',
      status: 'severe-bleeding',
      description: 'Severe bleeding, leg fracture suspected',
      requiredCapability: 'advanced',
    },
    {
      id: 'P4',
      label: 'PATIENT 04',
      severity: 'minor',
      status: 'minor-injury',
      description: 'Minor injuries, stable condition',
      requiredCapability: 'basic',
    },
  ],
  hazards: ['Vehicle debris', 'Potential fuel leak', 'Active traffic'],
  timestamp: '14:23:07',
  status: 'detected',
};

export const secondaryIncident: Incident = {
  id: 'INC-002',
  type: 'multi-vehicle',
  rawText: 'Multi-vehicle collision downtown. 3 victims, one trapped.',
  location: { lat: 37.7849, lng: -122.4094, label: 'Market St & 5th Ave' },
  patients: [
    {
      id: 'P1',
      label: 'PATIENT 01',
      severity: 'critical',
      status: 'unconscious',
      description: 'Trapped in vehicle, extrication needed',
      requiredCapability: 'trauma',
    },
    {
      id: 'P2',
      label: 'PATIENT 02',
      severity: 'moderate',
      status: 'stable',
      description: 'Conscious, suspected fractures',
      requiredCapability: 'advanced',
    },
    {
      id: 'P3',
      label: 'PATIENT 03',
      severity: 'minor',
      status: 'minor-injury',
      description: 'Walking wounded, minor lacerations',
      requiredCapability: 'basic',
    },
  ],
  hazards: ['Vehicle fire risk', 'Trapped victim', 'Dense urban traffic'],
  timestamp: '14:31:22',
  status: 'detected',
};

export const allIncidents: Incident[] = [highwayAccident, secondaryIncident];

export const disruptions: DisruptionEvent[] = [
  {
    id: 'D1',
    type: 'route-blocked',
    label: 'Block Primary Route',
    description: 'Primary route to Hospital B becomes congested due to secondary collision',
  },
  {
    id: 'D2',
    type: 'ambulance-unavailable',
    label: 'Ambulance Offline',
    description: 'Ambulance A goes offline — mechanical failure en route',
    affectedResourceId: 'AMB-A',
  },
  {
    id: 'D3',
    type: 'icu-full',
    label: 'Fill Hospital ICU',
    description: 'Hospital B ICU reaches full capacity from incoming transfers',
    affectedHospitalId: 'HOS-B',
  },
  {
    id: 'D4',
    type: 'new-victim',
    label: 'Add Another Victim',
    description: 'A 5th victim is found at the scene — conscious with chest pain',
  },
  {
    id: 'D5',
    type: 'traffic-increase',
    label: 'Increase Traffic',
    description: 'Rush hour traffic increases all route ETAs by 40%',
  },
  {
    id: 'D6',
    type: 'second-emergency',
    label: 'Add Second Emergency',
    description: 'A second incident is reported 2km away — fire with injuries',
  },
];
