import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import MealPlan from '@/pages/MealPlan';
import Favorites from '@/pages/Favorites';
import Settings from '@/pages/Settings';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;