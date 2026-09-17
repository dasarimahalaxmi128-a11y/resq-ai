import type { Patient } from './incident';
import type { Resource } from './resource';
import type { Hospital } from './hospital';

export interface ResponseAssignment {
  patientId: string;
  patient: Patient;
  ambulance: Resource;
  hospital: Hospital;
  eta: number;
  routeStatus: 'active' | 'disrupted' | 'rerouted';
  explanation: string;
}

export interface ResponsePlan {
  id: string;
  incidentId: string;
  assignments: ResponseAssignment[];
  policeSupport?: Resource;
  overallETA: number;
  confidence: number;
  timestamp: string;
  status: 'initial' | 're-optimized';
}
