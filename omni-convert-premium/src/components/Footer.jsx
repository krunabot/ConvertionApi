import React from "react";
import { Link } from "react-router-dom";
import { Shield, FileText, Info, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 mt-12 py-10 px-4 text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link
              to="/"
              className="text-lg font-bold text-white tracking-tight flex items-center gap-2 w-fit"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-xs">P</span>
              </div>
              PremiumConvert
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Professional-grade conversion utility providing accurate results
              for unit conversions, financial rates, and technical measurements.
              Built for speed, precision, and ease of use.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">
              Support & Info
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Info className="w-3.5 h-3.5" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" /> Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
          <span>&copy; {currentYear} PremiumConvert. All Rights Reserved.</span>
          <div className="flex gap-6">
            <span>v2.5.0 Stable</span>
            <span>SSR Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
