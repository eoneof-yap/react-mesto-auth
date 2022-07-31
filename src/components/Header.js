function Header() {
  return (
    <>
      <header className='header'>
        <div className='header__logo'></div>
        <div className='header__menu'>
          <div className='header__burger-icon'></div>
          <div className='header__email'>
            <span>email@mail.com</span>
          </div>
          <a className='link header__link'>
            <span>Выйти</span>
          </a>
        </div>
      </header>

      <div className='divider'></div>
    </>
  );
}

export default Header;
