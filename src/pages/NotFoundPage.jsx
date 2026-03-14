// src/pages/NotFoundPage.jsx
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center px-4">
      <div className="max-w-md">
        <div className="text-9xl font-black text-success/20 select-none leading-none mb-2">404</div>
        <div className="text-6xl mb-4" role="img" aria-label="Lost leaf">🌿</div>
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-base-content/60 mb-8">
          Looks like this page wandered off into the forest. Let us help you find your way back.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/challenges" className="btn btn-outline">
            Browse Challenges
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
