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
    fetch("/api/pubs", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(setPubs)
      .catch((err) => setError("Erreur: " + err));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette pub ?")) return;
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`/api/pubs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setPubs((prev) => prev.filter((p) => p._id !== id));
    else alert("Erreur suppression");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des pubs</h1>
      <button
        onClick={() => router.push("/admin/pubs/create")}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        + Nouvelle pub
      </button>
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        {pubs.map((pub) => (
          <div
            key={pub._id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h2 className="font-semibold">{pub.title}</h2>
              <p className="text-sm">Ordre: {pub.order}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/admin/pubs/${pub._id}/edit`)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(pub._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
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
