const StatusBadge = ({ status }) => {
  const styles = {
    // Hotel statuses
    APPROVED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    PENDING: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    REJECTED: 'bg-red-500/15 text-red-400 border-red-500/30',
    // Booking statuses
    CONFIRMED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    CANCELLED: 'bg-red-500/15 text-red-400 border-red-500/30',
    COMPLETED: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    // Payment statuses
    SUCCESS: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    FAILED: 'bg-red-500/15 text-red-400 border-red-500/30',
    UNPAID: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
    // User status
    ACTIVE: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    BANNED: 'bg-red-500/15 text-red-400 border-red-500/30',
  };

  const dotColors = {
    APPROVED: 'bg-emerald-400',
    PENDING: 'bg-amber-400',
    REJECTED: 'bg-red-400',
    CONFIRMED: 'bg-emerald-400',
    CANCELLED: 'bg-red-400',
    COMPLETED: 'bg-blue-400',
    SUCCESS: 'bg-emerald-400',
    FAILED: 'bg-red-400',
    UNPAID: 'bg-gray-400',
    ACTIVE: 'bg-emerald-400',
    BANNED: 'bg-red-400',
  };

  const style = styles[status] || styles.PENDING;
  const dot = dotColors[status] || dotColors.PENDING;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style} transition-all duration-200`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} />
      {status}
    </span>
  );
};

export default StatusBadge;
