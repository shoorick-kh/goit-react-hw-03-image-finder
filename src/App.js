import React from 'react';
import s from './App.module.css';
import Modal from './components/modal/Modal';

export default class App extends React.Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <>
        <div className={s.container}>
          {showModal && <Modal onClose={this.toggleModal} />}
        </div>
      </>
    );
  }
}
