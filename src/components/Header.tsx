import react from "react";
import clsx from "clsx";
import styles from "../styles/components/header.module.css";

const Header: React.FC = () => {
  return (
    <header className={clsx(styles.header, "abso")}>
      <img
        className={clsx(styles.logo, "abso")}
        src="/img/LOGO_COLOR.png"
        alt=""
      />
      <div className={clsx(styles.ongletA, "abso")}></div>
      <div>
        <div className={clsx(styles.ongletB, "abso")}>
          <a href="">hello</a>
        </div>
        <div className={clsx(styles.ongletC, "abso")}>
          <a href="">hello</a>
        </div>
        <div className={clsx(styles.ongletD, "abso")}>
          <a href="">hello</a>
        </div>
        <div className={clsx(styles.ongletE, "abso")}>
          <a href="">CINEMA</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
