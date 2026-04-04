import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookingDetail, cancelMyBooking, fetchPaymentStatus, clearBookingError } from '../bookingSlice';
import { Calendar, MapPin, Users, Hotel, CreditCard, XCircle, CheckCircle, ArrowLeft, BadgeCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBooking: booking, currentPayment: payment, loading, error } = useSelector((state) => state.booking);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchBookingDetail(id));
    dispatch(fetchPaymentStatus(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearBookingError());
    }
  }, [error, dispatch]);

  const handleCancel = () => {
    dispatch(cancelMyBooking(id)).then((res) => {
      if (!res.error) {
        toast.success('Booking cancelled successfully');
        setShowCancelConfirm(false);
      }
    });
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  const statusConfig = {
    CONFIRMED: { color: 'emerald', icon: <CheckCircle className="w-5 h-5" />, label: 'Confirmed' },
    CANCELLED: { color: 'red', icon: <XCircle className="w-5 h-5" />, label: 'Cancelled' },
    COMPLETED: { color: 'primary', icon: <BadgeCheck className="w-5 h-5" />, label: 'Completed' },
  };

  if (loading && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) return null;

  const status = statusConfig[booking.status] || statusConfig.CONFIRMED;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center gap-2 text-surface-200/60 hover:text-white mb-6 bg-transparent border-none cursor-pointer text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Bookings
        </button>

        {/* Header Card */}
        <div className="glass rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
          {/* Status Banner */}
          <div className={`px-6 py-4 flex items-center gap-3 ${
            booking.status === 'CONFIRMED' ? 'bg-emerald-500/10' :
            booking.status === 'CANCELLED' ? 'bg-red-500/10' : 'bg-primary-500/10'
          }`}>
            <div className={`${
              booking.status === 'CONFIRMED' ? 'text-emerald-400' :
              booking.status === 'CANCELLED' ? 'text-red-400' : 'text-primary-400'
            }`}>{status.icon}</div>
            <div>
              <p className="font-semibold text-white">{status.label}</p>
              <p className="text-xs text-surface-200/50">Booking #{booking.id}</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Hotel & Room */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{booking.hotelName}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-surface-200/60">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {booking.hotelCity || 'N/A'}</span>
                <span className="flex items-center gap-1.5"><Hotel className="w-3.5 h-3.5" /> {booking.roomType}</span>
              </div>
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-2 gap-4">
              <InfoBox label="Check-in" value={formatDate(booking.checkIn)} icon={<Calendar className="w-4 h-4 text-emerald-400" />} />
              <InfoBox label="Check-out" value={formatDate(booking.checkOut)} icon={<Calendar className="w-4 h-4 text-red-400" />} />
              <InfoBox label="Guests" value={`${booking.guests} guest(s)`} icon={<Users className="w-4 h-4 text-primary-400" />} />
              <InfoBox label="Rooms" value={`${booking.roomsBooked} room(s)`} icon={<Hotel className="w-4 h-4 text-accent-400" />} />
            </div>

            {/* Price */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-surface-200/60 text-sm">Total Price</span>
              <span className="text-2xl font-bold text-white">₹{Number(booking.totalPrice).toLocaleString('en-IN')}</span>
            </div>

            {/* Payment Info */}
            {payment && (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-emerald-400 text-sm">Payment {payment.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-surface-200/40 text-xs">Method</p>
                    <p className="text-white">{payment.method}</p>
                  </div>
                  <div>
                    <p className="text-surface-200/40 text-xs">Transaction ID</p>
                    <p className="text-white font-mono text-xs">{payment.transactionId}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {booking.status === 'CONFIRMED' && !payment && (
                <button
                  onClick={() => navigate(`/bookings/${booking.id}/pay`)}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 border-none cursor-pointer text-sm"
                >
                  <CreditCard className="w-4 h-4" /> Pay Now
                </button>
              )}

              {booking.status === 'CONFIRMED' && (
                <>
                  {!showCancelConfirm ? (
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 font-medium transition-all flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2 border-none cursor-pointer text-sm disabled:opacity-50"
                      >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Confirm Cancel'}
                      </button>
                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-surface-200 cursor-pointer text-sm"
                      >
                        No
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ label, value, icon }) => (
  <div className="p-3 rounded-xl bg-white/3 border border-white/5">
    <div className="flex items-center gap-1.5 mb-1">{icon}<span className="text-xs text-surface-200/40">{label}</span></div>
    <p className="text-sm font-medium text-white">{value}</p>
  </div>
);

export default BookingDetailPage;
