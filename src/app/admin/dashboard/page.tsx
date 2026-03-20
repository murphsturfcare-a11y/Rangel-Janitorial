'use client';

import {
  Users,
  MessageSquare,
  TrendingUp,
  Mail,
  ArrowUpRight,
  Download,
  Eye,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Hardcoded sample data                                             */
/* ------------------------------------------------------------------ */

const stats = [
  {
    label: 'Total Leads',
    value: '147',
    trend: '+12% from last month',
    icon: Users,
    iconBg: 'bg-[#7CB342]/15 text-[#7CB342]',
  },
  {
    label: 'New Contacts',
    value: '23',
    trend: '+5 this week',
    icon: MessageSquare,
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Conversion Rate',
    value: '32%',
    trend: '+4% from last month',
    icon: TrendingUp,
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Newsletter Subs',
    value: '892',
    trend: '+28 this month',
    icon: Mail,
    iconBg: 'bg-amber-100 text-amber-600',
  },
];

type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted';

interface Lead {
  name: string;
  email: string;
  service: string;
  status: LeadStatus;
  date: string;
}

const recentLeads: Lead[] = [
  { name: 'Michael Rivera', email: 'mrivera@email.com', service: 'Lawn Mowing', status: 'New', date: 'Mar 19, 2026' },
  { name: 'Sarah Thompson', email: 'sthompson@email.com', service: 'Fertilization', status: 'Contacted', date: 'Mar 18, 2026' },
  { name: 'James O\'Brien', email: 'jobrien@email.com', service: 'Aeration', status: 'Qualified', date: 'Mar 18, 2026' },
  { name: 'Linda Chen', email: 'lchen@email.com', service: 'Landscaping', status: 'Converted', date: 'Mar 17, 2026' },
  { name: 'Robert Martinez', email: 'rmartinez@email.com', service: 'Sod Installation', status: 'New', date: 'Mar 17, 2026' },
  { name: 'Emily Watson', email: 'ewatson@email.com', service: 'Sprinkler Repair', status: 'Contacted', date: 'Mar 16, 2026' },
  { name: 'David Kim', email: 'dkim@email.com', service: 'Lawn Mowing', status: 'Qualified', date: 'Mar 15, 2026' },
  { name: 'Jessica Nguyen', email: 'jnguyen@email.com', service: 'Fertilization', status: 'New', date: 'Mar 14, 2026' },
  { name: 'Brian Foster', email: 'bfoster@email.com', service: 'Landscaping', status: 'Converted', date: 'Mar 13, 2026' },
  { name: 'Amanda Reyes', email: 'areyes@email.com', service: 'Aeration', status: 'Contacted', date: 'Mar 12, 2026' },
];

type ContactStatus = 'Unread' | 'Read' | 'Replied';

interface Contact {
  name: string;
  subject: string;
  status: ContactStatus;
  date: string;
}

const recentContacts: Contact[] = [
  { name: 'Tom Bradley', subject: 'Question about spring fertilization packages', status: 'Unread', date: 'Mar 19, 2026' },
  { name: 'Karen Hughes', subject: 'Requesting a quote for backyard landscaping', status: 'Read', date: 'Mar 18, 2026' },
  { name: 'Nathan Price', subject: 'Sprinkler system not working after install', status: 'Replied', date: 'Mar 17, 2026' },
  { name: 'Olivia Grant', subject: 'Interested in weekly lawn maintenance', status: 'Unread', date: 'Mar 16, 2026' },
  { name: 'Derek Simmons', subject: 'Follow-up on sod installation estimate', status: 'Read', date: 'Mar 15, 2026' },
];

/* ------------------------------------------------------------------ */
/*  Badge colour maps                                                 */
/* ------------------------------------------------------------------ */

const leadStatusStyles: Record<LeadStatus, string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Qualified: 'bg-purple-100 text-purple-700',
  Converted: 'bg-green-100 text-green-700',
};

const contactStatusStyles: Record<ContactStatus, string> = {
  Unread: 'bg-blue-100 text-blue-700',
  Read: 'bg-gray-100 text-gray-600',
  Replied: 'bg-green-100 text-green-700',
};

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E1]/30">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#212121]">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back. Here&#39;s what&#39;s happening with Murphy&#39;s Turf Care today.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* -- Stat Cards ------------------------------------------ */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-[#212121]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-green-600">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {stat.trend}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* -- Recent Leads Table ---------------------------------- */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-[#212121]">
            Recent Leads
          </h2>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Email', 'Service', 'Status', 'Date'].map(
                      (heading) => (
                        <th
                          key={heading}
                          className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {recentLeads.map((lead, idx) => (
                    <tr
                      key={idx}
                      className="transition-colors hover:bg-gray-50/60"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#212121]">
                        {lead.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {lead.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {lead.service}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${leadStatusStyles[lead.status]}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {lead.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* -- Recent Contacts Table ------------------------------- */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-[#212121]">
            Recent Contacts
          </h2>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Subject', 'Status', 'Date'].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {recentContacts.map((contact, idx) => (
                    <tr
                      key={idx}
                      className="transition-colors hover:bg-gray-50/60"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#212121]">
                        {contact.name}
                      </td>
                      <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-600">
                        {contact.subject}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${contactStatusStyles[contact.status]}`}
                        >
                          {contact.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {contact.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* -- Quick Actions --------------------------------------- */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-[#212121]">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2D5016] px-5 py-2.5 text-sm font-medium text-[#2D5016] transition-colors hover:bg-[#2D5016] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2D5016]/40"
            >
              <Download className="h-4 w-4" />
              Export Leads
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2D5016] px-5 py-2.5 text-sm font-medium text-[#2D5016] transition-colors hover:bg-[#2D5016] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2D5016]/40"
            >
              <Eye className="h-4 w-4" />
              View All Contacts
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
