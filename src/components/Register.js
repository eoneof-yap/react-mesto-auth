import React from 'react';

export default function Login() {
  return (
    <section className='auth'>
      <form
        className='form form_place_auth'
        id='register'
        name='login'
        action='login'>
        <h2 className='form__header form__header_on-dark'>Регистрация</h2>
        <fieldset className='form__fieldset form__fieldset_on-dark'>
          <div className='form__input-container'>
            <input
              className='form__input form__input_on-dark'
              placeholder='Email'
              name='email'
              type='email'
              required
            />
          </div>
          <div className='form__input-container'>
            <input
              className='form__input form__input_on-dark'
              placeholder='Пароль'
              name='password'
              type='password'
              required
            />
          </div>
        </fieldset>
        <button
          className='button form__submit-button form__submit-button_white'
          type='submit'
          form='login' /* onSubmit={} */
        >
          <span>Зарегистрироваться</span>
        </button>
        <div className='form__link'>
          Уже зарегистрированы?
          <a className='link form__link_link'>Войти</a>
        </div>
      </form>
    </section>
  );
}
