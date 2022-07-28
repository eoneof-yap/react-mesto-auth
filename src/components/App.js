import { useState, useEffect } from 'react';

import * as utils from '../utils/utils.js';
import * as consts from '../utils/constants.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Preloader from './Preloader.js';
import EditAvatarPopup from './popups/EditAvatarPopup.js';
import EditProfilePopup from './popups/EditProfilePopup.js';
import AddPlacePopup from './popups/AddPlacePopup.js';
import ImagePopup from './popups/ImagePopup.js';
import PopupConfirm from './popups/PopupConfirm.js';
import Card from './Card.js';
import Api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {
  // show only header and spinner until data is fetched
  const [allDataIsLoaded, setAllDataIsLoaded] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cardsList, setCardsList] = useState([]);

  const [isAddPopupOpen, setIsAddPopoupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isImageViewPopupOpen, setIsImageViewPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  // pass to ImagePopup
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  });

  const api = new Api(consts.apiConfig);

  function getAllData() {
    Promise.all([api.getUserInfo(), api.getCardsList()])
      .then(([remoteUserData, remoteCardsData]) => {
        setCurrentUser(remoteUserData);
        setCardsList(remoteCardsData);
      })
      .then(() => {
        setAllDataIsLoaded(true);
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleAvatarSubmit(inputValue) {
    api
      .setAvatar(inputValue)
      .then((remoteUserData) => {
        setCurrentUser(remoteUserData);
      })
      .then(() => {
        setAllDataIsLoaded(true);
        closeAllPopups();
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleUserInfoSubmit(inputValues) {
    api
      .setUserInfo(inputValues)
      .then((remoteUserData) => {
        setCurrentUser(remoteUserData);
      })
      .then(() => {
        setAllDataIsLoaded(true);
        closeAllPopups();
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleNewPlaceSubmit(inputValues) {
    api
      .addCard(inputValues)
      .then((remoteCardsData) => {
        setCardsList([remoteCardsData, ...cardsList]);
      })
      .then(() => {
        setAllDataIsLoaded(true);
        closeAllPopups();
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((liker) => liker._id === currentUser._id);

    api
      .toggleCardLike(card._id, isLiked)
      .then((newCard) => {
        setCardsList((state) =>
          state.map((item) => (item._id === card._id ? newCard : item)),
        );
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCardsList((newCardsList) =>
          newCardsList.filter((item) => item._id !== card._id),
        );
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function closeAllPopups() {
    setIsUpdatePopupOpen(false);
    setIsEditPopupOpen(false);
    setIsAddPopoupOpen(false);
    setIsImageViewPopupOpen(false);
    setIsConfirmPopupOpen(false);

    setSelectedCard({ name: '', link: '', _id: '' });
  }

  function openUpdateAvatarPopup() {
    setIsUpdatePopupOpen(true);
  }

  function openEditProfilePopup() {
    setIsEditPopupOpen(true);
  }

  function openNewCardPopup() {
    setIsAddPopoupOpen(true);
  }

  function openConfirmDeletePopup(cardData) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(cardData);
  }

  function openImageViewPopup(cardData) {
    setIsImageViewPopupOpen(true);
    setSelectedCard(cardData);
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          allDataIsLoaded={allDataIsLoaded}
          preloaderComponent={<Preloader />}
          // page buttons
          onUpdateAvatar={openUpdateAvatarPopup}
          onEditProfile={openEditProfilePopup}
          onAddCard={openNewCardPopup}
          // cards
          cardComponent={<Card />}
          cardsList={cardsList}
          onCardLike={handleCardLike}
          onCardThumbClick={openImageViewPopup}
          onDeleteButtonClick={openConfirmDeletePopup}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isUpdatePopupOpen}
          onClose={closeAllPopups}
          onSubmitAvatar={handleAvatarSubmit}
        />
        <EditProfilePopup
          isOpen={isEditPopupOpen}
          onClose={closeAllPopups}
          onSubmitUser={handleUserInfoSubmit}
        />
        <AddPlacePopup
          isOpen={isAddPopupOpen}
          onClose={closeAllPopups}
          onNewPlaceSubmit={handleNewPlaceSubmit}
        />
        <PopupConfirm
          selectedCard={selectedCard}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />
        <ImagePopup
          selectedCard={selectedCard}
          isOpen={isImageViewPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
