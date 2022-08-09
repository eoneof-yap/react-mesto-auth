import React, { useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import iconSuccess from '../../images/icon-success.svg';
import iconError from '../../images/icon-error.svg';

export default function InfoTooltip(props) {
  const nodeRef = useRef(null);
  // Use a reference to a DOM node as `findDOMNode` is deprecated
  // which is used in `CSSTransition` internally

  const [content, setContent] = useState({
    icon: '',
    text: '',
  });

  function handelTooltipType() {
    if (props.tooltipType === 'success') {
      setContent({
        icon: `url(${iconSuccess})`,
        text: 'Вы успешно зарегистрировались!',
      });
    } else if (props.tooltipType === 'error') {
      setContent({
        icon: `url(${iconError})`,
        text: 'Что-то пошло не так! Попробуйте ещё раз.',
      });
    }
  }

  function handleClose() {
    props.onClose(props.tooltipType);
  }

  useEffect(() => {
    handelTooltipType();
  }, [props.tooltipType]);

  return (
    <CSSTransition
      in={props.isOpen}
      nodeRef={nodeRef}
      timeout={200}
      classNames='popup_opened'
      unmountOnExit={true}>
      <section
        className={`popup popup_type_${props.tooltipType}`}
        ref={nodeRef}>
        <div className='popup__container'>
          <button
            className='button popup__close-button'
            type='button'
            name='close-button'
            title='Закрыть'
            onClick={handleClose}>
            Закрыть
          </button>
          <div className='tooltip'>
            <div
              className='tooltip__icon'
              style={{
                backgroundImage: `${content.icon}`,
              }}></div>
            <h2 className='tooltip__title'>{content.text}</h2>
          </div>
        </div>
        <div className='popup__backdrop' onClick={handleClose}></div>
      </section>
    </CSSTransition>
  );
}
