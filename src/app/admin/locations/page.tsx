'use client';

import { useState } from 'react';
import { MapPin, Plus, Pencil, X, Check } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  phone: string;
  description: string;
  active: boolean;
}

const initialLocations: Location[] = [
  {
    id: '1',
    name: 'Huntington Beach / LA',
    phone: '(951) 331-3300',
    description:
      'Serving Huntington Beach, Long Beach, and the greater Los Angeles area with professional turf cleaning',
    active: true,
  },
  {
    id: '2',
    name: 'Murrieta / Inland Empire',
    phone: '(951) 331-3300',
    description:
      'Headquarters — full service turf cleaning for Murrieta, Temecula, Menifee, and the Inland Empire',
    active: true,
  },
  {
    id: '3',
    name: 'Martinez / Bay Area',
    phone: '(951) 331-3300',
    description:
      'Professional turf cleaning for Martinez, Concord, Walnut Creek, and the greater Bay Area',
    active: true,
  },
  {
    id: '4',
    name: 'Sacramento',
    phone: '(951) 331-3300',
    description:
      'Turf cleaning and maintenance serving Sacramento, Elk Grove, Roseville, and Folsom',
    active: true,
  },
];

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Location | null>(null);

  function startEditing(location: Location) {
    setEditingId(location.id);
    setEditForm({ ...location });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditForm(null);
  }

  function saveEdit() {
    if (!editForm) return;
    setLocations((prev) =>
      prev.map((loc) => (loc.id === editForm.id ? editForm : loc))
    );
    setEditingId(null);
    setEditForm(null);
  }

  function toggleActive(id: string) {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, active: !loc.active } : loc
      )
    );
  }

  const activeCount = locations.filter((l) => l.active).length;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D5016]/10">
            <MapPin className="h-5 w-5 text-[#2D5016]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#212121]">
              Service Locations
            </h1>
            <p className="text-sm text-[#5D4037]">
              {locations.length} locations &middot; {activeCount} active
            </p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#2D5016] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7CB342] focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Location
        </button>
      </div>

      {/* Location Cards */}
      <div className="space-y-4">
        {locations.map((location) => {
          const isEditing = editingId === location.id;

          if (isEditing && editForm) {
            return (
              <div
                key={location.id}
                className="rounded-xl border-2 border-[#7CB342] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#7CB342]">
                    Editing Location
                  </h3>
                  <button
                    onClick={cancelEditing}
                    className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#212121]">
                      Location Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-[#212121] placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7CB342] transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#212121]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-[#212121] placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7CB342] transition"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#212121]">
                      Description
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-[#212121] placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7CB342] transition resize-none"
                    />
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setEditForm({ ...editForm, active: !editForm.active })
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-2 cursor-pointer ${
                        editForm.active ? 'bg-[#2D5016]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          editForm.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="text-sm font-medium text-[#212121]">
                      {editForm.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <button
                      onClick={saveEdit}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#2D5016] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7CB342] focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-2 cursor-pointer"
                    >
                      <Check className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#212121] transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-2 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={location.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Location Info */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <h2 className="text-lg font-bold text-[#212121]">
                      {location.name}
                    </h2>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        location.active
                          ? 'bg-[#2D5016]/10 text-[#2D5016]'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {location.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="mb-2 text-sm font-medium text-[#5D4037]">
                    {location.phone}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {location.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 sm:ml-4 sm:shrink-0">
                  {/* Active/Inactive Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleActive(location.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-2 cursor-pointer ${
                      location.active ? 'bg-[#2D5016]' : 'bg-gray-300'
                    }`}
                    aria-label={
                      location.active
                        ? `Deactivate ${location.name}`
                        : `Activate ${location.name}`
                    }
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        location.active ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => startEditing(location)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-[#212121] transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-2 cursor-pointer"
                    aria-label={`Edit ${location.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
