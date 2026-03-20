'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, X, ChevronDown, Save, Leaf } from 'lucide-react';

type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  status: LeadStatus;
  date: string;
  source: string;
  message: string;
  notes: string;
}

const STATUS_COLORS: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  New:       { bg: 'bg-blue-100',   text: 'text-blue-800',   dot: 'bg-blue-500' },
  Contacted: { bg: 'bg-amber-100',  text: 'text-amber-800',  dot: 'bg-amber-500' },
  Qualified: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
  Converted: { bg: 'bg-green-100',  text: 'text-green-800',  dot: 'bg-green-500' },
  Lost:      { bg: 'bg-red-100',    text: 'text-red-800',    dot: 'bg-red-500' },
};

const ALL_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

const SAMPLE_LEADS: Lead[] = [
  {
    id: 1,
    name: 'James Harrison',
    email: 'james.harrison@gmail.com',
    phone: '(951) 555-0142',
    address: '4821 Maple St, Murrieta, CA 92562',
    service: 'Pet Hair & Debris Removal',
    status: 'New',
    date: '2026-03-19',
    source: 'Website',
    message: 'We have two golden retrievers and the turf is covered in pet hair. Need a thorough cleaning.',
    notes: '',
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    email: 'sarah.m@outlook.com',
    phone: '(213) 555-0198',
    address: '1230 Elm Ave, Huntington Beach, CA 92648',
    service: 'Disinfect & Deodorize',
    status: 'Contacted',
    date: '2026-03-18',
    source: 'Google Ads',
    message: 'Our artificial turf smells terrible from pet urine. Need full disinfection and deodorizing.',
    notes: 'Spoke on the phone 3/18. Sending estimate tomorrow.',
  },
  {
    id: 3,
    name: 'Michael Torres',
    email: 'mtorres77@yahoo.com',
    phone: '(925) 555-0267',
    address: '782 Birch Ln, Martinez, CA 94553',
    service: 'Blooming & De-Compacting',
    status: 'Qualified',
    date: '2026-03-17',
    source: 'Referral',
    message: 'Neighbor recommended you. Our turf fibers are matted down and the infill feels hard. About 800 sq ft.',
    notes: 'Referred by client #42 (Dave Brooks). Scheduled site visit for 3/20.',
  },
  {
    id: 4,
    name: 'Linda Chen',
    email: 'linda.chen@icloud.com',
    phone: '(916) 555-0334',
    address: '3455 Oak Blvd, Sacramento, CA 95822',
    service: 'Powered By OxyTurf',
    status: 'Converted',
    date: '2026-03-10',
    source: 'Website',
    message: 'We have a large backyard with artificial turf that needs a deep clean. Want the full OxyTurf treatment.',
    notes: 'Signed contract 3/14. Service scheduled 3/25. Total: $350.',
  },
  {
    id: 5,
    name: 'Robert Nguyen',
    email: 'rob.nguyen@gmail.com',
    phone: '(951) 555-0411',
    address: '910 Pine Ridge Dr, Temecula, CA 92591',
    service: 'Poop Scooping & Removal',
    status: 'New',
    date: '2026-03-19',
    source: 'Yelp',
    message: 'Have three dogs and need weekly poop scooping for our backyard turf. About 600 sq ft.',
    notes: '',
  },
  {
    id: 6,
    name: 'Emily Watson',
    email: 'ewatson@protonmail.com',
    phone: '(213) 555-0589',
    address: '6671 Sunset Blvd, Huntington Beach, CA 92646',
    service: 'Pet Hair & Debris Removal',
    status: 'Contacted',
    date: '2026-03-16',
    source: 'Facebook',
    message: 'Lots of leaf debris and pet hair embedded in our turf. Kids play on it daily so want it really clean.',
    notes: 'Emailed estimate on 3/17. Following up Friday.',
  },
  {
    id: 7,
    name: 'David Kowalski',
    email: 'dkowalski@gmail.com',
    phone: '(925) 555-0623',
    address: '2245 Spruce Ct, Walnut Creek, CA 94598',
    service: 'Disinfect & Deodorize',
    status: 'Lost',
    date: '2026-03-08',
    source: 'Google Ads',
    message: 'Interested in monthly turf disinfection service.',
    notes: 'Went with a cheaper competitor. Price was the deciding factor.',
  },
  {
    id: 8,
    name: 'Jessica Ramirez',
    email: 'jess.ramirez@hotmail.com',
    phone: '(951) 555-0756',
    address: '1188 Cedar Park Rd, Murrieta, CA 92563',
    service: 'Blooming & De-Compacting',
    status: 'New',
    date: '2026-03-20',
    source: 'Website',
    message: 'Just moved in and the previous owners never maintained the turf. Fibers are completely flat.',
    notes: '',
  },
  {
    id: 9,
    name: 'Thomas Anderson',
    email: 'tanderson@gmail.com',
    phone: '(916) 555-0891',
    address: '5590 Willow Creek Blvd, Elk Grove, CA 95624',
    service: 'Powered By OxyTurf',
    status: 'Qualified',
    date: '2026-03-14',
    source: 'Referral',
    message: 'Want the premium OxyTurf treatment for our commercial property turf. About 2,000 sq ft total.',
    notes: 'Site visit completed 3/16. Preparing detailed proposal.',
  },
  {
    id: 10,
    name: 'Amanda Foster',
    email: 'afoster22@gmail.com',
    phone: '(213) 555-0944',
    address: '3312 Cottonwood Ln, Long Beach, CA 90802',
    service: 'Poop Scooping & Removal',
    status: 'Converted',
    date: '2026-03-06',
    source: 'Google Ads',
    message: 'Monthly poop scooping service. We used you last year and were very happy.',
    notes: 'Returning customer. Service completed 3/12. Paid in full.',
  },
  {
    id: 11,
    name: 'Carlos Medina',
    email: 'carlos.medina@outlook.com',
    phone: '(925) 555-1078',
    address: '7743 Dogwood St, Concord, CA 94520',
    service: 'Pet Hair & Debris Removal',
    status: 'Contacted',
    date: '2026-03-15',
    source: 'NextDoor',
    message: 'Heavy buildup of pet hair and dirt in our turf. Two large dogs. Need urgent cleaning.',
    notes: 'Called 3/15. Visit scheduled for 3/16 morning.',
  },
  {
    id: 12,
    name: 'Patricia O\'Brien',
    email: 'pobrien@aol.com',
    phone: '(951) 555-1135',
    address: '4401 Juniper Hill Dr, Temecula, CA 92592',
    service: 'Disinfect & Deodorize',
    status: 'Lost',
    date: '2026-03-05',
    source: 'Website',
    message: 'Looking for a one-time deep sanitization of our backyard turf.',
    notes: 'Budget was significantly below our minimum. Recommended basic package.',
  },
  {
    id: 13,
    name: 'Kevin Patel',
    email: 'kevin.patel@gmail.com',
    phone: '(916) 555-1267',
    address: '1925 Redwood Pl, Roseville, CA 95661',
    service: 'Blooming & De-Compacting',
    status: 'New',
    date: '2026-03-20',
    source: 'Yelp',
    message: 'Turf looks worn and flat after a year of heavy use. Need blooming service before a party this weekend.',
    notes: '',
  },
  {
    id: 14,
    name: 'Rachel Kim',
    email: 'rachel.kim@icloud.com',
    phone: '(213) 555-1399',
    address: '8860 Magnolia Dr, Santa Monica, CA 90403',
    service: 'Powered By OxyTurf',
    status: 'Qualified',
    date: '2026-03-13',
    source: 'Facebook',
    message: 'Want the full OxyTurf treatment for our rooftop turf area. About 500 sq ft.',
    notes: 'Premium client. Reviewing proposal for quarterly OxyTurf maintenance plan.',
  },
  {
    id: 15,
    name: 'Brian Gallagher',
    email: 'bgallagher@gmail.com',
    phone: '(925) 555-1452',
    address: '6209 Hickory Rd, Pleasant Hill, CA 94523',
    service: 'Poop Scooping & Removal',
    status: 'Contacted',
    date: '2026-03-12',
    source: 'Google Ads',
    message: 'Large property with 4 dogs. Need bi-weekly poop scooping and turf maintenance.',
    notes: 'Sent service plan proposal on 3/13. Awaiting response.',
  },
  {
    id: 16,
    name: 'Natalie Brooks',
    email: 'nbrooks@gmail.com',
    phone: '(951) 555-1588',
    address: '2780 Sycamore Ave, Murrieta, CA 92562',
    service: 'Disinfect & Deodorize',
    status: 'Converted',
    date: '2026-03-09',
    source: 'Referral',
    message: 'Need full turf disinfection after a puppy accident situation. Want ongoing monthly service.',
    notes: 'Initial deep clean completed 3/15. Monthly contract signed. Total: $125/mo.',
  },
];

