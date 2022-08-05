import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Api from '../utils/Api.js';
import * as utils from '../utils/utils.js';
import * as consts from '../utils/constants.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Preloader from './Preloader.js';
import Popups from './Popups.js';
import Card from './Card.js';
import Login from './Login.js';
import Register from './Register.js';

export default function App() {
  const popupsStates = {
    editAvatar: false,
    editProfile: false,
    addCard: false,
    viewImage: false,
    confirmDelete: false,
    tooltip: false,
  };

  const [isOpen, setIsOpen] = useState(popupsStates);
  const [allDataIsLoaded, setAllDataIsLoaded] = useState(false); // show only header and spinner until data is fetched
  const [currentUser, setCurrentUser] = useState({});
  const [cardsList, setCardsList] = useState([]); // pass to ImagePopup
  const [selectedCard, setSelectedCard] = useState({});

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

  function clearSelectedCard() {
    setSelectedCard({});
  }

  function openInfoToolTip() {
    updateOpenedState('toolTip', true);
  }

  function updateOpenedState(key, value) {
    for (const item in popupsStates) {
      if (item === key) {
        popupsStates[item] = value;
      }
    }
    setIsOpen(popupsStates);
  }

  function closeAllPopups() {
    for (const item in popupsStates) {
      popupsStates[item] = false;
    }
    setIsOpen(popupsStates);
  }

  function openeditAvatarPopup() {
    updateOpenedState('editAvatar', true);
  }

  function openEditProfilePopup() {
    updateOpenedState('editProfile', true);
  }

  function openNewCardPopup() {
    updateOpenedState('addCard', true);
  }

  function openConfirmDeletePopup(cardData) {
    updateOpenedState('confirmDelete', true);
    setSelectedCard(cardData);
  }

  function openImageViewPopup(cardData) {
    updateOpenedState('viewImage', true);
    setSelectedCard(cardData);
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Main
                allDataIsLoaded={allDataIsLoaded}
                preloaderComponent={<Preloader />}
                // page buttons
                oneditAvatar={openeditAvatarPopup}
                onEditProfile={openEditProfilePopup}
                onAddCard={openNewCardPopup}
                // cards
                cardComponent={<Card />}
                cardsList={cardsList}
                onCardLike={handleCardLike}
                onCardThumbClick={openImageViewPopup}
                onDeleteButtonClick={openConfirmDeletePopup}
              />
            }
          />
          <Route
            path='/sign-up'
            element={<Register /* onSubmitError={openInfoToolTip} */ />}
          />
          <Route
            path='/sign-in'
            element={<Login /* onSubmitError={openInfoToolTip} */ />}
          />
        </Routes>
        <Footer />
        <Popups
          isOpen={isOpen}
          selectedCard={selectedCard}
          // handlers
          clearSelectedCard={clearSelectedCard}
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
