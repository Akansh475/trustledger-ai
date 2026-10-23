import { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Database, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface HealthData {
  status: string;
  service?: string;
  timestamp?: string;
  uptime?: number;
}

export default function App() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/health');
      if (!res.ok) {
        throw new Error(`Health check returned status ${res.status}`);
      }
      const data = await res.json();
      setHealth(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to connect to backend';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl">
              ⚖️
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">TrustLedger AI</span>
              <span className="ml-2 text-xs font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                Milestone 1 (0–10%)
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={checkHealth}
              disabled={loading}
              className="inline-flex items-center text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-md transition duration-150 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Ping Health
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              AI-Powered Financial Reconciliation Platform
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Designed for audit-grade ledger integrity, deterministic PayPal payment reconciliation,
              and intelligent anomaly investigation.
            </p>
          </div>
        </div>

        {/* System Health Check Widget */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-300">Backend API Status</span>
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              {loading ? (
                <div className="flex items-center text-slate-400 space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Checking health endpoint...</span>
                </div>
              ) : health ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-base font-semibold text-emerald-300">Healthy & Online</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">Service: {health.service || 'server'}</p>
                  {health.uptime !== undefined && (
                    <p className="text-xs text-slate-500 font-mono">Uptime: {Math.round(health.uptime)}s</p>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                    <span className="text-base font-semibold text-amber-300">Offline / Standby</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{error || 'Server not reachable at /health'}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-300">Database & ORM</span>
              <Database className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                <span className="text-sm font-medium text-slate-300">Prisma Schema Ready</span>
              </div>
              <p className="text-xs text-slate-500">Scheduled for Milestone 2 (PostgreSQL integration)</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-300">Security & Isolation</span>
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-slate-300">Git Secret Guard Active</span>
              </div>
              <p className="text-xs text-slate-500">.env excluded, Zod configuration validation active</p>
            </div>
          </div>
        </section>

        {/* Milestone 1 Checklist */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
              Milestone 1 Scope & Verification Checklist
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
              0–10% Target
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center text-sm font-medium text-emerald-300">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                Backend Configuration & Startup
              </div>
              <p className="text-xs text-slate-400 pl-6">
                Express, TypeScript, CORS, Dotenv, and Zod environment validation configured.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center text-sm font-medium text-emerald-300">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                Frontend Setup & Vite Pipeline
              </div>
              <p className="text-xs text-slate-400 pl-6">
                React 18, Vite, TypeScript, and Tailwind CSS configured and running.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center text-sm font-medium text-emerald-300">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                Health Endpoint Verification
              </div>
              <p className="text-xs text-slate-400 pl-6">
                GET /health and GET /api/health responding with service status and timestamp.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center text-sm font-medium text-emerald-300">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                Git Hygiene & Secret Protection
              </div>
              <p className="text-xs text-slate-400 pl-6">
                .env ignored, .env.example documented, sensitive credentials protected.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          TrustLedger AI • Hackathon Project • Milestone 1 (0–10%)
        </div>
      </footer>
    </div>
  );
}
