import React from "react";
import styles from "../../styles/app/contact.module.css";

interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  profession: string;
  photoUrl: string;
  phone: string;
  email: string;
}

// Option B: Server Component
export const revalidate = 60; // revalide la page toutes les 60 secondes (ISR)

export default async function ContactPage() {
  // Récupération des profils depuis l'API publique
  const res = await fetch("http://localhost:3000/api/profiles", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Impossible de charger les profils");
  }
  const profiles: Profile[] = await res.json();

  return (
    <div className={styles.background}>
      <main className={styles.main}>
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="mb-6">Bienvenue sur la page de contact !</p>

        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9739.438984954799!2d-1.5490222889991294!3d43.469938220032326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd511535d6b12d8d%3A0x531d06240053c307!2sBONNET%20Magasin%20TV%20-%20HIFI%20-%20VIDEO!5e0!3m2!1sfr!2sfr!4v1745420942696!5m2!1sfr!2sfr"
          width="600"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Nos équipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((p) => (
              <div key={p._id} className="border rounded p-4 shadow-lg">
                <img
                  src={p.photoUrl}
                  alt={`${p.firstName} ${p.lastName}`}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 text-xl font-medium">
                  {p.firstName} {p.lastName}
                </h3>
                <p className="text-gray-600">{p.profession}</p>
                <div className="mt-3 space-x-4">
                  <a href={`tel:${p.phone}`} className="underline">
                    📞 {p.phone}
                  </a>
                  <a href={`mailto:${p.email}`} className="underline">
                    ✉️ {p.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
