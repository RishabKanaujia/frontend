import React from "react";
import styles from "./style.module.css";
import { useState } from "react";

const FlipBox = ({ data, color1, color2 }) => {
  const [flip, setFlip] = useState(false);
  const style1 = { background: color1, opacity: flip ? "0%" : "100%" };
  const style2 = { background: color2, opacity: flip ? "100%" : "0%" };

  const changeflip = () => {
    setFlip(!flip);
  };

  return (
    <div className={styles.flipbox} onClick={changeflip}>
      <div className={`${styles.frontbox} ${flip?styles.flip:""}`} style={style1}>
        <label>{data.label}</label>
      </div>
      <div className={`${styles.backbox} ${!flip?styles.flip:""}`} style={style2}>
        <label>{data.value}</label>
      </div>
    </div>
  );
};

export default FlipBox;
