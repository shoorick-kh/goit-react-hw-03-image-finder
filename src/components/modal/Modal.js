import React from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalKeydown);
  }

  handleCloseModalKeydown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseModalOnClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.backDrop} onClick={this.handleCloseModalOnClick}>
        <div className={s.content}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
