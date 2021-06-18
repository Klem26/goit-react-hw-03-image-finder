import React, { Component } from "react";

import imgApi from "./components/services/imgApi";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";
import ComponentLoader from "./components/Loader";
import { ReactComponent as CloseIcon } from "./components/icons/close.svg";

class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    largeImg: "",
    searchQuery: "",
    isLoading: false,
    error: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onOpenModal = (e) => {
    const largeImgUrl = e.target.dataset.src;

    console.log(largeImgUrl);
    this.setState({
      showModal: true,
      largeImg: largeImgUrl,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  // хорошо работает
  // toggleModal = () => {
  //   this.setState(state => ({
  //     showModal: !state.showModal
  //   }))
  // }

  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      hits: [],
      currentPage: 1,
      error: null,
    });
    console.log(query);
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({ isLoading: true });

    const options = {
      searchQuery,
      currentPage,
    };

    imgApi
      .fetchImages(options)
      .then((hits) => {
        // console.log(response.data.hits)

        this.setState((prevState) => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  render() {
    const { hits, isLoading, error, showModal, largeImg } = this.state;
    const shouldRenderLoadMoreBtn = hits.length > 0 && !isLoading;

    return (
      <div>
        {error && <h1>Not found please try again</h1>}

        <Searchbar onSubmit={this.onChangeQuery} />

        {isLoading && <ComponentLoader />}

        <ImageGallery hits={hits} onClick={this.onOpenModal} />

        {shouldRenderLoadMoreBtn && <Button onClick={this.fetchImages} />}

        {/* <button type="button" onClick={this.toggleModal} > Open Modal</button> */}
        {showModal && (
          <Modal onClose={this.closeModal} largeImg={largeImg}>
            <button
              className="btnCloseModal"
              type="button"
              onClick={this.closeModal}
            >
              <CloseIcon fill="#eee" />
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
