import { Link } from 'react-router-dom';
import { MapPin, Bed, DollarSign, Star } from 'lucide-react';

const HotelCard = ({ hotel }) => {
  return (
    <Link
      to={`/hotels/${hotel.id}`}
      className="glass-card group block overflow-hidden hover:scale-[1.01] transition-all duration-300"
    >
      {/* Gradient header bar */}
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-slate-400 text-sm">
              <MapPin size={14} className="text-indigo-400" />
              <span>{hotel.city}, {hotel.state}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">4.5</span>
          </div>
        </div>

        {hotel.description && (
          <p className="text-sm text-slate-400 line-clamp-2 mb-4">
            {hotel.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-slate-300">
              <Bed size={15} className="text-violet-400" />
              <span>{hotel.totalRoomTypes} type{hotel.totalRoomTypes !== 1 ? 's' : ''}</span>
            </div>
            <div className="text-sm text-slate-500">
              {hotel.totalAvailableRooms} available
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1">
              <DollarSign size={14} className="text-emerald-400" />
              <span className="text-lg font-bold text-white">
                ₹{hotel.minPricePerNight?.toLocaleString('en-IN') || '—'}
              </span>
            </div>
            <p className="text-xs text-slate-500">per night</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
