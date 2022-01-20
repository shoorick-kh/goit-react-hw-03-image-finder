import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Modal from '../modal/Modal';

export default class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  onClickImage = () => {
    this.setState({
      largeImageURL: this.props.largeImageURL,
      tags: this.props.alt,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    return (
      <>
        <li className={s.ImageGalleryItem}>
          <img
            className={s.ImageGalleryItem__image}
            src={this.props.imageURL}
            alt={this.props.alt}
            onClick={this.onClickImage}
          />
        </li>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            imgURL={this.state.largeImageURL}
            tags={this.state.tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
