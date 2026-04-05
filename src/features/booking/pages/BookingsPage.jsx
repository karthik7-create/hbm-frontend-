import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBookings, clearBookingError } from '../bookingSlice';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, CreditCard, Clock, ChevronRight, Luggage } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearBookingError());
    }
  }, [error, dispatch]);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const statusStyles = {
    CONFIRMED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    CANCELLED: 'bg-red-500/15 text-red-400 border-red-500/20',
    COMPLETED: 'bg-primary-500/15 text-primary-400 border-primary-500/20',
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/3 w-80 h-80 bg-primary-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-surface-200/60">View and manage your hotel reservations</p>
        </div>

        {loading && !bookings.length ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center animate-fade-in-up">
            <Luggage className="w-16 h-16 text-surface-200/20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No bookings yet</h2>
            <p className="text-surface-200/50 mb-6">Start exploring hotels and book your first stay!</p>
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl no-underline transition-all shadow-lg shadow-primary-500/25 text-sm"
            >
              Explore Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, i) => (
              <Link
                key={booking.id}
                to={`/bookings/${booking.id}`}
                className="block glass rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 no-underline group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left — Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-white truncate">{booking.hotelName}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyles[booking.status] || ''}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-surface-200/60">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> {booking.hotelCity || 'City'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {booking.guests} guest(s), {booking.roomsBooked} room(s)
                      </span>
                    </div>
                  </div>

                  {/* Right — Price + Arrow */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">₹{Number(booking.totalPrice).toLocaleString('en-IN')}</p>
                      <p className="text-xs text-surface-200/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {booking.roomType}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-surface-200/30 group-hover:text-primary-400 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
