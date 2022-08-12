import { useState, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import closeButtonIcon from '../images/closeButton.svg';
import menuButtonIcon from '../images/burger-menu-icon.svg';
import { paths } from '../utils/constants.js';

export default function Header({ onLogout }) {
  const navigate = useNavigate();

  const { userData } = useContext(CurrentUserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleMenuClass = isMenuOpen ? `${'header__menu_mobile'}` : '';
  const menuButtonBgImage = isMenuOpen
    ? `url(${closeButtonIcon})`
    : `url(${menuButtonIcon})`;

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSignOut() {
    toggleMenu();
    onLogout();
  }

  return (
    <header className='header'>
      <div className='header__actions'>
        <button
          onClick={() => {
            navigate(paths.root);
          }}
          className='link header__logo'
        />
        <button
          className='button header__menu-button'
          type='button'
          name='menu-button'
          title='Меню'
          onClick={toggleMenu}
          style={{
            backgroundImage: `${menuButtonBgImage}`,
          }}
        />
      </div>

      <div className={`header__menu ${visibleMenuClass}`}>
        <div className='divider divider_top'></div>
        <Routes>
          <Route
            exact
            path={paths.root}
            element={
              <>
                <div className='header__email'>
                  <span>{userData.email}</span>
                </div>
                <button
                  className='link header__link'
                  onClick={() => {
                    toggleMenu();
                    handleSignOut();
                  }}>
                  Выйти
                </button>
              </>
            }
          />
          <Route
            exact
            path={paths.register}
            element={
              <button
                onClick={() => {
                  toggleMenu();
                  navigate(paths.login);
                }}
                className='link header__link'>
                Войти
              </button>
            }
          />
          <Route
            exact
            path={paths.login}
            element={
              <button
                className='link header__link'
                onClick={() => {
                  toggleMenu();
                  navigate(paths.register);
                }}>
                Регистрация
              </button>
            }
          />
        </Routes>
      </div>
      <div className='divider'></div>
    </header>
  );
}
