import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchHotels } from '../hotelSlice';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';

const HotelSearch = () => {
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.hotel);

  useEffect(() => {
    dispatch(searchHotels({ page: 0, size: 9 }));
  }, [dispatch]);

  const handleSearch = (params) => {
    dispatch(searchHotels({ ...params, page: 0, size: 9 }));
  };

  const handlePageChange = (newPage) => {
    dispatch(searchHotels({ page: newPage, size: 9 }));
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-violet-600/10 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Find Your Perfect
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"> Stay</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Search through hundreds of hotels and find the best rooms at the best prices
            </p>
          </div>

          <SearchBar onSearch={handleSearch} loading={loading.search} />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-indigo-400" />
            <h2 className="text-xl font-bold text-white">
              {searchResults.totalElements > 0
                ? `${searchResults.totalElements} Hotels Found`
                : 'Hotels'}
            </h2>
          </div>
        </div>

        {loading.search ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-slate-800/50 animate-pulse" />
            ))}
          </div>
        ) : searchResults.content.length === 0 ? (
          <div className="text-center py-20">
            <Building2 size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-400">No hotels found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.content.map((hotel, index) => (
                <div
                  key={hotel.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <HotelCard hotel={hotel} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {searchResults.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => handlePageChange(searchResults.page - 1)}
                  disabled={searchResults.page === 0}
                  className="p-2 rounded-lg border border-slate-700 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-slate-400 hover:text-white"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: Math.min(5, searchResults.totalPages) }, (_, i) => {
                  let pageNum;
                  const tp = searchResults.totalPages;
                  const cp = searchResults.page;
                  if (tp <= 5) pageNum = i;
                  else if (cp < 3) pageNum = i;
                  else if (cp > tp - 4) pageNum = tp - 5 + i;
                  else pageNum = cp - 2 + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        pageNum === searchResults.page
                          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(searchResults.page + 1)}
                  disabled={searchResults.page >= searchResults.totalPages - 1}
                  className="p-2 rounded-lg border border-slate-700 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-slate-400 hover:text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
