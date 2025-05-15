// src/app/page.tsx
import React from "react";
import styles from "./page.module.css";

interface Pub {
  _id: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Home() {
  // Fetch public list of pubs
  const res = await fetch("http://localhost:3000/api/pubs", {
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("Failed to fetch pubs", res.status);
    return (
      <div className={styles.main}>
        <p>Impossible de charger les publicités.</p>
      </div>
    );
  }
  const pubs: Pub[] = await res.json();

  return (
    <div className={styles.main}>
      {/* Vos blocs marque */}
      <div className={styles.marque}>sony</div>
      <div className={styles.marque}>sony</div>
      <div className={styles.marque}>sony</div>

      {/* Pubs dynamiques */}
      {pubs.map((pub) => (
        <div key={pub._id} className={styles.pub}>
          {pub.link ? (
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pubLink}
            >
              <img
                src={pub.imageUrl}
                alt={pub.title}
                className={styles.pubImg}
              />
              <h3 className={styles.pubTitle}>{pub.title}</h3>
            </a>
          ) : (
            <>
              <img
                src={pub.imageUrl}
                alt={pub.title}
                className={styles.pubImg}
              />
              <h3 className={styles.pubTitle}>{pub.title}</h3>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
