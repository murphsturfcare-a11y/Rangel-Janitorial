"use client";

import { useState } from "react";
import { Star, Plus, Pencil, Trash2, X } from "lucide-react";

interface Testimonial {
  id: number;
  customerName: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  published: boolean;
  featured: boolean;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    customerName: "Mike Henderson",
    location: "Murrieta, CA",
    rating: 5,
    text: "Murphy's Turf Care completely transformed our backyard. The aeration and overseeding service they provided last fall has our lawn looking the best it ever has. Neighbors keep stopping by to ask who we use. Their team was punctual, professional, and clearly knows California turf. Couldn't be happier with the results.",
    date: "2026-02-18",
    published: true,
    featured: true,
  },
  {
    id: 2,
    customerName: "Sarah Collins",
    location: "Temecula, CA",
    rating: 5,
    text: "We struggled with patchy brown spots for years until we called Murphy's Turf Care. They did a full soil analysis and put us on a custom fertilization program. Within two months the difference was night and day. Their knowledge of Southern California lawn care is second to none.",
    date: "2026-02-05",
    published: true,
    featured: true,
  },
  {
    id: 3,
    customerName: "James Whitaker",
    location: "Los Angeles, CA",
    rating: 4,
    text: "Great mowing and edging service. They keep our large property looking sharp every week. Only reason for four stars is scheduling can occasionally shift, but they always communicate. Overall very reliable crew.",
    date: "2026-01-22",
    published: true,
    featured: false,
  },
  {
    id: 4,
    customerName: "Linda Perez",
    location: "Murrieta, CA",
    rating: 5,
    text: "Hired Murphy's Turf for a complete sprinkler system overhaul and seasonal lawn maintenance. They identified leaks we didn't even know about and optimized our watering zones to save water. Our water bill dropped noticeably and the lawn has never been greener. Highly recommend their irrigation expertise.",
    date: "2026-01-10",
    published: true,
    featured: true,
  },
  {
    id: 5,
    customerName: "Tom Bradley",
    location: "Sacramento, CA",
    rating: 4,
    text: "Solid weed control program. Our yard was overrun with dandelions and clover. After two treatments the weeds were gone and the grass filled in nicely. Fair pricing for the quality of work.",
    date: "2025-12-28",
    published: true,
    featured: false,
  },
  {
    id: 6,
    customerName: "Rachel Nguyen",
    location: "Martinez, CA",
    rating: 5,
    text: "We just moved into a new build with bare dirt for a yard. Murphy's Turf handled the entire sod installation from grading to laying the turf. They even set up a watering schedule for us to follow. Six months later and it looks like it's been established for years. Exceptional work from start to finish.",
    date: "2025-12-15",
    published: true,
    featured: false,
  },
  {
    id: 7,
    customerName: "Dave Morrison",
    location: "Walnut Creek, CA",
    rating: 3,
    text: "Decent leaf cleanup and fall prep service. They got the job done, though I felt the crew rushed through the final blowing. The spring aeration they did was much better. Will give them another shot this year.",
    date: "2025-11-30",
    published: false,
    featured: false,
  },
  {
    id: 8,
    customerName: "Karen O'Brien",
    location: "Los Angeles, CA",
    rating: 5,
    text: "Five stars isn't enough! Murphy's Turf Care has been maintaining our commercial property for over a year now and the grounds always look immaculate. Their crew is courteous, they clean up after every visit, and the monthly reports they send are a nice touch. Best landscaping company we've worked with in California.",
    date: "2025-11-12",
    published: true,
    featured: true,
  },
  {
    id: 9,
    customerName: "Brian Kowalski",
    location: "Sacramento, CA",
    rating: 4,
    text: "Had them do a full spring cleanup — dethatching, aeration, and a first round of fertilizer. The yard bounced back from winter damage faster than any year prior. Good communication and reasonable rates.",
    date: "2025-10-20",
    published: true,
    featured: false,
  },
];

function StarRating({
  rating,
  interactive = false,
  onChange,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer" : ""}`}
          onClick={() => interactive && onChange?.(i)}
        />
      ))}
    </div>
  );
}

