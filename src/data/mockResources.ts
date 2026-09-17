import type { Resource } from '@/types/resource';

export const resources: Resource[] = [
  {
    id: 'AMB-A',
    type: 'ambulance',
    label: 'Ambulance A',
    status: 'available',
    capability: 'advanced',
    location: { x: 25, y: 30 },
    eta: 6,
  assignedPatientId: 'P1',
  },
  {
    id: 'AMB-B',
    type: 'ambulance',
    label: 'Ambulance B',
    status: 'available',
    capability: 'trauma',
    location: { x: 70, y: 25 },
    eta: 9,
    assignedPatientId: 'P2',
  },
  {
    id: 'AMB-C',
    type: 'ambulance',
    label: 'Ambulance C',
    status: 'available',
    capability: 'basic',
    location: { x: 45, y: 75 },
    eta: 12,
    assignedPatientId: 'P4',
  },
  {
    id: 'AMB-D',
    type: 'ambulance',
    label: 'Ambulance D',
    status: 'unavailable',
    capability: 'advanced',
    location: { x: 15, y: 60 },
  },
  {
    id: 'POL-1',
    type: 'police',
    label: 'Police Unit 12',
    status: 'available',
    capability: 'standard',
    location: { x: 55, y: 15 },
    eta: 4,
  },
  {
    id: 'POL-2',
    type: 'police',
    label: 'Police Unit 07',
    status: 'active',
    capability: 'standard',
    location: { x: 80, y: 50 },
  },
  {
    id: 'FIRE-1',
    type: 'fire',
    label: 'Fire Rescue 03',
    status: 'available',
    capability: 'standard',
    location: { x: 35, y: 55 },
    eta: 7,
  },
];

export const resourceById = (id: string): Resource | undefined =>
  resources.find((r) => r.id === id);
