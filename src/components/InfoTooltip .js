import React from 'react';
import iconSuccess from '../images/icon-success.svg';
import iconError from '../images/icon-error.svg';

export default function InfoTooltip(props) {
  // const openedClassName = `${props.isOpen ? 'popup_opened' : ''}`;

  // MOCK CONSTANTS
  const toggle = false;
  const openedClassName = 'popup_opened';
  const menuButtonBgImage = /* props.isInfoToolTipOpen */ toggle
    ? `url(${iconSuccess})`
    : `url(${iconError})`;

  const toolTipTiileText = toggle
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <section
      className={`popup popup_type_${props.popupType} ${openedClassName}`}>
      <div className='popup__container'>
        <button
          className='button popup__close-button'
          type='button'
          name='close-button'
          title='Закрыть'
          onClick={props.onClose}>
          Закрыть
        </button>
        <div className='tooltip'>
          <div
            className='tooltip__icon'
            style={{
              backgroundImage: `${menuButtonBgImage}`,
            }}></div>
          <h2 className='tooltip__title'>{toolTipTiileText}</h2>
        </div>
      </div>
      <div className='popup__backdrop' onClick={props.onClose}></div>
    </section>
  );
}