function Toggle({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        role="switch"
        aria-checked={enabled}
        tabIndex={0}
        onClick={() => onChange(!enabled)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(!enabled);
          }
        }}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          enabled ? "bg-[#2D5016]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </label>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const emptyForm: Omit<Testimonial, "id"> = {
    customerName: "",
    location: "",
    rating: 5,
    text: "",
    date: new Date().toISOString().split("T")[0],
    published: false,
    featured: false,
  };

  const [formData, setFormData] = useState<Omit<Testimonial, "id">>(emptyForm);

  function openAddModal() {
    setEditingId(null);
    setFormData(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(testimonial: Testimonial) {
    setEditingId(testimonial.id);
    setFormData({
      customerName: testimonial.customerName,
      location: testimonial.location,
      rating: testimonial.rating,
      text: testimonial.text,
      date: testimonial.date,
      published: testimonial.published,
      featured: testimonial.featured,
    });
    setModalOpen(true);
  }

  function handleSave() {
    if (!formData.customerName.trim() || !formData.text.trim()) return;

    if (editingId !== null) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...formData } : t))
      );
    } else {
      const newId = Math.max(0, ...testimonials.map((t) => t.id)) + 1;
      setTestimonials((prev) => [{ id: newId, ...formData }, ...prev]);
    }
    setModalOpen(false);
  }

  function handleDelete(id: number) {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirmId(null);
  }

  function togglePublished(id: number) {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published: !t.published } : t))
    );
  }

  function toggleFeatured(id: number) {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, featured: !t.featured } : t))
    );
  }

  function toggleExpanded(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const TRUNCATE_LENGTH = 150;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#212121]">
            Testimonials{" "}
            <span className="ml-2 text-base font-normal text-gray-500">
              ({testimonials.length})
            </span>
          </h1>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:opacity-90"
          style={{ backgroundColor: "#2D5016" }}
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {/* Testimonial Cards */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {testimonials.map((testimonial) => {
          const isExpanded = expandedIds.has(testimonial.id);
          const needsTruncation = testimonial.text.length > TRUNCATE_LENGTH;
          const displayText =
            needsTruncation && !isExpanded
              ? testimonial.text.slice(0, TRUNCATE_LENGTH) + "..."
              : testimonial.text;

          return (
            <div
              key={testimonial.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              {/* Top row: stars + date */}
              <div className="mb-3 flex items-center justify-between">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs text-gray-400">
                  {formatDate(testimonial.date)}
                </span>
              </div>

              {/* Customer info */}
              <div className="mb-2">
                <span className="font-semibold text-[#212121]">
                  {testimonial.customerName}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {testimonial.location}
                </span>
              </div>

              {/* Testimonial text */}
              <p className="mb-4 text-sm leading-relaxed text-gray-700">
                {displayText}
                {needsTruncation && (
                  <button
                    onClick={() => toggleExpanded(testimonial.id)}
                    className="ml-1 font-medium text-[#2D5016] hover:underline"
                  >
                    {isExpanded ? "show less" : "show more"}
                  </button>
                )}
              </p>

              {/* Toggles + Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                <div className="flex flex-wrap gap-4">
                  <Toggle
                    enabled={testimonial.published}
                    onChange={() => togglePublished(testimonial.id)}
                    label="Published"
                  />
                  <Toggle
                    enabled={testimonial.featured}
                    onChange={() => toggleFeatured(testimonial.id)}
                    label="Featured"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(testimonial)}
                    className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#2D5016]"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(testimonial.id)}
                    className="rounded-md p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            {/* Modal header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#212121]">
                {editingId !== null ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#2D5016] focus:outline-none focus:ring-1 focus:ring-[#2D5016]"
                  placeholder="e.g. John Smith"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#2D5016] focus:outline-none focus:ring-1 focus:ring-[#2D5016]"
                  placeholder="e.g. Murrieta, CA"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <StarRating
                  rating={formData.rating}
                  interactive
                  onChange={(r) => setFormData({ ...formData, rating: r })}
                />
              </div>

              {/* Testimonial Text */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Testimonial Text
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#2D5016] focus:outline-none focus:ring-1 focus:ring-[#2D5016]"
                  placeholder="What did the customer say?"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 accent-[#2D5016]"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 accent-[#2D5016]"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
              </div>
            </div>

            {/* Modal actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:opacity-90"
                style={{ backgroundColor: "#2D5016" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
            <h3 className="mb-2 text-lg font-bold text-[#212121]">
              Delete Testimonial
            </h3>
            <p className="mb-5 text-sm text-gray-600">
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
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
