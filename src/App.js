import React from 'react';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './components/imageGallery/ImageGallery';

import Searchbar from './components/searchbar/Searchbar';

export default class App extends React.Component {
  state = {
    imageName: '',
    largeImageURL: '',
    tags: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <>
        <div className={s.container}>
          <Searchbar onSubmitForm={this.handleFormSubmit} />
          <ImageGallery imageName={this.state.imageName} />
          <ToastContainer autoClose={3000} />
        </div>
      </>
    );
  }
}
