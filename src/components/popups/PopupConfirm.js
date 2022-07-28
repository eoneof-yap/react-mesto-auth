import PopupWithForm from './PopupWithForm.js';

export default function PopupConfirm(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(props.selectedCard);
  }

  return (
    <PopupWithForm
      popupType='confirm'
      formTitle='Вы уверены?'
      submitButtonText='Да'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}
