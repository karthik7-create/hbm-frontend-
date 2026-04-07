import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, banUser } from '../adminSlice';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { Users, ShieldAlert, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers({ page: 0, size: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(getUsers({ page: newPage, size: 10 }));
  };

  const handleBan = async (user) => {
    const action = user.isActive ? 'ban' : 'unban';
    try {
      await dispatch(banUser(user.id)).unwrap();
      toast.success(`User ${action}ned successfully`);
    } catch (err) {
      toast.error(err || `Failed to ${action} user`);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {row.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-medium text-slate-200">{row.name}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'phone', label: 'Phone', render: (row) => <span className="text-slate-400">{row.phone || '—'}</span> },
    {
      key: 'role',
      label: 'Role',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
          row.role === 'ADMIN'
            ? 'bg-violet-500/15 text-violet-400'
            : 'bg-slate-500/15 text-slate-400'
        }`}>
          {row.role}
        </span>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => <StatusBadge status={row.isActive ? 'ACTIVE' : 'BANNED'} />,
    },
    {
      key: 'createdAt',
      label: 'Joined',
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
        <button
          onClick={() => handleBan(row)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            row.isActive
              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
              : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
          }`}
        >
          {row.isActive ? <><ShieldAlert size={14} /> Ban</> : <><ShieldCheck size={14} /> Unban</>}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users size={24} className="text-indigo-400" />
            User Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage all registered users</p>
        </div>
        <div className="text-sm text-slate-400">
          Total: <span className="text-white font-semibold">{users.totalElements}</span>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={users.content}
        page={users.page}
        totalPages={users.totalPages}
        totalElements={users.totalElements}
        onPageChange={handlePageChange}
        loading={loading.users}
      />
    </div>
  );
};

export default AdminUsers;
