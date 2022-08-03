import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import PopupWithForm from './PopupWithForm.js';

export default function PopupConfirm(props) {
  const nodeRef = useRef(null);
  // Use a reference to a DOM node as `findDOMNode` is deprecated
  // which is used in `CSSTransition` internally

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(props.selectedCard);
  }

  return (
    <CSSTransition
      in={props.isOpen}
      nodeRef={nodeRef}
      timeout={200}
      classNames='popup_opened'
      unmountOnExit>
      <PopupWithForm
        ref={nodeRef}
        popupType='confirm'
        formTitle='Вы уверены?'
        submitButtonText='Да'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      />
    </CSSTransition>
  );
}
