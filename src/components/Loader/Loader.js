import React from "react";
import Loader from "react-loader-spinner";
import styles from "./Loader.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends React.Component {
  //other logic
  render() {
    return (
      <div className={styles.loader}>
        <Loader
          type="Bars"
          color="#a261f7"
          height={80}
          width={80}
          timeout={3000} //3 secs
        />
      </div>
    );
  }
}
