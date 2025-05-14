"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  profession: string;
  photoUrl: string;
  phone: string;
  email: string;
}

export default function AdminProfilesPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 1) Charger la liste des profils au montage
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch("/api/profiles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(setProfiles)
      .catch((err) => setError("Impossible de charger les profils: " + err));
  }, []);

  // 2) Supprimer un profil
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce profil ?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/profiles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(res.statusText);
      // Retirer du state pour actualiser l’affichage
      setProfiles((profs) => profs.filter((p) => p._id !== id));
    } catch (err: any) {
      alert("Erreur suppression : " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des profils</h1>
      <button
        onClick={() => router.push("/admin/profiles/create")}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ➕ Nouveau profil
      </button>
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((p) => (
          <div key={p._id} className="border rounded p-4 shadow">
            <img
              src={p.photoUrl}
              alt={`${p.firstName} ${p.lastName}`}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="mt-2 text-xl font-semibold">
              {p.firstName} {p.lastName}
            </h2>
            <p className="text-gray-600">{p.profession}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => router.push(`/admin/profiles/${p._id}/edit`)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
