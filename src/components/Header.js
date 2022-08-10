import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import closeButtonIcon from '../images/closeButton.svg';
import menuButtonIcon from '../images/burger-menu-icon.svg';
import { paths } from '../utils/constants.js';

export default function Header({ email, onLogout, preloaderIsVisible }) {
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
        <Link to={paths.root} className='header__logo' />
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
                  <span>{email}</span>
                </div>
                <button className='link header__link' onClick={handleSignOut}>
                  Выйти
                </button>
              </>
            }
          />
          <Route
            exact
            path={paths.register}
            element={
              <Link
                to={paths.login}
                className='link header__link'
                onClick={toggleMenu}>
                Войти
              </Link>
            }
          />
          <Route
            exact
            path={paths.login}
            element={
              <Link
                to={paths.register}
                className='link header__link'
                onClick={toggleMenu}>
                Регистрация
              </Link>
            }
          />
        </Routes>
      </div>
      <div className='divider'></div>
    </header>
  );
}
