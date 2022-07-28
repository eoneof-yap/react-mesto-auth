import { useRef , useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmitAvatar({ avatar: avatarRef.current.value });
  }

  function handleClose() {
    props.onClose();
  }

  function resetValues() {
    avatarRef.current.value = '';
  }

  useEffect(() => {
    props.isOpen && resetValues();
  }, [props.isOpen]);

  return (
    <PopupWithForm
      formTitle='Обновить аватар'
      popupType='update'
      submitButtonText='Сохранить'
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}>
      <fieldset className='form__fieldset'>
        <div className='form__input-container'>
          <input
            className='form__input'
            id='updateInput'
            name='avatar'
            type='url'
            placeholder='Ссылка на картинку'
            ref={avatarRef}
            required
          />
          <span className='form__input-error-hint avatar-input-error'></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
