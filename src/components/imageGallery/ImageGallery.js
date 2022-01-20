import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import Button from '../button/Button';
import Spinner from 'react-spinner';
// import Loader from '../loader/Loader';

export default class ImageGallery extends React.Component {
  state = {
    images: [],
    loading: false,
    page: null,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.page);
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ page: 1 });
    }

    if (
      prevProps.imageName !== this.props.imageName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.imageName}&page=${this.state.page}&key=24260489-c6ae81bdca94ae3f2fdf467ab&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(images => {
          if (images.hits.length === 0) {
            this.setState({ page: null });
            return toast.error('No data on this request!');
          }

          if (this.state.page === 1) {
            this.setState({ images: images.hits });
          } else {
            this.setState(prevState => {
              return { images: [...prevState.images, ...images.hits] };
            });
          }
        })
        .finally(this.setState({ loading: false }));
      // .catch(toast.error('Error 404'));
    }
  }

  onClickMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
    console.log(this.state.page);
    console.log(this.state.images);
  };

  render() {
    const { images } = this.state;
    return (
      <>
        {this.state.loading && <Spinner />}
        {images && (
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
        )}
        {images % 12 !== 0 && <Button onClickMore={this.onClickMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string,
};
