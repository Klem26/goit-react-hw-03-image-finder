import React, { Component } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handelKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handelKeydown);
  }

  handelKeydown = (e) => {
    if (e.code === "Escape") {
      console.log("закрыть модалку");
      this.props.onClose();
    }
  };
  handelBackDropClick = (e) => {
    console.log(e.currentTarget);
    console.log(e.target);

    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImg, tag } = this.props;

    return createPortal(
      <div className={styles.backdrop} onClick={this.handelBackDropClick}>
        <div className={styles.content}>
          {this.props.children}
          <img src={largeImg} alt={tag} />
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};
