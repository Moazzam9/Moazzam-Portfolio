import React, { useState, useEffect, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
import Education from './components/Education';
const Contact = React.lazy(() => import('./components/Contact'));
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Suspense fallback={<div>Loading...</div>}>
            <Skills />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Projects />
          </Suspense>
          <Education />
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;