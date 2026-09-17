import { useState, useCallback } from 'react';
import Navbar from '@/components/nav/Navbar';
import LandingPage from '@/pages/LandingPage';
import CommandCenter from '@/pages/CommandCenter';
import IncidentAnalysis from '@/pages/IncidentAnalysis';

type Route = 'landing' | 'command-center' | 'incident';

function App() {
  const [route, setRoute] = useState<Route>('landing');

  const navigate = useCallback((r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-resq-base">
      <Navbar onNavigate={navigate} current={route} />
      {route === 'landing' && <LandingPage onNavigate={navigate} />}
      {route === 'command-center' && <CommandCenter onNavigate={navigate} />}
      {route === 'incident' && <IncidentAnalysis onNavigate={navigate} />}
    </div>
  );
}

export default App;
