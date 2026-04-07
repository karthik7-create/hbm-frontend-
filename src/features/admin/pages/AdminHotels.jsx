import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels, approveHotel } from '../adminSlice';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { Building2, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminHotels = () => {
  const dispatch = useDispatch();
  const { hotels, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getHotels({ page: 0, size: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(getHotels({ page: newPage, size: 10 }));
  };

  const handleApprove = async (hotel, status) => {
    try {
      await dispatch(approveHotel({ id: hotel.id, status })).unwrap();
      toast.success(`Hotel ${status.toLowerCase()} successfully`);
    } catch (err) {
      toast.error(err || 'Failed to update hotel status');
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Hotel',
      render: (row) => (
        <div>
          <p className="font-medium text-slate-200">{row.name}</p>
          <p className="text-xs text-slate-500">{row.city}, {row.state}</p>
        </div>
      ),
    },
    {
      key: 'ownerName',
      label: 'Owner',
      render: (row) => (
        <div>
          <p className="text-slate-300 text-sm">{row.ownerName}</p>
          <p className="text-xs text-slate-500">{row.ownerEmail}</p>
        </div>
      ),
    },
    {
      key: 'roomCount',
      label: 'Rooms',
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 text-sm font-medium">
          {row.roomCount}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'createdAt',
      label: 'Added',
      render: (row) => (
        <span className="text-slate-400 text-xs">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
          }) : '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.status !== 'APPROVED' && (
            <button
              onClick={() => handleApprove(row, 'APPROVED')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all duration-200"
            >
              <CheckCircle size={14} /> Approve
            </button>
          )}
          {row.status !== 'REJECTED' && (
            <button
              onClick={() => handleApprove(row, 'REJECTED')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all duration-200"
            >
              <XCircle size={14} /> Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 size={24} className="text-emerald-400" />
            Hotel Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">Review and manage hotel listings</p>
        </div>
        <div className="text-sm text-slate-400">
          Total: <span className="text-white font-semibold">{hotels.totalElements}</span>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={hotels.content}
        page={hotels.page}
        totalPages={hotels.totalPages}
        totalElements={hotels.totalElements}
        onPageChange={handlePageChange}
        loading={loading.hotels}
      />
    </div>
  );
};

export default AdminHotels;
