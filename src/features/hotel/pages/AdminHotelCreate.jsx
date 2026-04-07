import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createHotel } from '../hotelSlice';
import { Building2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminHotelCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.hotel);

  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    ownerId: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createHotel({
        ...form,
        ownerId: parseInt(form.ownerId),
      })).unwrap();
      toast.success('Hotel created successfully!');
      navigate('/admin/hotels');
    } catch (err) {
      toast.error(err || 'Failed to create hotel');
    }
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all";
  const labelClass = "block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider";

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-lg bg-indigo-500/20">
            <Building2 size={24} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Hotel</h1>
            <p className="text-sm text-slate-400">Add a new hotel listing to the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className={labelClass}>Hotel Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Grand Palace Hotel" className={inputClass} />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="A luxury hotel nestled in the heart of..." className={`${inputClass} resize-none`} />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Address *</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} required placeholder="123 Main Street" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>City *</label>
              <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="Chennai" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>State *</label>
              <input type="text" name="state" value={form.state} onChange={handleChange} required placeholder="Tamil Nadu" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Country *</label>
              <input type="text" name="country" value={form.country} onChange={handleChange} required placeholder="India" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Owner ID *</label>
              <input type="number" name="ownerId" value={form.ownerId} onChange={handleChange} required placeholder="User ID of the hotel owner" className={inputClass} />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700/50">
            <button
              type="submit"
              disabled={loading.create}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-lg shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 hover:scale-[1.02]"
            >
              {loading.create ? 'Creating...' : 'Create Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHotelCreate;
