import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle,
  Send,
  HelpCircle,
} from "lucide-react";

export default function ContactSupport() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" /> Help Desk & Assistance
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Contact Support
        </h1>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Have a question about a conversion formula, want to request a new
          unit, or need technical assistance? Our support team is here to help.
        </p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl w-fit border border-indigo-800/40">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Direct Email</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Reach our engineering and support team directly at{" "}
            <span className="text-indigo-300 font-semibold">
              support@premiumconvert.io
            </span>
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl w-fit border border-emerald-800/40">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Feature Requests</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Suggest new measurement units, custom multipliers, or additional
            cryptocurrency pairings.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="p-3 bg-violet-950 text-violet-400 rounded-xl w-fit border border-violet-800/40">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Swift Turnaround</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            All customer and developer enquiries receive a response within 24 to
            48 business hours.
          </p>
        </div>
      </div>

      {/* Support Enquiry Form & Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Interactive Form */}
        <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" /> Send Us a
            Message
          </h2>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-950/40 border border-emerald-800/50 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-700/50">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-300">
                Message Received!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for contacting us, {formData.name}. Our support team
                has received your enquiry and will reply to{" "}
                <span className="text-emerald-400 font-medium">
                  {formData.email}
                </span>{" "}
                shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    subject: "general",
                    message: "",
                  });
                }}
                className="mt-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Full Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Smith"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Email Address <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Enquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
                >
                  <option value="general">General Support Enquiry</option>
                  <option value="feature">Unit / Feature Suggestion</option>
                  <option value="bug">Report a Calculation Discrepancy</option>
                  <option value="api">API & Rate Integration Enquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Message <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your question or suggestion in detail..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send Enquiry
              </button>
            </form>
          )}
        </div>

        {/* Side Info Cards */}
        <div className="space-y-4">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" /> FAQ Quick Help
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Looking for how calculations are executed? All standard units use
              exact physical conversion ratios derived from the International
              System of Units (SI).
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-2 text-xs text-slate-400">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[10px]">
              Operating Hours
            </div>
            <p>Monday – Friday: 09:00 – 17:30 (GMT/BST)</p>
            <p>Saturday – Sunday: Monitored for critical API issues.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
