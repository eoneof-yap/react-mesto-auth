import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import iconSuccess from '../../images/icon-success.svg';
import iconError from '../../images/icon-error.svg';

export default function InfoTooltip(props) {
  const success = true;
  const nodeRef = useRef(null);
  const popupType = 'tooltip';

  // MOCK CONSTANTS
  const tooltipImage = success ? `url(${iconSuccess})` : `url(${iconError})`;

  const toolTipTiileText = success
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <CSSTransition
      in={props.isOpen}
      nodeRef={nodeRef}
      timeout={200}
      classNames='popup_opened'
      unmountOnExit={true}>
      <section className={`popup popup_type_${popupType}`} ref={nodeRef}>
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
                backgroundImage: `${tooltipImage}`,
              }}></div>
            <h2 className='tooltip__title'>{toolTipTiileText}</h2>
          </div>
        </div>
        <div className='popup__backdrop' onClick={props.onClose}></div>
      </section>
    </CSSTransition>
  );
}
