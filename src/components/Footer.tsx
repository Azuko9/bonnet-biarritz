"use client"; // 👈 Obligatoire pour utiliser useState

import React, { useState } from "react";
import styles from "../styles/components/footer.module.css";
import clsx from "clsx";

const Footer: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <footer className={styles.footer}>
      <button
        className={clsx(
          styles.footerButton,
          active && styles.footerButtonActive
        )}
        onClick={() => setActive(!active)}
      />
      <div
        className={clsx(
          styles.footerContent,
          active && styles.footerContentVisible
        )}
      >
        <img src="/img/LOGO_COLOR.png" className={styles.img} alt="" />
        <div>
          <p>BONNET</p>
          <p>10 allée Marie Politzer 64200 Biarritz</p>
          <p>0559417777</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
