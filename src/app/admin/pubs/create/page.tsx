"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CreatePubPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    link: "",
    order: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/pubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || res.statusText);
      router.push("/admin/pubs");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Créer Pub</h1>
      {error && <p className="text-red-600 mb-4">Erreur: {error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Champs title, imageUrl, link, order */}
        {[
          { name: "title", label: "Titre", type: "text" },
          { name: "imageUrl", label: "URL image", type: "text" },
          { name: "link", label: "Lien", type: "text" },
          { name: "order", label: "Ordre", type: "number" },
        ].map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="block mb-1">
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              value={(form as any)[f.name]}
              onChange={onChange}
              required={f.name != "link"}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Création…" : "Créer"}
        </button>
      </form>
    </div>
  );
}
