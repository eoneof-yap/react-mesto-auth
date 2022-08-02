import React, { forwardRef } from 'react';

/* wrap the component with forwardRef() to get a reference
 * to a DOM node from it's parent
 */
const PopupWithForm = forwardRef((props, ref) => {
  return (
    <section className={`popup popup_type_${props.popupType}`} ref={ref}>
      <div className='popup__container'>
        <button
          className='button popup__close-button'
          type='button'
          name='close-button'
          title='Закрыть'
          onClick={props.onClose}>
          Закрыть
        </button>
        <form
          className='form form_place_popup'
          id={props.popupType}
          name={props.popupType}
          onSubmit={props.onSubmit}>
          <h2 className='form__header'>{props.formTitle}</h2>

          {props.children}

          <button
            className='button form__submit-button'
            type='submit'
            name='submit-button'
            form={props.popupType}>
            {props.submitButtonText}
          </button>
        </form>
      </div>
      <div className='popup__backdrop' onClick={props.onClose}></div>
    </section>
  );
});

export default PopupWithForm;
