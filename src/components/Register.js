import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(credentials);
  }

  function handleChanges(evt) {
    // extract target input's attributes
    const { name, value } = evt.target;

    // set it's name as key and it's value as value
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  return (
    <section className='auth auth_place_register'>
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
              onChange={handleChanges}
              value={credentials.email}
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
              onChange={handleChanges}
              value={credentials.password}
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
