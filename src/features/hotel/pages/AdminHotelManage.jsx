import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchHotels, removeHotel, addRoom } from '../hotelSlice';
import DataTable from '../../admin/components/DataTable';
import StatusBadge from '../../admin/components/StatusBadge';
import { Building2, Plus, Trash2, BedDouble, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminHotelManage = () => {
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.hotel);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [roomForm, setRoomForm] = useState({
    roomType: 'Single',
    description: '',
    capacity: 2,
    pricePerNight: '',
    totalRooms: 1,
  });

  useEffect(() => {
    // Fetch all hotels (not just approved) for admin — using search with no filter
    dispatch(searchHotels({ page: 0, size: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(searchHotels({ page: newPage, size: 10 }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    try {
      await dispatch(removeHotel(id)).unwrap();
      toast.success('Hotel deleted');
    } catch (err) {
      toast.error(err || 'Failed to delete hotel');
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addRoom({
        hotelId: selectedHotelId,
        data: {
          ...roomForm,
          capacity: parseInt(roomForm.capacity),
          pricePerNight: parseFloat(roomForm.pricePerNight),
          totalRooms: parseInt(roomForm.totalRooms),
        },
      })).unwrap();
      toast.success('Room added!');
      setShowRoomModal(false);
      setRoomForm({ roomType: 'Single', description: '', capacity: 2, pricePerNight: '', totalRooms: 1 });
    } catch (err) {
      toast.error(err || 'Failed to add room');
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Hotel',
      render: (row) => (
        <Link to={`/hotels/${row.id}`} className="hover:text-indigo-400 transition-colors">
          <p className="font-medium text-slate-200">{row.name}</p>
          <p className="text-xs text-slate-500">{row.city}, {row.state}</p>
        </Link>
      ),
    },
    {
      key: 'totalRoomTypes',
      label: 'Room Types',
      render: (row) => <span className="text-slate-300">{row.totalRoomTypes}</span>,
    },
    {
      key: 'totalAvailableRooms',
      label: 'Available',
      render: (row) => <span className="text-slate-300">{row.totalAvailableRooms}</span>,
    },
    {
      key: 'minPricePerNight',
      label: 'Min Price',
      render: (row) => (
        <span className="text-white font-medium">
          ₹{row.minPricePerNight?.toLocaleString('en-IN') || '—'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setSelectedHotelId(row.id); setShowRoomModal(true); }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20 transition-all"
          >
            <BedDouble size={13} /> Add Room
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      ),
    },
  ];

  const inputClass = "w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 size={24} className="text-emerald-400" />
            Manage Hotels
          </h1>
          <p className="text-slate-400 text-sm mt-1">Create, edit and manage hotel listings</p>
        </div>
        <Link
          to="/admin/hotels/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-lg shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
        >
          <Plus size={16} /> Add Hotel
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={searchResults.content}
        page={searchResults.page}
        totalPages={searchResults.totalPages}
        totalElements={searchResults.totalElements}
        onPageChange={handlePageChange}
        loading={loading.search}
      />

      {/* Add Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 mx-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Add Room</h3>
              <button onClick={() => setShowRoomModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddRoom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Room Type</label>
                <select
                  value={roomForm.roomType}
                  onChange={(e) => setRoomForm({ ...roomForm, roomType: e.target.value })}
                  className={inputClass}
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Description</label>
                <input type="text" value={roomForm.description} onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })} placeholder="Cozy room with a view" className={inputClass} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Capacity</label>
                  <input type="number" min="1" value={roomForm.capacity} onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Price/Night</label>
                  <input type="number" min="1" value={roomForm.pricePerNight} onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: e.target.value })} required placeholder="₹" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Total Rooms</label>
                  <input type="number" min="1" value={roomForm.totalRooms} onChange={(e) => setRoomForm({ ...roomForm, totalRooms: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-700/50">
                <button type="button" onClick={() => setShowRoomModal(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all">
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHotelManage;
