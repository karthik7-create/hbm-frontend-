import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AdminRoutes } from './features/admin/routes';

// Merge all module routes here during integration
const router = createBrowserRouter([
  // Redirect root to admin dashboard (for Module 4 standalone)
  { path: '/', element: <Navigate to="/admin" replace /> },

  // Module 4 — Admin Dashboard routes
  ...AdminRoutes,

  // Other module routes will be spread here during merge:
  // ...AuthRoutes,
  // ...HotelRoutes,
  // ...BookingRoutes,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
