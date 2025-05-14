"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    photoUrl: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token admin manquant");
      const res = await fetch("/api/profiles", {
        method: "POST",
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
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Nouveau profil</h1>
      {error && <p className="text-red-600 mb-4">Erreur : {error}</p>}
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
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Enregistrement…" : "Créer le profil"}
        </button>
      </form>
    </div>
  );
}
