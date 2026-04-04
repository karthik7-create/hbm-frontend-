import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

// Module route imports — each module exports a named route array
import { AuthRoutes } from './features/auth/routes';
// import { HotelRoutes } from './features/hotel/routes';    // Module 2 — Jeyanth
// import { BookingRoutes } from './features/booking/routes'; // Module 3 — Kavi
// import { AdminRoutes } from './features/admin/routes';     // Module 4 — Karthik

// Merge all module routes into a single array
const allRoutes = [
  ...AuthRoutes,
  // ...HotelRoutes,
  // ...BookingRoutes,
  // ...AdminRoutes,
];

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {allRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default App;
