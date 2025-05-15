// src/app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Interfaces
interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  profession: string;
  photoUrl: string;
  phone: string;
  email: string;
}
interface Pub {
  _id: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
}

enum Tab {
  Profiles = "PROFILES",
  Pubs = "PUBS",
}

export default function AdminDashboard() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  if (!token) {
    router.push("/login");
    return null;
  }

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Profiles);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [pubs, setPubs] = useState<Pub[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data based on active tab
    const fetchData = async () => {
      setError(null);
      try {
        if (activeTab === Tab.Profiles) {
          const res = await fetch("/api/profiles", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error(`Status ${res.status}`);
          setProfiles(await res.json());
        } else {
          const res = await fetch("/api/pubs", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error(`Status ${res.status}`);
          setPubs(await res.json());
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchData();
  }, [activeTab, token]);

  const handleDelete = async (id: string) => {
    if (!confirm("Confirmer la suppression ?")) return;
    try {
      const url =
        activeTab === Tab.Profiles ? `/api/profiles/${id}` : `/api/pubs/${id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(res.statusText);
      if (activeTab === Tab.Profiles)
        setProfiles((ps) => ps.filter((p) => p._id !== id));
      else setPubs((ps) => ps.filter((p) => p._id !== id));
    } catch (err: any) {
      alert("Erreur: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Tab Navigation */}
      <div className="mb-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === Tab.Profiles
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(Tab.Profiles)}
        >
          Profils
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === Tab.Pubs ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(Tab.Pubs)}
        >
          Pubs
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">Erreur: {error}</p>}

      {/* Content */}
      {activeTab === Tab.Profiles ? (
        <div>
          <button
            onClick={() => router.push("/admin/profiles/create")}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            + Ajouter Profil
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((p) => (
              <div
                key={p._id}
                className="border p-4 rounded shadow flex flex-col"
              >
                <img
                  src={p.photoUrl}
                  alt={`${p.firstName} ${p.lastName}`}
                  className="h-32 w-full object-cover rounded"
                />
                <h2 className="mt-2 font-semibold">
                  {p.firstName} {p.lastName}
                </h2>
                <p className="text-sm text-gray-600">{p.profession}</p>
                <div className="mt-auto pt-2 flex space-x-2">
                  <button
                    onClick={() => router.push(`/admin/profiles/${p._id}/edit`)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => router.push("/admin/pubs/create")}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            + Ajouter Pub
          </button>
          <div className="space-y-4">
            {pubs.map((pub) => (
              <div
                key={pub._id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{pub.title}</h2>
                  <p className="text-sm text-gray-600">Ordre: {pub.order}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => router.push(`/admin/pubs/${pub._id}/edit`)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(pub._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
