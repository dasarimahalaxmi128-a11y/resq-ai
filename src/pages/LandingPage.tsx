import { useRef } from 'react';
import Hero from '@/components/hero/Hero';
import ProblemComparison from '@/components/problem/ProblemComparison';
import IntelligenceParser from '@/components/intelligence/IntelligenceParser';
import ResourceNetwork from '@/components/orchestration/ResourceNetwork';
import DecisionEngine from '@/components/decision/DecisionEngine';
import HospitalIntelligence from '@/components/hospital/HospitalIntelligence';
import MultiPatientFlow from '@/components/multipatient/MultiPatientFlow';
import AdaptiveResponseDemo from '@/components/adaptive/AdaptiveResponseDemo';
import DisruptionSimulator from '@/components/simulate/DisruptionSimulator';
import Footer from '@/components/nav/Footer';

interface LandingPageProps {
  onNavigate: (route: 'landing' | 'command-center' | 'incident') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Hero
        onEnterCommandCenter={() => onNavigate('command-center')}
        onSeeHowItWorks={scrollToHowItWorks}
      />
      <ProblemComparison />
      <IntelligenceParser />
      <ResourceNetwork />
      <DecisionEngine />
      <HospitalIntelligence />
      <MultiPatientFlow />
      <AdaptiveResponseDemo />
      <DisruptionSimulator />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
