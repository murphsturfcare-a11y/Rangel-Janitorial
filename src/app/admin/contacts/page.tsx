'use client';

import { useState } from 'react';
import {
  Search,
  MessageSquare,
  Mail,
  CheckCheck,
  Eye,
  Reply,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

type ContactStatus = 'unread' | 'read' | 'replied';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  date: string;
  repliedAt?: string;
  repliedBy?: string;
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: 'Declan O\'Brien',
    email: 'declan.obrien@gmail.com',
    subject: 'Quote for front garden makeover',
    message:
      'Hi there, I\'m looking to get a full front garden makeover done. The lawn is about 80 square metres and hasn\'t been maintained in a couple of years. I\'d love a new lawn laid, edging installed, and possibly some low-maintenance planting along the path. Could you send me a rough quote when you get a chance? I\'m based in Blackrock. Thanks a million.',
    status: 'unread',
    date: '2026-03-19',
  },
  {
    id: 2,
    name: 'Siobhan Murphy',
    email: 'siobhan.murphy@outlook.com',
    subject: 'Unhappy with recent lawn treatment',
    message:
      'I had a lawn treatment carried out last Tuesday and I\'m not happy with the result. There are brown patches appearing across the back garden that weren\'t there before. I paid for the premium weed and feed service, but it seems like something went wrong with the application. I\'d appreciate it if someone could come out and have a look at it this week. My address is 14 Elm Park, Dundrum.',
    status: 'read',
    date: '2026-03-17',
  },
  {
    id: 3,
    name: 'Padraig Kavanagh',
    email: 'padraig.k@eircom.net',
    subject: 'Commercial grounds maintenance inquiry',
    message:
      'We manage a small office park in Sandyford with approximately 2,000 square metres of green space. We\'re looking for a reliable grounds maintenance company to take over from our current provider. We\'d need weekly mowing from April through October, seasonal planting in the beds, and general tidying of the communal areas. Would you be able to put together a proposal for us? Happy to arrange a site visit.',
    status: 'replied',
    date: '2026-03-15',
    repliedAt: '2026-03-16',
    repliedBy: 'admin@murphysturf.com',
  },
  {
    id: 4,
    name: 'Aoife Brennan',
    email: 'aoife.brennan@yahoo.ie',
    subject: 'Artificial grass installation',
    message:
      'Hi, I\'m interested in getting artificial grass installed in my back garden. The area is roughly 40 square metres. I have two young kids and a dog so I need something durable and pet-friendly. Could you let me know what brands you carry and what the price per square metre would be including installation? Also, do you remove the existing lawn as part of the job?',
    status: 'unread',
    date: '2026-03-19',
  },
  {
    id: 5,
    name: 'Cormac Doyle',
    email: 'cormac.doyle@hotmail.com',
    subject: 'Hedge trimming and garden tidy-up',
    message:
      'I need the hedges along my driveway trimmed back. They\'re about 3 metres tall and haven\'t been done since last summer. I\'d also like a general garden tidy-up: clearing leaves, cutting back overgrown shrubs, and edging the lawn. I\'m in Rathfarnham. What would you charge for a half-day\'s work? Available any Saturday in the next couple of weeks.',
    status: 'read',
    date: '2026-03-14',
  },
  {
    id: 6,
    name: 'Niamh Fitzgerald',
    email: 'niamh.fitz@gmail.com',
    subject: 'Moss treatment for north-facing lawn',
    message:
      'My back garden faces north and the lawn is absolutely covered in moss at this stage. It\'s soft underfoot and the grass has thinned out badly. I\'ve tried the off-the-shelf products but nothing seems to work long-term. Would you recommend scarification and overseeding or is there a better approach? I\'d appreciate your advice before committing to a treatment plan.',
    status: 'replied',
    date: '2026-03-12',
    repliedAt: '2026-03-13',
    repliedBy: 'admin@murphysturf.com',
  },
  {
    id: 7,
    name: 'Sean Walsh',
    email: 'sean.walsh22@gmail.com',
    subject: 'New lawn for new build',
    message:
      'We\'ve just moved into a new build in Lucan and the back garden is basically a mud pit. The builders left it in a terrible state. We need the ground levelled, topsoil brought in, and a new lawn laid. The garden is about 120 square metres. We\'re hoping to get it done before the summer so the kids can use it. Could you come out for a site visit next week?',
    status: 'unread',
    date: '2026-03-18',
  },
  {
    id: 8,
    name: 'Roisin Kelly',
    email: 'roisin.kelly@icloud.com',
    subject: 'Weekly mowing service',
    message:
      'I\'m looking for someone to take on weekly mowing of my front and back lawns. Front is about 30sqm and back is around 60sqm. I\'d need it done every Friday or Saturday if possible. I\'m in Stillorgan. Could you let me know your rates for a regular weekly service? I\'d be looking at an ongoing arrangement from April through to the end of September.',
    status: 'read',
    date: '2026-03-16',
  },
  {
    id: 9,
    name: 'Tommy Byrne',
    email: 'tommy.byrne@protonmail.com',
    subject: 'Drainage issue in back garden',
    message:
      'After any bit of rain the back garden turns into a swamp. The water pools in the centre and takes days to drain away. I think there might be a clay layer underneath. Would you be able to assess the drainage situation and recommend a solution? I\'ve heard of French drains but I\'m not sure if that\'s what I need. The garden is about 100 square metres. Based in Clondalkin.',
    status: 'unread',
    date: '2026-03-20',
  },
];

