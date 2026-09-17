import type { Incident, DisruptionEvent } from '@/types/incident';
import { highwayAccident, allIncidents, disruptions } from '@/data/mockIncidents';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeIncident(text: string): Promise<Incident> {
  await delay(800);
  return {
    ...highwayAccident,
    rawText: text || highwayAccident.rawText,
    status: 'analyzing',
  };
}

export async function getIncidents(): Promise<Incident[]> {
  await delay(300);
  return allIncidents;
}

export async function getIncident(id: string): Promise<Incident | undefined> {
  await delay(200);
  return allIncidents.find((i) => i.id === id) ?? highwayAccident;
}

export async function getDisruptions(): Promise<DisruptionEvent[]> {
  await delay(200);
  return disruptions;
}
