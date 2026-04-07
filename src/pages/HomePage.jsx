import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Hotel, Search, CreditCard, Shield, Star, ArrowRight, MapPin, Users, Sparkles } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-32 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Your perfect stay awaits</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Find & Book Your{' '}
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
              Dream Hotel
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-surface-200/60 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover thousands of hotels worldwide. Book instantly with secure payments
            and enjoy unforgettable experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl no-underline transition-all duration-300 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 text-sm"
            >
              <Search className="w-4 h-4" />
              Explore Hotels
              <ArrowRight className="w-4 h-4" />
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-surface-200 hover:text-white font-medium rounded-xl no-underline transition-all duration-200 text-sm"
              >
                Create Free Account
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <StatItem icon={<Hotel className="w-5 h-5" />} value="500+" label="Hotels" />
            <StatItem icon={<Users className="w-5 h-5" />} value="10K+" label="Happy Guests" />
            <StatItem icon={<MapPin className="w-5 h-5" />} value="50+" label="Cities" />
            <StatItem icon={<Star className="w-5 h-5" />} value="4.8" label="Avg Rating" />
          </div>
        </div>
      </section>

      {/* ── Features Section ──────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Why choose StayEase?</h2>
            <p className="text-surface-200/50 max-w-xl mx-auto">
              Everything you need for a seamless hotel booking experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Search className="w-6 h-6" />}
              title="Smart Search"
              desc="Filter by city, dates, guests and room type to find your perfect match."
              color="primary"
              delay="0s"
            />
            <FeatureCard
              icon={<Hotel className="w-6 h-6" />}
              title="Verified Hotels"
              desc="Every listed property is reviewed and approved by our team."
              color="accent"
              delay="0.1s"
            />
            <FeatureCard
              icon={<CreditCard className="w-6 h-6" />}
              title="Secure Payments"
              desc="Pay with Card, UPI, or Net Banking with bank-level security."
              color="primary"
              delay="0.2s"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Free Cancellation"
              desc="Cancel your booking hassle-free before check-in."
              color="accent"
              delay="0.3s"
            />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────── */}
      {!isAuthenticated && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto glass rounded-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-accent-500/10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to start your journey?</h2>
              <p className="text-surface-200/60 mb-8 max-w-lg mx-auto">
                Create your free account today and unlock exclusive deals on premium hotels.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 text-white font-semibold rounded-xl no-underline transition-all duration-300 shadow-xl shadow-primary-500/20 hover:shadow-primary-500/35 text-sm"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Hotel className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-surface-200/80">StayEase</span>
          </div>
          <p className="text-sm text-surface-200/30">© 2026 StayEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Stat item sub-component
const StatItem = ({ icon, value, label }) => (
  <div className="flex items-center gap-3 px-5 py-3 glass-light rounded-xl">
    <div className="text-primary-400">{icon}</div>
    <div className="text-left">
      <p className="text-lg font-bold text-white leading-tight">{value}</p>
      <p className="text-xs text-surface-200/50">{label}</p>
    </div>
  </div>
);

// Feature card sub-component
const FeatureCard = ({ icon, title, desc, color, delay }) => (
  <div
    className="glass-light rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 group animate-fade-in-up"
    style={{ animationDelay: delay }}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
      color === 'primary'
        ? 'bg-primary-500/15 text-primary-400'
        : 'bg-accent-500/15 text-accent-400'
    }`}>
      {icon}
    </div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-sm text-surface-200/50 leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;
