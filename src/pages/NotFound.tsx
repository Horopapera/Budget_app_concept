import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../components/ui';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-slate-200 mb-4">404</h1>
      <h2 className="text-xl font-semibold text-slate-900 mb-2">
        Page not found
      </h2>
      <p className="text-slate-500 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard">
        <Button variant="secondary" leftIcon={<Home className="w-4 h-4" />}>
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
