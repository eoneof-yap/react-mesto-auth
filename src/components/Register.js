import React from 'react';
import { Link } from 'react-router-dom';

export default function Login(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit();
  }

  return (
    <section className='auth'>
      <form
        className='form form_place_auth'
        id='register'
        name='register'
        action='register'
        onSubmit={handleSubmit}>
        <h2 className='form__header form__header_on-dark'>Регистрация</h2>
        <fieldset className='form__fieldset form__fieldset_on-dark'>
          <div className='form__input-container'>
            <input
              className='form__input form__input_on-dark'
              placeholder='Email'
              name='email'
              type='email'
              required
              autoComplete='email'
            />
          </div>
          <div className='form__input-container'>
            <input
              className='form__input form__input_on-dark'
              placeholder='Пароль'
              name='password'
              type='password'
              required
              autoComplete='new-password'
            />
          </div>
        </fieldset>
        <button
          className='button form__submit-button form__submit-button_white'
          type='submit'
          form='register'>
          <span>Зарегистрироваться</span>
        </button>
        <div className='form__link'>
          Уже зарегистрированы?
          <Link className='link form__link_link' to='/sign-in'>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}
