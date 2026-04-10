"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface LeadEvent {
  id: string;
  createdAt: string;
  type: string;
  message: string;
}

interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  soonToSell: string | null;
  askingPrice: string | null;
  immediateRepairs: string | null;
  status: string;
  notes: string | null;
  followUpDate: string | null;
  source: string;
  events: LeadEvent[];
}

const ALL_STATUSES = [
  "Lead",
  "Attempted Contact",
  "Met With Customer",
  "Appointment Set",
  "Offer Made",
  "Under Contract",
  "Closed",
];

const STATUS_COLORS: Record<string, string> = {
  Lead: "bg-blue-100 text-blue-800",
  "Attempted Contact": "bg-yellow-100 text-yellow-800",
  "Met With Customer": "bg-purple-100 text-purple-800",
  "Appointment Set": "bg-orange-100 text-orange-800",
  "Offer Made": "bg-green-100 text-green-800",
  "Under Contract": "bg-teal-100 text-teal-800",
  Closed: "bg-emerald-900 text-white",
};

const EVENT_ICONS: Record<string, string> = {
  created: "🟢",
  status_change: "🔄",
  note_added: "📝",
  followup_set: "📅",
};

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || <span className="text-gray-400 italic">Not provided</span>}</dd>
    </div>
  );
}

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchLead = useCallback(async () => {
    try {
      const res = await fetch(`/api/leads/${id}`, { credentials: "include" });
      if (!res.ok) throw new Error();
      const data: Lead = await res.json();
      setLead(data);
      setNotes(data.notes ?? "");
      setFollowUpDate(
        data.followUpDate ? data.followUpDate.slice(0, 10) : ""
      );
    } catch {
      // handle silently
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchLead(); }, [fetchLead]);

  const patch = async (payload: object, field: string) => {
    setSaving(field);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated: Lead = await res.json();
        setLead(updated);
      }
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this lead? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE", credentials: "include" });
      router.push("/crm");
    } catch {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="inline-block w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin mb-3" />
          <p>Loading lead...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Lead not found.</p>
          <Link href="/crm" className="mt-4 inline-block text-brand-green underline">← Back to CRM</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brand-green text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/crm" className="text-green-200 hover:text-white text-sm">
              ← Back to CRM
            </Link>
            <h1 className="text-xl font-extrabold mt-0.5">{lead.name || lead.address}</h1>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[lead.status] ?? "bg-gray-100 text-gray-800"}`}>
            {lead.status}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column — lead info + actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Lead Information</h2>
              <dl className="grid sm:grid-cols-2 gap-4">
                <Field label="Address" value={lead.address} />
                <Field label="Name" value={lead.name} />
                <Field label="Phone" value={lead.phone} />
                <Field label="Email" value={lead.email} />
                <Field label="Source" value={lead.source} />
                <Field label="Date Received" value={new Date(lead.createdAt).toLocaleString()} />
                <Field label="Soon To Sell" value={lead.soonToSell} />
                <Field label="Asking Price" value={lead.askingPrice} />
                <Field label="Immediate Repairs" value={lead.immediateRepairs} />
              </dl>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">Status</h2>
              <div className="flex items-center gap-3">
                <select
                  value={lead.status}
                  onChange={(e) => patch({ status: e.target.value }, "status")}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-brand-green focus:outline-none bg-white text-sm"
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {saving === "status" && (
                  <span className="text-xs text-gray-400">Saving...</span>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Add notes about this lead..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm resize-none"
              />
              <button
                onClick={() => patch({ notes }, "notes")}
                disabled={saving === "notes"}
                className="mt-3 px-5 py-2 bg-brand-green text-white rounded-lg text-sm font-semibold hover:bg-brand-green-dark disabled:opacity-60 transition-colors"
              >
                {saving === "notes" ? "Saving..." : "Save Notes"}
              </button>
            </div>

            {/* Follow-up Date */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">Follow-Up Date</h2>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-brand-green focus:outline-none text-sm"
                />
                <button
                  onClick={() => patch({ followUpDate: followUpDate || null }, "followup")}
                  disabled={saving === "followup"}
                  className="px-5 py-2.5 bg-brand-green text-white rounded-lg text-sm font-semibold hover:bg-brand-green-dark disabled:opacity-60 transition-colors"
                >
                  {saving === "followup" ? "Saving..." : "Save"}
                </button>
              </div>
              {lead.followUpDate && (
                <p className="mt-2 text-xs text-gray-500">
                  Currently: {new Date(lead.followUpDate).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
              <h2 className="text-base font-bold text-red-600 mb-2">Danger Zone</h2>
              <p className="text-sm text-gray-500 mb-4">Permanently delete this lead and all associated data.</p>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-60 transition-colors"
              >
                {deleting ? "Deleting..." : "Delete Lead"}
              </button>
            </div>
          </div>

          {/* Right column — timeline */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Activity Timeline</h2>
              {lead.events.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No activity yet.</p>
              ) : (
                <ol className="space-y-4">
                  {lead.events.map((ev) => (
                    <li key={ev.id} className="flex gap-3">
                      <span className="text-lg flex-shrink-0 mt-0.5">
                        {EVENT_ICONS[ev.type] ?? "•"}
                      </span>
                      <div>
                        <p className="text-sm text-gray-800">{ev.message}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(ev.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
