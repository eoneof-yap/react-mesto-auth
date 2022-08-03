import { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup(props) {
  const nodeRef = useRef(null);
  // Use a reference to a DOM node as `findDOMNode` is deprecated
  // which is used in `CSSTransition` internally

  const titleInputRef = useRef();
  const linkInputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      name: titleInputRef.current.value,
      link: linkInputRef.current.value,
    });
  }

  function resetValues() {
    titleInputRef.current.value = '';
    linkInputRef.current.value = '';
  }

  useEffect(() => {
    props.isOpen && resetValues();
  }, [props.isOpen]);

  return (
    <CSSTransition
      in={props.isOpen}
      nodeRef={nodeRef}
      timeout={200}
      classNames='popup_opened'
      unmountOnExit>
      <PopupWithForm
        ref={nodeRef}
        formTitle='Новое место'
        popupType='add'
        submitButtonText='Сохранить'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
        {/* children */}
        <fieldset className='form__fieldset'>
          <div className='form__input-container'>
            <input
              className='form__input'
              id='photoNameInput'
              name='name'
              type='text'
              minLength='2'
              maxLength='30'
              placeholder='Название'
              ref={titleInputRef}
              required
            />
            <span className='form__input-error-hint name-input-error'></span>
          </div>
          <div className='form__input-container'>
            <input
              className='form__input'
              id='photoLinkInput'
              name='link'
              type='url'
              placeholder='Ссылка на картинку'
              ref={linkInputRef}
              required
            />
            <span className='form__input-error-hint about-input-error'></span>
          </div>
        </fieldset>
      </PopupWithForm>
    </CSSTransition>
  );
}
