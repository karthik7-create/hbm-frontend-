import { ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ columns, data, page, totalPages, totalElements, onPageChange, loading }) => {
  return (
    <div className="glass-card overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {loading ? (
              // Skeleton loader rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      <div className="h-4 bg-slate-700/50 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="font-medium">No data found</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-slate-800/50 transition-colors duration-150 cursor-default"
                  style={{ animationDelay: `${rowIndex * 50}ms` }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-slate-300 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50">
          <p className="text-sm text-slate-400">
            Showing <span className="font-medium text-slate-300">{data.length}</span> of{' '}
            <span className="font-medium text-slate-300">{totalElements}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
              className="p-2 rounded-lg border border-slate-700 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-slate-400 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i;
              } else if (page < 3) {
                pageNum = i;
              } else if (page > totalPages - 4) {
                pageNum = totalPages - 5 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pageNum === page
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  {pageNum + 1}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-lg border border-slate-700 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-slate-400 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
