import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import { paths } from '../utils/constants.js';

export default function AuthForm({ onSubmit, formType }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(credentials);
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
        id={formType}
        name={formType}
        action={formType}
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
          form={formType}>
          <span>Зарегистрироваться</span>
        </button>
        <Routes>
          {/* FIXME: does not render */}
          <Route
            exact
            path={paths.register}
            element={
              <div className='form__link'>
                Уже зарегистрированы?
                <Link className='link form__link_link' to={paths.login}>
                  Войти
                </Link>
              </div>
            }
          />
          <Route
            exact
            path={paths.register}
            element={
              <div className='form__link'>
                Уже зарегистрированы?
                <Link className='link form__link_link' to={paths.login}>
                  Войти
                </Link>
              </div>
            }
          />
        </Routes>
      </form>
    </section>
  );
}