const statusConfig: Record<ContactStatus, { label: string; bg: string; text: string }> = {
  unread: { label: 'Unread', bg: 'bg-blue-100', text: 'text-blue-800' },
  read: { label: 'Read', bg: 'bg-gray-100', text: 'text-gray-600' },
  replied: { label: 'Replied', bg: 'bg-green-100', text: 'text-green-800' },
};

type FilterStatus = 'all' | ContactStatus;

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredContacts = contacts.filter((contact) => {
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      query === '' ||
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.subject.toLowerCase().includes(query) ||
      contact.message.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const selectedContact = selectedId
    ? contacts.find((c) => c.id === selectedId) ?? null
    : null;

  function handleRowClick(id: number) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function markAs(id: number, newStatus: ContactStatus) {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: newStatus,
              ...(newStatus === 'replied'
                ? {
                    repliedAt: new Date().toISOString().split('T')[0],
                    repliedBy: 'admin@murphysturf.com',
                  }
                : {}),
            }
          : c
      )
    );
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  const counts = {
    all: contacts.length,
    unread: contacts.filter((c) => c.status === 'unread').length,
    read: contacts.filter((c) => c.status === 'read').length,
    replied: contacts.filter((c) => c.status === 'replied').length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: '#2D5016' }}
        >
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#212121' }}>
            Contact Messages
          </h1>
          <p className="text-sm text-gray-500">
            {counts.all} total &middot; {counts.unread} unread
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Status filter tabs */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {(
            [
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'read', label: 'Read' },
              { key: 'replied', label: 'Replied' },
            ] as { key: FilterStatus; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                filterStatus === key
                  ? 'bg-white text-[#2D5016] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
              <span className="ml-1.5 text-xs text-gray-400">
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm text-[#212121] placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7CB342] transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200" style={{ backgroundColor: '#FFF8E1' }}>
                <th className="px-4 py-3 font-semibold" style={{ color: '#5D4037' }}>
                  Name
                </th>
                <th className="hidden px-4 py-3 font-semibold md:table-cell" style={{ color: '#5D4037' }}>
                  Email
                </th>
                <th className="px-4 py-3 font-semibold" style={{ color: '#5D4037' }}>
                  Subject
                </th>
                <th className="px-4 py-3 font-semibold" style={{ color: '#5D4037' }}>
                  Status
                </th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell" style={{ color: '#5D4037' }}>
                  Date
                </th>
                <th className="px-4 py-3" style={{ color: '#5D4037' }}>
                  <span className="sr-only">Expand</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    No contacts found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => {
                  const isSelected = selectedId === contact.id;
                  const badge = statusConfig[contact.status];

                  return (
                    <tr
                      key={contact.id}
                      onClick={() => handleRowClick(contact.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#FFF8E1]'
                          : 'hover:bg-gray-50'
                      } ${contact.status === 'unread' ? 'font-medium' : ''}`}
                    >
                      <td className="whitespace-nowrap px-4 py-3" style={{ color: '#212121' }}>
                        {contact.name}
                      </td>
                      <td className="hidden whitespace-nowrap px-4 py-3 text-gray-500 md:table-cell">
                        {contact.email}
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3" style={{ color: '#212121' }}>
                        {contact.subject}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.bg} ${badge.text}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="hidden whitespace-nowrap px-4 py-3 text-gray-500 sm:table-cell">
                        {formatDate(contact.date)}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {isSelected ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expandable detail panel */}
      {selectedContact && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Detail header */}
          <div
            className="flex flex-col gap-1 border-b border-gray-200 px-6 py-4"
            style={{ backgroundColor: '#FFF8E1' }}
          >
            <h2 className="text-lg font-semibold" style={{ color: '#2D5016' }}>
              {selectedContact.subject}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {selectedContact.name} &lt;{selectedContact.email}&gt;
              </span>
              <span>{formatDate(selectedContact.date)}</span>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[selectedContact.status].bg} ${statusConfig[selectedContact.status].text}`}
              >
                {statusConfig[selectedContact.status].label}
              </span>
            </div>
          </div>

          {/* Message body */}
          <div className="px-6 py-5">
            <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: '#212121' }}>
              {selectedContact.message}
            </p>
          </div>

          {/* Reply info */}
          {selectedContact.status === 'replied' && selectedContact.repliedAt && (
            <div className="border-t border-gray-100 bg-green-50 px-6 py-3">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <CheckCheck className="h-4 w-4" />
                <span>
                  Replied on {formatDate(selectedContact.repliedAt)} by{' '}
                  <span className="font-medium">{selectedContact.repliedBy}</span>
                </span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 border-t border-gray-200 px-6 py-4">
            {selectedContact.status !== 'read' && selectedContact.status !== 'replied' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markAs(selectedContact.id, 'read');
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-1"
              >
                <Eye className="h-4 w-4" />
                Mark as Read
              </button>
            )}
            {selectedContact.status !== 'replied' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markAs(selectedContact.id, 'replied');
                }}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-1"
                style={{ backgroundColor: '#2D5016' }}
              >
                <Reply className="h-4 w-4" />
                Mark as Replied
              </button>
            )}
            {selectedContact.status === 'replied' && (
              <span className="inline-flex items-center gap-2 text-sm text-green-700">
                <CheckCheck className="h-4 w-4" />
                This message has been replied to
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
