import React from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends React.Component {
  state = {
    imageName: '',
  };

  handleImgChange = evt => {
    this.setState({ imageName: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.info('Please, give me text for search!');
      return;
    }
    this.props.onSubmitForm(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={s.SearchForm__input}
            type="text"
            value={this.state.imageName}
            onChange={this.handleImgChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={s.SearchForm__button}>
            <span className="material-icons">image_search</span>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
