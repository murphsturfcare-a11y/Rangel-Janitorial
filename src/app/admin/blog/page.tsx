'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';

type PostStatus = 'Published' | 'Draft';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  status: PostStatus;
  date: string;
}

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: '5 Essential Lawn Care Tips for Southern California Summers',
    category: 'Lawn Care',
    status: 'Published',
    date: '2026-03-15',
  },
  {
    id: 2,
    title: 'Why Aeration Matters: A Complete Guide',
    category: 'Aeration',
    status: 'Published',
    date: '2026-03-10',
  },
  {
    id: 3,
    title: 'Choosing the Right Grass for Your California Climate',
    category: 'Lawn Care',
    status: 'Published',
    date: '2026-03-05',
  },
  {
    id: 4,
    title: 'Spring Fertilization Schedule for Murrieta Homeowners',
    category: 'Fertilization',
    status: 'Published',
    date: '2026-02-28',
  },
  {
    id: 5,
    title: 'How to Save Water While Keeping Your Lawn Green',
    category: 'Water Conservation',
    status: 'Published',
    date: '2026-02-20',
  },
  {
    id: 6,
    title: 'Common Lawn Pests in the Inland Empire and How to Fight Them',
    category: 'Pest Control',
    status: 'Published',
    date: '2026-02-15',
  },
  {
    id: 7,
    title: 'The Benefits of Professional Sod Installation',
    category: 'Sod Installation',
    status: 'Draft',
    date: '2026-02-10',
  },
  {
    id: 8,
    title: 'Year-Round Lawn Maintenance Calendar for California',
    category: 'Lawn Care',
    status: 'Published',
    date: '2026-02-05',
  },
  {
    id: 9,
    title: 'Sprinkler System Maintenance: What You Need to Know',
    category: 'Irrigation',
    status: 'Draft',
    date: '2026-01-30',
  },
  {
    id: 10,
    title: 'Drought-Tolerant Landscaping Ideas for Bay Area Homes',
    category: 'Landscaping',
    status: 'Published',
    date: '2026-01-25',
  },
  {
    id: 11,
    title: 'How to Prepare Your Lawn for the Dry Season',
    category: 'Seasonal Care',
    status: 'Draft',
    date: '2026-01-20',
  },
  {
    id: 12,
    title: 'Top 10 Reasons to Hire a Professional Lawn Care Service',
    category: 'Business',
    status: 'Published',
    date: '2026-01-15',
  },
];

const STATUS_STYLES: Record<PostStatus, { bg: string; text: string }> = {
  Published: { bg: 'bg-green-100', text: 'text-green-800' },
  Draft: { bg: 'bg-gray-100', text: 'text-gray-600' },
};

type FilterStatus = 'All' | PostStatus;

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
      if (!matchesStatus) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(q);
    });
  }, [posts, statusFilter, searchQuery]);

  function handleDelete(id: number) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#212121' }}>
            Blog Posts{' '}
            <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium"
              style={{ backgroundColor: 'rgba(124, 179, 66, 0.15)', color: '#2D5016' }}
            >
              {posts.length}
            </span>
          </h1>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:opacity-90"
          style={{ backgroundColor: '#2D5016' }}
        >
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Status filter tabs */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {(
            [
              { key: 'All', label: 'All' },
              { key: 'Published', label: 'Published' },
              { key: 'Draft', label: 'Draft' },
            ] as { key: FilterStatus; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === key
                  ? 'bg-white text-[#2D5016] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title..."
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
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3.5 font-semibold" style={{ color: '#212121' }}>
                  Title
                </th>
                <th className="hidden px-4 py-3.5 font-semibold md:table-cell" style={{ color: '#212121' }}>
                  Category
                </th>
                <th className="px-4 py-3.5 font-semibold" style={{ color: '#212121' }}>
                  Status
                </th>
                <th className="hidden px-4 py-3.5 font-semibold sm:table-cell" style={{ color: '#212121' }}>
                  Date
                </th>
                <th className="px-4 py-3.5 text-right font-semibold" style={{ color: '#212121' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                    No blog posts match your filters.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => {
                  const badge = STATUS_STYLES[post.status];
                  return (
                    <tr
                      key={post.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-4 py-3.5 font-medium" style={{ color: '#212121' }}>
                        {post.title}
                      </td>
                      <td className="hidden whitespace-nowrap px-4 py-3.5 text-gray-500 md:table-cell">
                        {post.category}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.bg} ${badge.text}`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="hidden whitespace-nowrap px-4 py-3.5 text-gray-500 sm:table-cell">
                        {formatDate(post.date)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#2D5016]"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(post.id)}
                            className="rounded-md p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDeleteConfirmId(null)}
          />

          {/* Dialog */}
          <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-bold" style={{ color: '#212121' }}>
              Delete Blog Post
            </h3>
            <p className="mb-5 text-sm text-gray-600">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
