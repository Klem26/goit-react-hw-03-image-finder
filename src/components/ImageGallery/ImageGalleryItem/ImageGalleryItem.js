import React from "react";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ webformatURL, largeImg, tags, onClick }) => {
  return (
    <li className={styles.item} onClick={onClick}>
      <img
        className={styles.itemImage}
        src={webformatURL}
        alt={tags}
        data-src={largeImg}
      />
    </li>
  );
};

export default ImageGalleryItem;
