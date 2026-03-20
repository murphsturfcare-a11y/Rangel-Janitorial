'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Pencil, Plus, X } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  active: boolean;
  sortOrder: number;
}

/* ------------------------------------------------------------------ */
/*  Hardcoded sample data                                              */
/* ------------------------------------------------------------------ */

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Pet Hair & Debris Removal',
    description: 'Thorough removal of pet hair, leaves, dirt, and embedded debris from artificial turf fibers',
    price: 'Starting at $75',
    active: true,
    sortOrder: 1,
  },
  {
    id: '2',
    name: 'Blooming & De-Compacting',
    description: 'Restore turf fibers to their upright position and de-compact infill for a like-new look and feel',
    price: 'Starting at $95',
    active: true,
    sortOrder: 2,
  },
  {
    id: '3',
    name: 'Disinfect & Deodorize',
    description: 'Deep sanitization and odor elimination using pet-safe, eco-friendly cleaning solutions',
    price: 'Starting at $85',
    active: true,
    sortOrder: 3,
  },
  {
    id: '4',
    name: 'Poop Scooping & Removal',
    description: 'Complete pet waste removal and disposal to keep your turf clean and hygienic',
    price: 'Starting at $45',
    active: true,
    sortOrder: 4,
  },
  {
    id: '5',
    name: 'Powered By OxyTurf',
    description: 'Premium oxidizing turf treatment that breaks down organic matter at the molecular level for the deepest clean',
    price: 'Contact for pricing',
    active: true,
    sortOrder: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);

  /* ---- reorder helpers ---- */

  function moveUp(index: number) {
    if (index === 0) return;
    setServices((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next.map((s, i) => ({ ...s, sortOrder: i + 1 }));
    });
  }

  function moveDown(index: number) {
    if (index === services.length - 1) return;
    setServices((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next.map((s, i) => ({ ...s, sortOrder: i + 1 }));
    });
  }

  /* ---- toggle active ---- */

  function toggleActive(id: string) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  }

  /* ---- edit helpers ---- */

  function openEdit(service: Service) {
    setEditingService({ ...service });
  }

  function saveEdit() {
    if (!editingService) return;
    setServices((prev) =>
      prev.map((s) => (s.id === editingService.id ? editingService : s)),
    );
    setEditingService(null);
  }

  function cancelEdit() {
    setEditingService(null);
  }

  /* ---- render ---- */

  return (
    <div className="min-h-screen bg-[#FFF8E1]/30">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#212121]">
              Services
              <span className="ml-2 inline-flex items-center rounded-full bg-[#7CB342]/15 px-2.5 py-0.5 text-sm font-medium text-[#2D5016]">
                {services.length}
              </span>
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and reorder the services displayed on the website.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2D5016] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2D5016]/90 focus:outline-none focus:ring-2 focus:ring-[#2D5016]/40"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-4">
        {/* -- Service Cards ---------------------------------------- */}
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`rounded-xl bg-white shadow-sm border transition-all duration-200 ${
              service.active
                ? 'border-gray-200'
                : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              {/* Sort order badge */}
              <div className="flex items-center gap-4 sm:w-12 shrink-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7CB342]/15 text-sm font-bold text-[#2D5016]">
                  {service.sortOrder}
                </span>
              </div>

              {/* Service info */}
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[#212121]">
                  {service.name}
                </h3>
                <p className="mt-0.5 text-sm text-gray-500 line-clamp-2">
                  {service.description}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#2D5016]">
                  {service.price}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Active toggle */}
                <button
                  type="button"
                  onClick={() => toggleActive(service.id)}
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#7CB342]/40 focus:ring-offset-2"
                  style={{
                    backgroundColor: service.active ? '#7CB342' : '#d1d5db',
                  }}
                  role="switch"
                  aria-checked={service.active}
                  aria-label={`Toggle ${service.name} ${service.active ? 'off' : 'on'}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      service.active ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="w-16 text-xs font-medium text-gray-500">
                  {service.active ? 'Active' : 'Inactive'}
                </span>

                {/* Reorder buttons */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="rounded p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#2D5016] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                    aria-label={`Move ${service.name} up`}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === services.length - 1}
                    className="rounded p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#2D5016] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                    aria-label={`Move ${service.name} down`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Edit button */}
                <button
                  type="button"
                  onClick={() => openEdit(service)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7CB342]/40"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* -- Edit Modal --------------------------------------------- */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={cancelEdit}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl mx-4">
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#212121]">
                Edit Service
              </h2>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Service name */}
              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-[#212121] mb-1"
                >
                  Service Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={editingService.name}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#212121] placeholder:text-gray-400 focus:border-[#7CB342] focus:outline-none focus:ring-2 focus:ring-[#7CB342]/30"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="edit-description"
                  className="block text-sm font-medium text-[#212121] mb-1"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  rows={3}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#212121] placeholder:text-gray-400 focus:border-[#7CB342] focus:outline-none focus:ring-2 focus:ring-[#7CB342]/30 resize-none"
                />
              </div>

              {/* Price info */}
              <div>
                <label
                  htmlFor="edit-price"
                  className="block text-sm font-medium text-[#212121] mb-1"
                >
                  Price Info
                </label>
                <input
                  id="edit-price"
                  type="text"
                  value={editingService.price}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      price: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#212121] placeholder:text-gray-400 focus:border-[#7CB342] focus:outline-none focus:ring-2 focus:ring-[#7CB342]/30"
                />
              </div>

              {/* Active toggle */}
              <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                <span className="text-sm font-medium text-[#212121]">
                  Active Status
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setEditingService({
                      ...editingService,
                      active: !editingService.active,
                    })
                  }
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#7CB342]/40 focus:ring-offset-2"
                  style={{
                    backgroundColor: editingService.active
                      ? '#7CB342'
                      : '#d1d5db',
                  }}
                  role="switch"
                  aria-checked={editingService.active}
                  aria-label="Toggle active status"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      editingService.active
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="rounded-lg bg-[#2D5016] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2D5016]/90 focus:outline-none focus:ring-2 focus:ring-[#2D5016]/40"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
