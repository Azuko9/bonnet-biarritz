import react from "react";
import clsx from "clsx";
import styles from "../styles/components/header.module.css";

const Header: React.FC = () => {
  return (
    <header className={clsx(styles.header, "abso")}>
      <div className={clsx(styles.ongletA, "abso")}>
      <img  src="/public/img/logo-b.png" alt="" />
        <img className={clsx(styles.logo, "abso")}
          
          src="/public/img/logo-circle-little.png"
          alt=""
        />
        <img
          
          src="/public/img/logo-circle-big.png"
          alt=""
        />
        <p className="abso" id="text-logo">BONNET</p>
      </div>
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
