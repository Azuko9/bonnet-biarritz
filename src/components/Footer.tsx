// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={{ textAlign: "center", padding: "20px 0" }}>
      <p>je fais un test de footer</p>
      <p>© {new Date().getFullYear()} Mon Site. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
