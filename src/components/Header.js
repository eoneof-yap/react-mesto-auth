import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import closeButtonIcon from '../images/closeButton.svg';
import menuButtonIcon from '../images/burger-menu-icon.svg';

function Header({ authData, paths }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleMenuClass = isMenuOpen ? `${'header__menu_mobile'}` : '';
  const menuButtonBgImage = isMenuOpen
    ? `url(${closeButtonIcon})`
    : `url(${menuButtonIcon})`;

  function handleMenuButtonClick() {
    // TODO: delete token from localstoraage
    setIsMenuOpen(!isMenuOpen);
  }

  function signOut() {
    navigate(paths.SIGN_IN);
  }

  return (
    <header className='header'>
      <div className='header__actions'>
        <Link to='/' className='header__logo' />
        <button
          className='button header__menu-button'
          type='button'
          name='menu-button'
          title='Меню'
          onClick={handleMenuButtonClick}
          style={{
            backgroundImage: `${menuButtonBgImage}`,
          }}
        />
      </div>
      <div className={`header__menu ${visibleMenuClass}`}>
        <div className='divider divider_top'></div>
        {authData.token ? (
          <>
            <div className='header__email'>
              <span>{authData.email}</span>
            </div>
            <button className='link header__link' onClick={signOut}>
              Выйти
            </button>
          </>
        ) : (
          <>
            {/* TODO: rename to `button` */}
            <Link
              to={pathname === '/sign-up' ? '/sign-in' : '/sign-up'}
              className='link header__link'>
              {pathname === '/sign-up' ? 'Войти' : 'Регистрация'}
            </Link>
          </>
        )}
      </div>
      <div className='divider'></div>
    </header>
  );
}

export default Header;
