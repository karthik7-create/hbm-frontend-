import { useEffect, useRef, useState } from 'react';

const StatsCard = ({ icon, label, value, trend, color = 'indigo', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  const colorMap = {
    indigo: {
      bg: 'from-indigo-500/20 to-indigo-600/5',
      icon: 'bg-indigo-500/20 text-indigo-400',
      border: 'border-indigo-500/20',
      glow: 'hover:shadow-indigo-500/10',
    },
    emerald: {
      bg: 'from-emerald-500/20 to-emerald-600/5',
      icon: 'bg-emerald-500/20 text-emerald-400',
      border: 'border-emerald-500/20',
      glow: 'hover:shadow-emerald-500/10',
    },
    amber: {
      bg: 'from-amber-500/20 to-amber-600/5',
      icon: 'bg-amber-500/20 text-amber-400',
      border: 'border-amber-500/20',
      glow: 'hover:shadow-amber-500/10',
    },
    rose: {
      bg: 'from-rose-500/20 to-rose-600/5',
      icon: 'bg-rose-500/20 text-rose-400',
      border: 'border-rose-500/20',
      glow: 'hover:shadow-rose-500/10',
    },
    blue: {
      bg: 'from-blue-500/20 to-blue-600/5',
      icon: 'bg-blue-500/20 text-blue-400',
      border: 'border-blue-500/20',
      glow: 'hover:shadow-blue-500/10',
    },
    violet: {
      bg: 'from-violet-500/20 to-violet-600/5',
      icon: 'bg-violet-500/20 text-violet-400',
      border: 'border-violet-500/20',
      glow: 'hover:shadow-violet-500/10',
    },
  };

  const c = colorMap[color] || colorMap.indigo;

  // Animate count up when visible
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    const duration = 1000;
    const steps = 30;
    const increment = numValue / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setDisplayValue(numValue);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isVisible, value]);

  const formatValue = (val) => {
    if (typeof value === 'string' && value.startsWith('₹')) {
      return `₹${val.toLocaleString('en-IN')}`;
    }
    if (typeof val === 'number' && val >= 1000) {
      return val.toLocaleString('en-IN');
    }
    return val;
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl border ${c.border} bg-gradient-to-br ${c.bg} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${c.glow} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease' }}
    >
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/[0.03] blur-xl" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white tracking-tight">
            {formatValue(displayValue)}
          </p>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${
              trend > 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${c.icon}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
