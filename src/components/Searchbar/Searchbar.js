import React, { Component } from "react";
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

class SearchForm extends Component {
  state = { query: "" };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <button className={styles.searchFormBtn} type="submit">
            <span className={styles.searchFormBtnLabel}>Search</span>
          </button>

          <input
            className={styles.searchFormInput}
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
