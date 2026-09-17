export type Severity = 'critical' | 'severe' | 'moderate' | 'minor';

export type PatientStatus = 'unconscious' | 'severe-bleeding' | 'minor-injury' | 'stable';

export interface Patient {
  id: string;
  label: string;
  severity: Severity;
  status: PatientStatus;
  description: string;
  requiredCapability: 'advanced' | 'basic' | 'trauma';
}

export type IncidentType = 'highway-accident' | 'fire' | 'medical-emergency' | 'multi-vehicle';

export interface Incident {
  id: string;
  type: IncidentType;
  rawText: string;
  location: { lat: number; lng: number; label: string };
  patients: Patient[];
  hazards: string[];
  timestamp: string;
  status: 'detected' | 'analyzing' | 'optimized' | 're-optimizing';
}

export interface DisruptionEvent {
  id: string;
  type: 'route-blocked' | 'ambulance-unavailable' | 'icu-full' | 'new-victim' | 'traffic-increase' | 'second-emergency';
  label: string;
  description: string;
  affectedResourceId?: string;
  affectedHospitalId?: string;
}
