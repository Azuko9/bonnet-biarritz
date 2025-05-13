import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.marque}>sony</div>
      <div className={styles.marque}>sony</div>
      <div className={styles.marque}>sony</div>
      <div className={styles.marque}>sony</div>
      <div className={styles.marque}>sony</div>
      <div className={styles.marque}>sony</div>
      <div className={styles.pub}></div>
      <div className={styles.pub}></div>
    </div>
  );
}
