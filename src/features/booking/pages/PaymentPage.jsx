import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { payForBooking, fetchBookingDetail, clearBookingError, clearCurrentBooking } from '../bookingSlice';
import { CreditCard, Smartphone, Building2, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBooking: booking, currentPayment: payment, loading, error } = useSelector((state) => state.booking);
  const [method, setMethod] = useState('CARD');

  useEffect(() => {
    // Clear stale payment data from previous bookings
    dispatch(clearCurrentBooking());
    dispatch(fetchBookingDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearBookingError());
    }
  }, [error, dispatch]);

  const handlePay = () => {
    dispatch(payForBooking({ bookingId: Number(id), method })).then((res) => {
      if (!res.error) {
        toast.success('Payment successful!');
      }
    });
  };

  if (loading && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Payment success state
  if (payment) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="w-full max-w-md glass rounded-2xl p-8 text-center relative z-10 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-surface-200/60 mb-6">Your booking is confirmed and paid</p>

          <div className="space-y-3 text-left mb-8">
            <div className="flex justify-between p-3 rounded-lg bg-white/3">
              <span className="text-sm text-surface-200/50">Amount</span>
              <span className="text-sm font-semibold text-white">₹{Number(payment.amount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-white/3">
              <span className="text-sm text-surface-200/50">Method</span>
              <span className="text-sm font-medium text-white">{payment.method}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-white/3">
              <span className="text-sm text-surface-200/50">Transaction ID</span>
              <span className="text-xs font-mono text-emerald-400">{payment.transactionId}</span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/bookings/${id}`)}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/25 border-none cursor-pointer text-sm"
          >
            View Booking Details
          </button>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const methods = [
    { value: 'CARD', label: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" />, desc: 'Visa, Mastercard, RuPay' },
    { value: 'UPI', label: 'UPI', icon: <Smartphone className="w-5 h-5" />, desc: 'Google Pay, PhonePe, Paytm' },
    { value: 'NET_BANKING', label: 'Net Banking', icon: <Building2 className="w-5 h-5" />, desc: 'All major banks supported' },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        <button
          onClick={() => navigate(`/bookings/${id}`)}
          className="flex items-center gap-2 text-surface-200/60 hover:text-white mb-6 bg-transparent border-none cursor-pointer text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Booking
        </button>

        <div className="glass rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <h1 className="text-2xl font-bold text-white mb-1">Complete Payment</h1>
            <p className="text-surface-200/50 text-sm">Booking #{booking.id} • {booking.hotelName}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Amount */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <p className="text-xs text-surface-200/40 mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold text-white">₹{Number(booking.totalPrice).toLocaleString('en-IN')}</p>
            </div>

            {/* Payment Method Selection */}
            <div>
              <h3 className="text-sm font-medium text-surface-200/80 mb-3">Select Payment Method</h3>
              <div className="space-y-2">
                {methods.map((m) => (
                  <label
                    key={m.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      method === m.value
                        ? 'bg-primary-500/10 border-primary-500/30'
                        : 'bg-white/3 border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={m.value}
                      checked={method === m.value}
                      onChange={(e) => setMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      method === m.value ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-surface-200/40'
                    }`}>
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{m.label}</p>
                      <p className="text-xs text-surface-200/40">{m.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === m.value ? 'border-primary-500 bg-primary-500' : 'border-surface-200/20'
                    }`}>
                      {method === m.value && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-2 text-xs text-surface-200/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Your payment is secured with 256-bit encryption</span>
            </div>

            {/* Pay Button */}
            <button
              id="pay-submit"
              onClick={handlePay}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-none cursor-pointer text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Pay ₹{Number(booking.totalPrice).toLocaleString('en-IN')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
