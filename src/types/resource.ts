export type ResourceStatus = 'available' | 'active' | 'unavailable' | 'en-route';
export type ResourceType = 'ambulance' | 'police' | 'fire' | 'hospital';

export interface Resource {
  id: string;
  type: ResourceType;
  label: string;
  status: ResourceStatus;
  capability: 'advanced' | 'basic' | 'trauma' | 'standard';
  location: { x: number; y: number };
  eta?: number;
  assignedPatientId?: string;
}
