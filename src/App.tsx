import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProductSection } from './components/ProductSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Login } from './components/Admin/Login';
import { Dashboard } from './components/Admin/Dashboard';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (currentView === 'admin') {
    if (!session) {
      return (
        <Login
          onLoginSuccess={() => setCurrentView('admin')}
          onBackToHome={() => setCurrentView('public')}
        />
      );
    }
    return (
      <Dashboard
        onLogout={() => {
          supabase.auth.signOut();
          setCurrentView('public');
        }}
        onBackToHome={() => setCurrentView('public')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-red-100 selection:text-red-900">
      <Header onAdminClick={() => setCurrentView('admin')} />
      <Hero />
      <About />
      <ProductSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;