import React from "react";
import { FileText, Scale, Zap, AlertCircle, CheckCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" /> Legal Framework
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Terms of Service
        </h1>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Guidelines and terms governing your use of the PremiumConvert
          calculation engine, web utilities, and real-time data feeds.
        </p>
      </div>

      {/* Core Terms Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl w-fit border border-indigo-800/40">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Permitted Use</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Free and unrestricted access for personal, educational, engineering,
            and professional calculation purposes.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl w-fit border border-emerald-800/40">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Precision Standards
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Conversion formulas follow recognised SI & NIST standards with
            consistent 3 significant figure output formatting.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-amber-950 text-amber-400 rounded-xl w-fit border border-amber-800/40">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Financial Disclaimer
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Live currency exchange rates are provided for general reference and
            must not be construed as investment advice.
          </p>
        </div>
      </div>

      {/* Detailed Terms Information */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-800 pb-3">
          Terms & Conditions of Service
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            By using or accessing <strong>PremiumConvert</strong>, you agree to
            be bound by these Terms of Service. If you do not agree with any
            part of these terms, please discontinue use of the platform.
          </p>

          <h3 className="text-lg font-bold text-slate-100 pt-2">
            1. Service Description & Accuracy
          </h3>
          <p>
            PremiumConvert provides interactive mathematical conversions across
            various scientific, imperial, and metric systems. While we endeavour
            to maintain the highest degree of accuracy, calculations are
            provided on an "as-is" basis without warranties of any kind.
          </p>

          <h3 className="text-lg font-bold text-slate-100 pt-4">
            2. Financial Feeds & Market Quotes
          </h3>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Indicative Rates:</strong> Currency and cryptocurrency
                rates reflect public market aggregates. They may vary from
                actual transactional rates offered by banks or exchanges.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>No Financial Advice:</strong> Rates and calculations are
                intended for informational and comparative purposes only.
              </span>
            </li>
          </ul>

          <h3 className="text-lg font-bold text-slate-100 pt-4">
            3. Intellectual Property & Licencing
          </h3>
          <p>
            The software design, custom layouts, brand marks, and underlying
            interface components of PremiumConvert are protected by intellectual
            property laws. You may not replicate or scrape the service in a
            manner that interferes with server performance.
          </p>

          <h3 className="text-lg font-bold text-slate-100 pt-4">
            4. Modifications to Terms
          </h3>
          <p>
            We reserve the right to revise or standardise these Terms of Service
            at any time. Continued use of the platform following any
            modifications signifies your acceptance of the revised terms.
          </p>
        </div>
      </div>
    </div>
  );
}
