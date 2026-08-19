import { useState } from "react";
import styles from "./PageHeader.module.css";

function PageHeader() {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.contaainer}>
        <button className={styles.btn}>Сегодня</button>

        <button className={styles.btn}>Завтра</button>

        <button className={styles.btn}>3 дня</button>

        <button className={styles.btn}>Неделя</button>

        <button className={styles.btn}> 2 недели</button>
      </div>
    </div>
  );
}

export default PageHeader;
