import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotelDetail, clearSelectedHotel } from '../hotelSlice';
import { createNewBooking } from '../../booking/bookingSlice';
import RoomCard from '../components/RoomCard';
import StatusBadge from '../../admin/components/StatusBadge';
import { ArrowLeft, MapPin, User, Mail, Building2, Calendar, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const HotelDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedHotel, loading } = useSelector((state) => state.hotel);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const bookingLoading = useSelector((state) => state.booking.loading);

  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomsBooked: 1,
  });

  useEffect(() => {
    dispatch(fetchHotelDetail(id));
    return () => dispatch(clearSelectedHotel());
  }, [dispatch, id]);

  const handleBookRoom = (room) => {
    if (!isAuthenticated) {
      toast.error('Please login to book a room');
      navigate('/login');
      return;
    }
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!bookingForm.checkIn || !bookingForm.checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (new Date(bookingForm.checkOut) <= new Date(bookingForm.checkIn)) {
      toast.error('Check-out must be after check-in');
      return;
    }
    try {
      const result = await dispatch(createNewBooking({
        hotelId: Number(id),
        roomId: selectedRoom.id,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        guests: Number(bookingForm.guests),
        roomsBooked: Number(bookingForm.roomsBooked),
      })).unwrap();
      toast.success('Booking created successfully!');
      navigate(`/bookings/${result.id}`);
    } catch (err) {
      toast.error(err || 'Failed to create booking');
    }
  };

  if (loading.detail || !selectedHotel) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="h-8 w-48 bg-slate-800/50 rounded animate-pulse mb-6" />
          <div className="h-64 bg-slate-800/50 rounded-xl animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 bg-slate-800/50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Gradient top bar */}
      <div className="h-48 bg-gradient-to-br from-indigo-600/30 via-violet-600/20 to-transparent relative overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors no-underline"
          >
            <ArrowLeft size={16} /> Back to Search
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10 pb-12">
        {/* Hotel Info Card */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{selectedHotel.name}</h1>
                <StatusBadge status={selectedHotel.status} />
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin size={16} className="text-indigo-400" />
                <span>{selectedHotel.address}, {selectedHotel.city}, {selectedHotel.state}, {selectedHotel.country}</span>
              </div>
            </div>
          </div>

          {selectedHotel.description && (
            <p className="text-slate-300 leading-relaxed mb-6">{selectedHotel.description}</p>
          )}

          {/* Owner Info */}
          <div className="flex items-center gap-6 pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                {selectedHotel.ownerName?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <User size={13} className="text-slate-500" />
                  <span className="text-slate-300 font-medium">{selectedHotel.ownerName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-500" />
                  <span className="text-xs">{selectedHotel.ownerEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-violet-400" />
            <h2 className="text-xl font-bold text-white">Available Rooms</h2>
            <span className="text-sm text-slate-500">({selectedHotel.rooms?.length || 0} types)</span>
          </div>

          {selectedHotel.rooms?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedHotel.rooms.map((room, index) => (
                <div
                  key={room.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RoomCard room={room} onBook={handleBookRoom} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-slate-500">No rooms available at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingForm && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="glass-card w-full max-w-md p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-white">Book {selectedRoom.roomType} Room</h3>
                <p className="text-sm text-slate-400">{selectedHotel.name}</p>
              </div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Price per night</span>
                <span className="text-lg font-bold text-white">₹{selectedRoom.pricePerNight?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Check-in</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="date"
                      required
                      value={bookingForm.checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Check-out</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="date"
                      required
                      value={bookingForm.checkOut}
                      min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Guests</label>
                  <div className="relative">
                    <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="number"
                      min="1"
                      max={selectedRoom.capacity}
                      required
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Rooms</label>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="number"
                      min="1"
                      max={selectedRoom.availableRooms}
                      required
                      value={bookingForm.roomsBooked}
                      onChange={(e) => setBookingForm({ ...bookingForm, roomsBooked: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-none cursor-pointer"
                >
                  {bookingLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetail;
