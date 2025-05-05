// app/contact/page.tsx

import React from "react";
import styles from "../..//styles/app/contact.module.css"; // Assurez-vous que le chemin est correct

const ContactPage: React.FC = () => {
  return (
    <div className={styles.background}>
      <main className={styles.main}>
        <h1>Contact</h1>
        <p>Bienvenue sur la page de contact !</p>
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9739.438984954799!2d-1.5490222889991294!3d43.469938220032326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd511535d6b12d8d%3A0x531d06240053c307!2sBONNET%20Magasin%20TV%20-%20HIFI%20-%20VIDEO!5e0!3m2!1sfr!2sfr!4v1745420942696!5m2!1sfr!2sfr"
          width="600"
          height="400"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </main>
    </div>
  );
};

export default ContactPage;
