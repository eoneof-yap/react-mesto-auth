import closeButtonIcon from '../images/closeButton.svg';
import menuButtonIcon from '../images/burger-menu-icon.svg';

function Header() {
  const isOpen = true; // TODO get from props
  return (
    <>
      <header className='header'>
        <div className='header__left'>
          <div className='header__logo'></div>
          <button
            className='button header__menu-button'
            type='button'
            name='menu-button'
            title='Меню'
            // onClick={}>
            style={{
              backgroundImage: isOpen
                ? `url(${closeButtonIcon})`
                : `url(${menuButtonIcon})`,
            }}
          />
        </div>
        <div className='header__right'>
          <div className='header__menu'>
            <div className='divider divider_top'></div>
            <div className='header__email'>
              <span>email@mail.com</span>
            </div>
            <a className='link header__link'>
              <span>Выйти</span>
            </a>
          </div>
        </div>
        <div className='divider'></div>
      </header>
    </>
  );
}

export default Header;
