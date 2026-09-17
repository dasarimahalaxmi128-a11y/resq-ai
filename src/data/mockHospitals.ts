import type { Hospital } from '@/types/hospital';

export const hospitals: Hospital[] = [
  {
    id: 'HOS-A',
    name: 'St. Mary Medical',
    distance: 4,
    travelTime: 7,
    icuCapacity: 'full',
    traumaCapability: true,
    currentLoad: 18,
    maxLoad: 18,
    location: { x: 20, y: 20 },
  },
  {
    id: 'HOS-B',
    name: 'General Trauma Center',
    distance: 7,
    travelTime: 10,
    icuCapacity: 'available',
    traumaCapability: true,
    currentLoad: 8,
    maxLoad: 16,
    location: { x: 75, y: 35 },
  },
  {
    id: 'HOS-C',
    name: 'Eastside Regional',
    distance: 11,
    travelTime: 14,
    icuCapacity: 'available',
    traumaCapability: true,
    currentLoad: 5,
    maxLoad: 12,
    location: { x: 85, y: 70 },
  },
  {
    id: 'HOS-D',
    name: 'Westgate General',
    distance: 9,
    travelTime: 12,
    icuCapacity: 'limited',
    traumaCapability: false,
    currentLoad: 10,
    maxLoad: 14,
    location: { x: 30, y: 80 },
  },
];

export const hospitalById = (id: string): Hospital | undefined =>
  hospitals.find((h) => h.id === id);
