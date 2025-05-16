// src/app/admin/dashboard/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  if (!token) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Espace Admin</h1>
      <div>
        <button
          onClick={() => router.push("/admin/profiles")}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Gérer les Profils
        </button>
        <button
          onClick={() => router.push("/admin/pubs")}
          className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Gérer les Publicités
        </button>
      </div>
    </div>
  );
}
