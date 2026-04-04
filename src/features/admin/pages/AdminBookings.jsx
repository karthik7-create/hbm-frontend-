import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../adminSlice';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { CalendarCheck } from 'lucide-react';

const AdminBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getBookings({ page: 0, size: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(getBookings({ page: newPage, size: 10 }));
  };

  const columns = [
    {
      key: 'id',
      label: 'Booking #',
      render: (row) => (
        <span className="font-mono text-indigo-400 text-sm font-semibold">#{row.id}</span>
      ),
    },
    {
      key: 'userName',
      label: 'Guest',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
            {row.userName?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="text-slate-200 text-sm font-medium">{row.userName}</p>
            <p className="text-xs text-slate-500">{row.userEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'hotelName',
      label: 'Hotel',
      render: (row) => (
        <div>
          <p className="text-slate-300 text-sm">{row.hotelName}</p>
          <p className="text-xs text-slate-500">{row.hotelCity}</p>
        </div>
      ),
    },
    {
      key: 'roomType',
      label: 'Room',
      render: (row) => (
        <div>
          <p className="text-slate-300 text-sm">{row.roomType}</p>
          <p className="text-xs text-slate-500">{row.roomsBooked} room(s) · {row.guests} guest(s)</p>
        </div>
      ),
    },
    {
      key: 'dates',
      label: 'Dates',
      render: (row) => (
        <div className="text-xs">
          <p className="text-slate-300">{row.checkIn}</p>
          <p className="text-slate-500">to {row.checkOut}</p>
        </div>
      ),
    },
    {
      key: 'totalPrice',
      label: 'Amount',
      render: (row) => (
        <span className="text-white font-semibold text-sm">
          ₹{row.totalPrice?.toLocaleString('en-IN') || '0'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Booking',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      render: (row) => <StatusBadge status={row.paymentStatus} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarCheck size={24} className="text-blue-400" />
            Booking Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">All bookings across the system</p>
        </div>
        <div className="text-sm text-slate-400">
          Total: <span className="text-white font-semibold">{bookings.totalElements}</span>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={bookings.content}
        page={bookings.page}
        totalPages={bookings.totalPages}
        totalElements={bookings.totalElements}
        onPageChange={handlePageChange}
        loading={loading.bookings}
      />
    </div>
  );
};

export default AdminBookings;
