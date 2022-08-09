import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Api from '../utils/Api.js';
import * as auth from '../utils/auth.js';
import * as utils from '../utils/utils.js';
import * as consts from '../utils/constants.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Preloader from './Preloader.js';
import Popups from './Popups.js';
import Card from './Card.js';
import Login from './Login.js';
import Register from './Register.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { ProtectedRoutes } from '../utils/ProtectedRoutes.js';

const popupsStates = {
  editAvatar: false,
  editProfile: false,
  addCard: false,
  viewImage: false,
  confirmDelete: false,
  tooltip: false,
};

export default function App() {
  const [isOpen, setIsOpen] = useState(popupsStates);

  const [tooltipType, setTooltipType] = useState('');
  const [allDataIsLoaded, setAllDataIsLoaded] = useState(false); // show only header and spinner until data is fetched
  const [cardsList, setCardsList] = useState([]); // pass to ImagePopup
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({}); // TODO remove - replace with userInfo
  const [userInfo, setuserInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const api = new Api(consts.apiConfig);

  function getAllData() {
    Promise.all([api.getUserInfo(), api.getCardsList()])
      .then(([remoteUserData, remoteCardsData]) => {
        setCurrentUser(remoteUserData);
        setCardsList(remoteCardsData);
      })
      .then(() => {
        // TODO show preloader on root when logged in
        // FIXME Login screen is shown for a bit
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

  function handleRegister(credentials) {
    return auth
      .register(credentials)
      .then((res) => {
        toggleTooltip('success', true);
      })
      .catch((err) => {
        toggleTooltip('error', true);
        utils.requestErrorHandler(err);
      });
  }

  function handleLogin(credentials) {
    return auth
      .authorize(credentials)
      .then((res) => {
        return res.json();
      })
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token);
          setLoggedIn(true); // triggers redirect in useEffect
        }
      })
      .catch((err) => {
        toggleTooltip('error', true);
        utils.requestErrorHandler(err);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    } else {
      auth
        .getUserInfo(jwt)
        .then((res) => {
          return res.json();
        })
        .then(({ data }) => {
          setuserInfo(data);
          console.log('userInfo:', userInfo);
          setLoggedIn(true); // triggers redirect in useEffect
        })
        .catch((err) => {
          utils.requestErrorHandler(err);
        });
    }
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    navigate(consts.paths.login);
  }

  function updateOpenedState(key, value) {
    for (const item in popupsStates) {
      if (item === key) {
        popupsStates[item] = value;
      }
    }
    setIsOpen(popupsStates);
  }

  function toggleTooltip(type, state) {
    setTooltipType(type);
    updateOpenedState('tooltip', state);
  }

  function handleTooltipClose(type) {
    closeAllPopups();
    if (type === 'success') {
      navigate(consts.paths.login);
    } else if (type === 'error') {
      // fixme close tooltip
      toggleTooltip('error', false);
    }
  }

  function closeAllPopups() {
    // FIXME remove tooltip from object ?? it has it's own toggle
    for (const item in popupsStates) {
      popupsStates[item] = false;
    }
    setIsOpen(popupsStates);
  }

  function openEditAvatarPopup() {
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

  function clearSelectedCard() {
    setSelectedCard({});
  }

  useEffect(() => {
    loggedIn && navigate(consts.paths.root);
    getAllData();
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={userInfo.email} onLogout={handleLogout} />
        <Routes>
          <Route
            element={
              <ProtectedRoutes
                loggedIn={loggedIn}
                redirectTo={consts.paths.login}
              />
            }>
            <Route path={consts.paths.any} />

            <Route
              exact
              path={consts.paths.root}
              element={
                <Main
                  allDataIsLoaded={allDataIsLoaded}
                  preloaderComponent={<Preloader />}
                  // page buttons
                  oneditAvatar={openEditAvatarPopup}
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
          </Route>

          {/* PUBLIC ROUTES */}
          <Route
            path={consts.paths.register}
            element={<Register onSubmit={handleRegister} />}
          />
          <Route
            path={consts.paths.login}
            element={<Login onSubmit={handleLogin} />}
          />
        </Routes>
        <Footer />
        <Popups
          isOpen={isOpen}
          selectedCard={selectedCard}
          tooltipType={tooltipType}
          // handlers
          onTooltipClose={handleTooltipClose}
          clearSelectedCard={clearSelectedCard}
          onSubmitAvatar={handleAvatarSubmit}
          onSubmitUser={handleUserInfoSubmit}
          onSubmitNewPlace={handleNewPlaceSubmit}
          onSubmitCardDelete={handleCardDelete}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
