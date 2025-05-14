// src/app/admin/profiles/[id]/edit/page.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  profession: string;
  photoUrl: string;
  phone: string;
  email: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [form, setForm] = useState<Profile>({
    _id: id || "",
    firstName: "",
    lastName: "",
    profession: "",
    photoUrl: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les données existantes
  useEffect(() => {
    if (!id) {
      setError("Identifiant invalide");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("adminToken");
    fetch(`/api/profiles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: Profile) => {
        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Impossible de charger : " + err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token manquant");
      const res = await fetch(`/api/profiles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || res.statusText);
      }
      router.push("/admin/profiles");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Chargement…</p>;
  if (error) return <p className="p-6 text-red-600">Erreur : {error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Modifier le profil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "firstName", label: "Prénom" },
          { name: "lastName", label: "Nom" },
          { name: "profession", label: "Profession" },
          { name: "photoUrl", label: "URL Photo" },
          { name: "phone", label: "Téléphone" },
          { name: "email", label: "Email" },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              value={(form as any)[field.name]}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer les modifications"}
        </button>
      </form>
    </div>
  );
}
