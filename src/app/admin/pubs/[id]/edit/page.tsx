"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

interface Pub {
  _id: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
}

export default function EditPubPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<Pub>({
    _id: Array.isArray(id) ? id[0] : id || "",
    title: "",
    imageUrl: "",
    link: "",
    order: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID manquant");
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("adminToken");
    fetch(`/api/pubs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch((e) => {
        setError("Erreur: " + e);
        setLoading(false);
      });
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`/api/pubs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError((await res.json()).error || res.statusText);
      return;
    }
    router.push("/admin/pubs");
  };

  if (loading) return <p>Chargement…</p>;
  if (error) return <p className="text-red-600">Erreur: {error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Modifier Pub</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* mêmes champs que Create */}
        {[
          { name: "title", label: "Titre", type: "text" },
          { name: "imageUrl", label: "URL image", type: "text" },
          { name: "link", label: "Lien", type: "text" },
          { name: "order", label: "Ordre", type: "number" },
        ].map((f) => (
          <div key={f.name}>...</div>
        ))}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