export default function AdminLeadsPage() {
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [leads, setLeads] = useState<Lead[]>(SAMPLE_LEADS);
  const [draftNotes, setDraftNotes] = useState('');
  const [draftStatus, setDraftStatus] = useState<LeadStatus>('New');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      if (!matchesStatus) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.service.toLowerCase().includes(q) ||
        lead.address.toLowerCase().includes(q)
      );
    });
  }, [leads, statusFilter, searchQuery]);

  const selectedLead = useMemo(() => {
    if (selectedLeadId === null) return null;
    return leads.find((l) => l.id === selectedLeadId) ?? null;
  }, [leads, selectedLeadId]);

  function handleSelectLead(lead: Lead) {
    if (selectedLeadId === lead.id) {
      setSelectedLeadId(null);
      return;
    }
    setSelectedLeadId(lead.id);
    setDraftNotes(lead.notes);
    setDraftStatus(lead.status);
  }

  function handleSaveDetails() {
    if (selectedLeadId === null) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === selectedLeadId ? { ...l, notes: draftNotes, status: draftStatus } : l
      )
    );
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      {/* Top bar */}
      <header className="bg-[#2D5016] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Murphy&apos;s Turf Admin
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-[#212121]">Leads</h1>
            <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-[#2D5016] text-white text-sm font-semibold">
              {filteredLeads.length}
            </span>
          </div>
          <p className="text-[#5D4037] text-sm">
            Manage and track incoming turf cleaning service inquiries across California.
          </p>
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'All' | LeadStatus)}
              className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-sm text-[#212121] focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent transition cursor-pointer min-w-[170px]"
            >
              <option value="All">All Statuses</option>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, service, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#212121] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="text-left py-3.5 px-4 font-semibold text-[#212121]">Name</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-[#212121] hidden md:table-cell">
                    Email
                  </th>
                  <th className="text-left py-3.5 px-4 font-semibold text-[#212121] hidden lg:table-cell">
                    Phone
                  </th>
                  <th className="text-left py-3.5 px-4 font-semibold text-[#212121]">Service</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-[#212121]">Status</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-[#212121] hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-center py-3.5 px-4 font-semibold text-[#212121] w-16">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No leads match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const colors = STATUS_COLORS[lead.status];
                    const isSelected = selectedLeadId === lead.id;
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => handleSelectLead(lead)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#2D5016]/5'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-medium text-[#212121] whitespace-nowrap">
                          {lead.name}
                        </td>
                        <td className="py-3.5 px-4 text-[#5D4037] hidden md:table-cell">
                          {lead.email}
                        </td>
                        <td className="py-3.5 px-4 text-[#5D4037] hidden lg:table-cell whitespace-nowrap">
                          {lead.phone}
                        </td>
                        <td className="py-3.5 px-4 text-[#5D4037] whitespace-nowrap">
                          {lead.service}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#5D4037] whitespace-nowrap hidden sm:table-cell">
                          {formatDate(lead.date)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectLead(lead);
                            }}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#5D4037] hover:bg-[#7CB342]/15 hover:text-[#2D5016] transition cursor-pointer"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel (slide-out from right) */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/30 transition-opacity"
              onClick={() => setSelectedLeadId(null)}
            />

            {/* Panel */}
            <div className="relative w-full max-w-lg bg-white shadow-2xl overflow-y-auto animate-slide-in">
              {/* Panel header */}
              <div className="sticky top-0 z-10 bg-[#2D5016] px-6 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedLead.name}</h2>
                  <p className="text-sm text-white/70 mt-0.5">Lead Details</p>
                </div>
                <button
                  onClick={() => setSelectedLeadId(null)}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 transition cursor-pointer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Panel body */}
              <div className="px-6 py-6 space-y-6">
                {/* Status badge */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${STATUS_COLORS[selectedLead.status].bg} ${STATUS_COLORS[selectedLead.status].text}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[selectedLead.status].dot}`} />
                    {selectedLead.status}
                  </span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoField label="Email" value={selectedLead.email} />
                  <InfoField label="Phone" value={selectedLead.phone} />
                  <InfoField label="Address" value={selectedLead.address} span2 />
                  <InfoField label="Service Requested" value={selectedLead.service} />
                  <InfoField label="Source" value={selectedLead.source} />
                  <InfoField label="Date Received" value={formatDate(selectedLead.date)} />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <div className="bg-[#FFF8E1]/60 border border-[#7CB342]/20 rounded-lg p-4 text-sm text-[#212121] leading-relaxed">
                    {selectedLead.message}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Update status */}
                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] uppercase tracking-wider mb-1.5">
                    Update Status
                  </label>
                  <div className="relative">
                    <select
                      value={draftStatus}
                      onChange={(e) => setDraftStatus(e.target.value as LeadStatus)}
                      className="appearance-none w-full bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-sm text-[#212121] focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent transition cursor-pointer"
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] uppercase tracking-wider mb-1.5">
                    Notes
                  </label>
                  <textarea
                    value={draftNotes}
                    onChange={(e) => setDraftNotes(e.target.value)}
                    rows={4}
                    placeholder="Add internal notes about this lead..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#212121] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent transition resize-none"
                  />
                </div>

                {/* Save button */}
                <button
                  onClick={handleSaveDetails}
                  className="w-full flex items-center justify-center gap-2 bg-[#2D5016] text-white rounded-lg px-4 py-3 text-sm font-semibold hover:bg-[#7CB342] focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-2 transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Slide-in animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}

/* Reusable info field for the detail panel */
function InfoField({
  label,
  value,
  span2,
}: {
  label: string;
  value: string;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? 'sm:col-span-2' : ''}>
      <dt className="text-xs font-semibold text-[#5D4037] uppercase tracking-wider mb-1">
        {label}
      </dt>
      <dd className="text-sm text-[#212121]">{value}</dd>
    </div>
  );
}
