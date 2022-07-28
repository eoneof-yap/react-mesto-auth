export default function PopupWithForm(props) {
  const openedClassName = `${props.isOpen ? 'popup_opened' : ''}`;

  return (
    <section className={`popup popup_type_${props.popupType} ${openedClassName}`}>
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
          className='form'
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
}
