export interface Hospital {
  id: string;
  name: string;
  distance: number;
  travelTime: number;
  icuCapacity: 'available' | 'full' | 'limited';
  traumaCapability: boolean;
  currentLoad: number;
  maxLoad: number;
  location: { x: number; y: number };
}
