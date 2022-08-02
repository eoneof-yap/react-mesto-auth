import { useState, useEffect } from 'react';

import * as utils from '../utils/utils.js';
import * as consts from '../utils/constants.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Preloader from './Preloader.js';
import Popups from './Popups.js';
import Card from './Card.js';
// import Login from './Login.js';
// import Register from './Register.js';
import Api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {
  // show only header and spinner until data is fetched
  const [allDataIsLoaded, setAllDataIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cardsList, setCardsList] = useState([]); // pass to ImagePopup
  const [selectedCard, setSelectedCard] = useState({});
  const [isOpen, setIsOpen] = useState({
    updateAvatar: false,
    editProfile: false,
    addCard: false,
    viewImage: false,
    confirmDelete: false,
    tooltip: false,
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
    Object.keys(isOpen).forEach((key) => {
      isOpen[key] = false;
    });
    setIsOpen(isOpen);
    setSelectedCard({});
  }

  // function openInfoToolTip() {
  //   setIsInfoToolTipOpen(true);
  // }

  function openUpdateAvatarPopup() {
    setIsOpen({ updateAvatar: true });
  }

  function openEditProfilePopup() {
    setIsOpen({ editProfile: true });
  }

  function openNewCardPopup() {
    setIsOpen({ addCard: true });
  }

  function openConfirmDeletePopup(cardData) {
    setIsOpen({ confirmDelete: true });
    setSelectedCard(cardData);
  }

  function openImageViewPopup(cardData) {
    setIsOpen({ viewImage: true });
    setSelectedCard(cardData);
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        {/* <Login onSubmitError={openInfoToolTip} /> */}
        {/* <Register onSubmitError={openInfoToolTip} /> */}
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
        <Popups
          isOpen={isOpen}
          selectedCard={selectedCard}
          // handlers
          onSubmitCardDelete={handleCardDelete}
          onSubmitAvatar={handleAvatarSubmit}
          onSubmitUser={handleUserInfoSubmit}
          onSubmitNewPlace={handleNewPlaceSubmit}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
