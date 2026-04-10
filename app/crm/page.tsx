"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface Lead {
  id: string;
  createdAt: string;
  address: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  followUpDate: string | null;
  source: string;
}

const STATUS_COLORS: Record<string, string> = {
  Lead: "bg-blue-100 text-blue-800",
  "Attempted Contact": "bg-yellow-100 text-yellow-800",
  "Met With Customer": "bg-purple-100 text-purple-800",
  "Appointment Set": "bg-orange-100 text-orange-800",
  "Offer Made": "bg-green-100 text-green-800",
  "Under Contract": "bg-teal-100 text-teal-800",
  Closed: "bg-emerald-900 text-white",
};

const ALL_STATUSES = Object.keys(STATUS_COLORS);

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_COLORS[status] ?? "bg-gray-100 text-gray-800";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

function isThisWeek(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return d >= weekAgo;
}

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/leads", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setLeads(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leads.filter((l) => {
      const matchStatus = statusFilter ? l.status === statusFilter : true;
      const matchSearch = q
        ? [l.name, l.address, l.phone, l.email].some((f) =>
            f?.toLowerCase().includes(q)
          )
        : true;
      return matchStatus && matchSearch;
    });
  }, [leads, statusFilter, search]);

  const stats = useMemo(() => {
    const byStatus: Record<string, number> = {};
    leads.forEach((l) => {
      byStatus[l.status] = (byStatus[l.status] ?? 0) + 1;
    });
    return {
      total: leads.length,
      thisWeek: leads.filter((l) => isThisWeek(l.createdAt)).length,
      byStatus,
    };
  }, [leads]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brand-green text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image src="/logo.webp" alt="Sell To Adam" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold leading-tight">Sell To Adam CRM</h1>
              <p className="text-green-200 text-xs">Lead Management Dashboard</p>
            </div>
          </div>
          <Link href="/" className="text-green-100 hover:text-white text-sm underline">
            ← Back to Website
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Leads</p>
            <p className="mt-1 text-4xl font-extrabold text-brand-green">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">This Week</p>
            <p className="mt-1 text-4xl font-extrabold text-brand-gold">{stats.thisWeek}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 col-span-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">By Status</p>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map((s) =>
                stats.byStatus[s] ? (
                  <span key={s} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[s]}`}>
                    {s} <span className="font-bold">({stats.byStatus[s]})</span>
                  </span>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name, address, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-brand-green focus:outline-none text-sm bg-white"
          >
            <option value="">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {(statusFilter || search) && (
            <button
              onClick={() => { setStatusFilter(""); setSearch(""); }}
              className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <div className="inline-block w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin mb-3" />
              <p>Loading leads...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <p className="text-lg">No leads found</p>
              {(statusFilter || search) && (
                <p className="text-sm mt-1">Try adjusting your filters</p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Address</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">Phone</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">Follow-Up</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {lead.name || <span className="text-gray-400 italic">No name</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">
                        {lead.address}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {lead.phone ? (
                          <a href={`tel:${lead.phone}`} className="text-brand-green hover:underline">
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-[180px] truncate">
                        {lead.email || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                        {lead.followUpDate
                          ? new Date(lead.followUpDate).toLocaleDateString()
                          : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/crm/leads/${lead.id}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-brand-green text-white text-xs font-semibold hover:bg-brand-green-dark transition-colors"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-gray-400 text-right">
          Showing {filtered.length} of {leads.length} leads
        </p>
      </main>
    </div>
  );
}
