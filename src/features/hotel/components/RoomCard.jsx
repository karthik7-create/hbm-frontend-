import { Users, Bed, IndianRupee } from 'lucide-react';

const RoomCard = ({ room, onBook }) => {
  const isAvailable = room.availableRooms > 0;

  return (
    <div className={`glass-card p-5 transition-all duration-300 ${
      isAvailable ? 'hover:scale-[1.01]' : 'opacity-60'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-semibold mb-2">
            <Bed size={12} />
            {room.roomType}
          </div>
          <h4 className="text-base font-semibold text-white">{room.roomType} Room</h4>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-0.5 text-emerald-400">
            <IndianRupee size={16} />
            <span className="text-xl font-bold text-white">
              {room.pricePerNight?.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-xs text-slate-500">per night</p>
        </div>
      </div>

      {room.description && (
        <p className="text-sm text-slate-400 mb-4">{room.description}</p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-300">
            <Users size={14} className="text-violet-400" />
            <span>Up to {room.capacity} guests</span>
          </div>
          <div className={`text-sm font-medium ${isAvailable ? 'text-emerald-400' : 'text-red-400'}`}>
            {isAvailable ? `${room.availableRooms} available` : 'Sold out'}
          </div>
        </div>

        {onBook && isAvailable && (
          <button
            onClick={() => onBook(room)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:scale-105"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
