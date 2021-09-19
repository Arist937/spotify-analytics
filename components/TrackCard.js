import React from "react";
import styles from "./styles/trackCard.module.css";
import Image from "next/image";

const TrackCard = ({ name, picture }) => {
  return (
    <div className={styles.container}>
      <Image src={picture} alt="album cover" width={100} height={100} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default TrackCard;
