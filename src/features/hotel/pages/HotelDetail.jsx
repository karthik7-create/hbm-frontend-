import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotelDetail, clearSelectedHotel } from '../hotelSlice';
import RoomCard from '../components/RoomCard';
import StatusBadge from '../../admin/components/StatusBadge';
import { ArrowLeft, MapPin, User, Mail, Building2 } from 'lucide-react';

const HotelDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedHotel, loading } = useSelector((state) => state.hotel);

  useEffect(() => {
    dispatch(fetchHotelDetail(id));
    return () => dispatch(clearSelectedHotel());
  }, [dispatch, id]);

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
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
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
                  <RoomCard room={room} />
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
    </div>
  );
};

export default HotelDetail;
