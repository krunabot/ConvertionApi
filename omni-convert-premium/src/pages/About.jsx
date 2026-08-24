import React from "react";
import { Helmet } from "react-helmet-async";
import { Shield, Zap, Globe, Award, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      <Helmet>
        <title>About Us - OmniConvert Premium</title>
        <meta
          name="description"
          content="Learn about OmniConvert Premium, our mission to deliver high-precision unit and currency conversions with institutional-grade accuracy."
        />
      </Helmet>
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" /> Premium Utility Suite
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          About PremiumConvert
        </h1>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Empowering professionals, engineers, students, and global users with
          high-precision unit conversions and real-time financial market
          exchange rates.
        </p>
      </div>

      {/* Core Mission & Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl w-fit border border-indigo-800/40">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Lightning Fast</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Instantaneous calculation engine designed for instant results
            without page reloads or delays.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl w-fit border border-emerald-800/40">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Real-Time FX Feeds
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Directly synced with institutional market rates to ensure currency
            calculations are up to date.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-violet-950 text-violet-400 rounded-xl w-fit border border-violet-800/40">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Scientific Precision
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Built using standard NIST conversion factors for mathematical and
            scientific precision.
          </p>
        </div>
      </div>

      {/* Detailed Story Section */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-800 pb-3">
          Our Platform & Commitments
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>PremiumConvert</strong> was founded to solve a common
            problem: clunky, slow, ad-cluttered conversion websites. We built a
            streamlined, responsive, and visually intuitive application that
            respects your time and device performance.
          </p>

          <h3 className="text-lg font-bold text-slate-100 pt-2">
            What Sets Us Apart?
          </h3>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Comprehensive Unit Coverage:</strong> Support for
                Length, Area, Volume, Mass, Temperature, Speed, Data, and
                Real-Time Currency exchange.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Interactive Matrix:</strong> View converted
                equivalencies across all available units in a single glance with
                our dynamic Equivalency Matrix.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Accessibility & Privacy First:</strong> We do not
                require personal registration or sell user telemetry data.
              </span>
            </li>
          </ul>

          <h3 className="text-lg font-bold text-slate-100 pt-4">
            Data Quality & Standard Compliance
          </h3>
          <p>
            All static units follow international SI standards (International
            System of Units) and customary units recognized globally. Currency
            exchange data is fetched dynamically via secure REST API channels
            and calculated with zero markup.
          </p>
        </div>
      </div>
    </div>
  );
}
