import { useContext, cloneElement } from 'react';

import avatarPlaceHolderImage from '../images/avatar-placeholder.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  const hiddenClassName = `${!props.allDataIsLoaded ? 'hidden' : ''}`;

  return (
    <main className='main'>
      {cloneElement(props.preloaderComponent, {
        // hide preloader
        dataIsLoaded: props.allDataIsLoaded,
      })}

      {/* <!-- PROFILE --> */}
      <section
        className={`profile ${hiddenClassName}`}
        data-user-id=''
        data-user-cohort=''>
        <div className='profile__container'>
          <div
            className='profile__photo-container'
            type='button'
            name='update-profile-photo-button'
            title='Изменить фотографию профиля'>
            <button
              className='profile__photo-overlay'
              onClick={props.onUpdateAvatar}
            />
            <img
              className='profile__photo'
              alt='Фотография пользователя.'
              src={currentUser.avatar}
            />
          </div>
          <div className='profile__main'>
            <div className='profile__headings'>
              <div className='profile__header'>
                <h1 className='profile__name'>{currentUser.name}</h1>
                <button
                  className='button profile__edit-button'
                  type='button'
                  name='edit-button'
                  title='Редактировать профиль'
                  onClick={props.onEditProfile}></button>
              </div>
              <p className='profile__about'>{currentUser.about}</p>
            </div>
          </div>
        </div>
        <button
          className='button profile__add-button'
          type='button'
          name='add-button'
          title='Добавить фотографии'
          onClick={props.onAddCard}></button>
      </section>

      {/* <!-- CARDS WITH PHOTOS --> */}
      <section
        className={`photos ${hiddenClassName}`}
        aria-label='Фотографии пользователя'>
        <ul className='cards-grid'>
          {props.cardsList.map((card) => {
            // clone Card child from App
            return cloneElement(props.cardComponent, {
              key: card._id,
              cardData: card,
              onCardThumbClick: props.onCardThumbClick,
              // from App.js
              onDeleteButtonClick: props.onDeleteButtonClick,
              onCardLike: props.onCardLike,
              dataIsLoaded: props.allDataIsLoaded,
            });
          })}
        </ul>
      </section>
    </main>
  );
}
