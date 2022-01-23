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
    hits: null,
  };

  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 100,
        behavior: 'smooth',
      });
    }, 300);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ status: 'pending', page: 1 });
      fetchImage(this.props.imageName, this.props.page)
        .then(images => {
          if (images.hits.length === 0) {
            this.setState({
              page: 1,
              images: [],
              hits: images.hits,
              status: 'resolved',
            });
            return toast.error('No data on this request!');
          }

          if (this.state.page === 1) {
            this.setState(state => ({ page: state.page + 1 }));
            this.setState({
              images: images.hits,
              hits: images.hits,
              status: 'resolved',
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    this.scrollPage();
  }

  onClickMore = () => {
    this.setState(state => ({ page: state.page + 1, status: 'pending' }));

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

    this.scrollPage();
  };

  render() {
    const { images, error, status, hits } = this.state;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return (
        <>
          <ul className={s.loader__list}>
            {images.map(image => (
              <li key={image.id}>
                <div className={s.loader_card}>
                  <Loader />
                </div>
              </li>
            ))}
          </ul>
        </>
      );
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
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
