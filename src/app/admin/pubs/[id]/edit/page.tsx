// src/app/admin/pubs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Pub {
  _id: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
}

export default function AdminPubsPage() {
  const router = useRouter();
  const [pubs, setPubs] = useState<Pub[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch("/api/pubs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(setPubs)
      .catch((err) => setError("Impossible de charger : " + err));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette pub ?")) return;
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`/api/pubs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setPubs((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert("Erreur suppression");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des pubs</h1>
      <button
        onClick={() => router.push("/admin/pubs/create")}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Nouvelle pub
      </button>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pubs.map((pub) => (
          <div key={pub._id} className="border p-4 rounded shadow">
            <img
              src={pub.imageUrl}
              alt={pub.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-2 font-semibold text-lg">{pub.title}</h2>
            <p className="text-sm text-gray-600">Ordre: {pub.order}</p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => router.push(`/admin/pubs/${pub._id}/edit`)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(pub._id)}
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
