import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function ImagePopup(props) {
  const nodeRef = useRef(null);
  // Use a reference to a DOM node as findDOMNode is deprecated
  // which is used in CSSTransition internally

  const popupType = 'view';

  const cardHasData = () => {
    return (props.selectedCard.link && props.selectedCard.link) ===
      ('' && undefined)
      ? false
      : true;
  };

  const isOpen = cardHasData() && props.isOpen ? true : false;

  function handleExit() {
    props.clearSelectedCard();
    // Clear the property at the end of the transition,
    // otherwise there will be artefacts on hiding the popup
  }

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={200}
      onExited={handleExit}
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
          <figure className='preview'>
            <img
              className='preview__image'
              src={props.selectedCard.link}
              alt={props.selectedCard.name}
            />
            <figcaption className='preview__caption'>
              {props.selectedCard.name}
            </figcaption>
          </figure>
        </div>
        <div
          className='popup__backdrop popup__backdrop_place_preview'
          onClick={props.onClose}></div>
      </section>
    </CSSTransition>
  );
}
