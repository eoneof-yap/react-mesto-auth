import { useState } from 'react';

import closeButtonIcon from '../images/closeButton.svg';
import menuButtonIcon from '../images/burger-menu-icon.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const visibleMenuClass = isMenuOpen ? `${'header__menu_mobile'}` : '';
  const menuButtonBgImage = isMenuOpen
    ? `url(${closeButtonIcon})`
    : `url(${menuButtonIcon})`;

  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className='header'>
      <div className='header__actions'>
        <div className='header__logo'></div>
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
        <div className='header__email'>
          <span>email@mail.com</span>
        </div>
        <a className='link header__link'>Выйти</a>
      </div>
      <div className='divider'></div>
    </header>
  );
}

export default Header;
