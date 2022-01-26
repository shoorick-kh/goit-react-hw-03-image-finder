import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import Button from '../button/Button';
import Loader from '../loader/Loader';
import fetchImage from '../services/fetchImage';

export default class ImageGallery extends React.Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    hits: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ status: 'pending', page: 1 });
      fetchImage(this.props.imageName, this.props.page)
        .then(images => {
          if (images.hits.length === 0) {
            this.setState({
              images: [],
              hits: images.hits,
              status: 'resolved',
            });
            return toast.error('No data on this request!');
          }

          this.setState({
            images: images.hits,
            hits: images.hits,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== this.state.page && this.state.page > 1) {
      this.setState({ status: 'pending' });

      fetchImage(this.props.imageName, this.state.page)
        .then(images => {
          if (images.hits.length === 0) {
            this.setState({
              images: [],
              status: 'resolved',
            });
            return toast.error('No data on this request!');
          }

          this.setState(prevState => {
            return {
              images: [...prevState.images, ...images.hits],
              hits: images.hits,
              status: 'resolved',
            };
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    this.scrollPage();
  }

  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight + 5000,
        behavior: 'smooth',
      });
    }, 200);
  };

  onClickMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { images, error, status, hits } = this.state;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved' || status === 'pending') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                imageURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                alt={image.tags}
              />
            ))}
          </ul>

          {status === 'pending' && <Loader />}
          {hits.length === 12 && <Button onClickMore={this.onClickMore} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
