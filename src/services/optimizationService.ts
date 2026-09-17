import type { ResponsePlan } from '@/types/responsePlan';
import type { DisruptionEvent } from '@/types/incident';
import { initialResponsePlan, reoptimizedResponsePlan } from '@/data/mockResponsePlans';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function optimizeResponse(incidentId: string): Promise<ResponsePlan> {
  await delay(1000);
  return { ...initialResponsePlan, incidentId };
}

export async function getResponsePlan(incidentId: string): Promise<ResponsePlan> {
  await delay(300);
  return { ...initialResponsePlan, incidentId };
}

export async function simulateDisruption(
  _incidentId: string,
  disruption: DisruptionEvent,
): Promise<ResponsePlan> {
  await delay(1500);
  const plan = { ...reoptimizedResponsePlan };
  if (disruption.type === 'icu-full') {
    plan.assignments = plan.assignments.map((a) =>
      a.hospital.id === 'HOS-B'
        ? { ...a, hospital: { ...a.hospital, id: 'HOS-C', name: 'Eastside Regional' }, eta: a.eta + 2 }
        : a,
    );
  }
  if (disruption.type === 'ambulance-unavailable') {
    plan.assignments = plan.assignments.map((a) =>
      a.ambulance.id === 'AMB-A'
        ? { ...a, ambulance: { ...a.ambulance, id: 'AMB-B', label: 'Ambulance B' }, eta: a.eta + 3 }
        : a,
    );
  }
  if (disruption.type === 'new-victim') {
    plan.assignments = [...plan.assignments, ...plan.assignments];
  }
  if (disruption.type === 'traffic-increase') {
    plan.assignments = plan.assignments.map((a) => ({ ...a, eta: Math.round(a.eta * 1.4) }));
    plan.overallETA = Math.round(plan.overallETA * 1.4);
  }
  return plan;
}
