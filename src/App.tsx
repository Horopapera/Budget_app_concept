import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout';
import { Dashboard } from './pages/Dashboard';
import { Inbox } from './pages/Inbox';
import { Rules } from './pages/Rules';
import { Actuals } from './pages/Actuals';
import { Insights } from './pages/Insights';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="rules" element={<Rules />} />
            <Route path="actuals" element={<Actuals />} />
            <Route path="insights" element={<Insights />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
