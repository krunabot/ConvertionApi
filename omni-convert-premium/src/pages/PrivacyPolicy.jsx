import React from "react";
import { Shield, Lock, Server, ShieldCheck, CheckCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" /> Data Protection & Privacy
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
          We believe in transparent, privacy-first software. PremiumConvert is
          engineered to process calculations securely without tracking your
          personal identity.
        </p>
      </div>

      {/* Core Privacy Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl w-fit border border-indigo-800/40">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Zero Profiling</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            We do not create advertising profiles, capture keystrokes, or sell
            data to third-party brokers.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl w-fit border border-emerald-800/40">
            <Server className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Client-Side Execution
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Standard unit calculations are computed directly in your browser
            runtime without persisting your numbers.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-violet-950 text-violet-400 rounded-xl w-fit border border-violet-800/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Encrypted Feeds</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Live currency and market rate requests are channelled exclusively
            through TLS/HTTPS encrypted connections.
          </p>
        </div>
      </div>

      {/* Detailed Legal & Policy Information */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-800 pb-3">
          Privacy Principles & Operational Standards
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            This Privacy Policy outlines how <strong>PremiumConvert</strong>{" "}
            handles information when you access or use our conversion tools,
            mobile interface, and associated web services.
          </p>

          <h3 className="text-lg font-bold text-slate-100 pt-2">
            1. Information Collection & Usage
          </h3>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>No Account Requirement:</strong> You can utilise all
                features without registering an account or providing an email
                address.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Conversion Data:</strong> The values and measurements
                you input into the converters are processed transiently in
                memory and are never stored in databases or log files.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Cookies & Storage:</strong> We do not deploy tracking
                cookies. Any local storage utilised is strictly for preserving
                your interface theme and category preferences.
              </span>
            </li>
          </ul>

          <h3 className="text-lg font-bold text-slate-100 pt-4">
            2. External Data Feeds & Third Parties
          </h3>
          <p>
            When viewing real-time financial exchange rates, public quote feeds
            are retrieved from verified market APIs (such as the Frankfurter
            European Central Bank feed and CoinGecko). No personal information
            is transmitted during these exchange rate queries.
          </p>

          <h3 className="text-lg font-bold text-slate-100 pt-4">
            3. Data Security
          </h3>
          <p>
            We implement modern industry best practices to safeguard our
            application infrastructure against unauthorised access, disclosure,
            or alteration.
          </p>

          <h3 className="text-lg font-bold text-slate-100 pt-4">
            4. Policy Enquiries
          </h3>
          <p>
            If you have questions regarding this Privacy Policy or our data
            handling practices, please reach out via our Contact Support page.
          </p>
        </div>
      </div>
    </div>
  );
}
