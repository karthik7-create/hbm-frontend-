import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../adminSlice';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import { Users, Building2, CalendarCheck, DollarSign, TrendingUp, CreditCard } from 'lucide-react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  if (loading.stats || !stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Overview of hotel management system</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-800/50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of hotel management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          icon={<Users size={22} />}
          label="Total Users"
          value={stats.totalUsers}
          color="indigo"
          delay={0}
        />
        <StatsCard
          icon={<Building2 size={22} />}
          label="Total Hotels"
          value={stats.totalHotels}
          color="emerald"
          delay={100}
        />
        <StatsCard
          icon={<CalendarCheck size={22} />}
          label="Total Bookings"
          value={stats.totalBookings}
          color="blue"
          delay={200}
        />
        <StatsCard
          icon={<DollarSign size={22} />}
          label="Total Revenue"
          value={stats.totalRevenue || 0}
          color="amber"
          delay={300}
        />
        <StatsCard
          icon={<TrendingUp size={22} />}
          label="Pending Hotels"
          value={stats.pendingHotels}
          color="rose"
          delay={400}
        />
        <StatsCard
          icon={<CreditCard size={22} />}
          label="Successful Payments"
          value={stats.successfulPayments}
          color="violet"
          delay={500}
        />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Users', value: stats.activeUsers, total: stats.totalUsers },
          { label: 'Approved Hotels', value: stats.approvedHotels, total: stats.totalHotels },
          { label: 'Confirmed Bookings', value: stats.confirmedBookings, total: stats.totalBookings },
          { label: 'Banned Users', value: stats.bannedUsers, total: stats.totalUsers },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4">
            <p className="text-xs text-slate-400 font-medium">{item.label}</p>
            <div className="flex items-end gap-1.5 mt-1">
              <span className="text-xl font-bold text-white">{item.value}</span>
              <span className="text-xs text-slate-500 mb-0.5">/ {item.total}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000"
                style={{ width: `${item.total > 0 ? (item.value / item.total) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
          <p className="text-xs text-slate-400 mt-0.5">Last 10 bookings across the system</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/30">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Hotel</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              {stats.recentBookings?.length > 0 ? (
                stats.recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-3 text-sm">
                      <div>
                        <p className="text-slate-200 font-medium">{booking.userName}</p>
                        <p className="text-xs text-slate-500">{booking.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-300">{booking.hotelName}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{booking.roomType}</td>
                    <td className="px-6 py-3 text-sm text-slate-400">{booking.checkIn}</td>
                    <td className="px-6 py-3 text-sm text-white font-medium">₹{booking.totalPrice?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3"><StatusBadge status={booking.status} /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500 text-sm">
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
