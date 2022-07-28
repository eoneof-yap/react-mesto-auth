export default function ImagePopup(props) {
  const popupType = 'view';

  const cardHasData = () => {
    return (props.selectedCard.link && props.selectedCard.link) === ('' && undefined)
      ? false
      : true;
  };

  const openedClassName = `${cardHasData() && props.isOpen ? 'popup_opened' : ''}`;

  return (
    <section className={`popup popup_type_${popupType} ${openedClassName}`}>
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
          <figcaption className='preview__caption'>{props.selectedCard.name}</figcaption>
        </figure>
      </div>
      <div
        className='popup__backdrop popup__backdrop_place_preview'
        onClick={props.onClose}></div>
    </section>
  );
}
