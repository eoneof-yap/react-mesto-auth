import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from '../utils/constants.js';

export default function AuthForm({ onSubmit, formType }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const sectionClassName = `auth formType === 'register' && auth_place_${formType}`;
  const formTitleText = formType === 'login' ? 'Вход' : 'Регистрация';
  const formButtonText = formType === 'login' ? 'Войти' : 'Зарегистрироваться';

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
    <section className={sectionClassName}>
      <form
        className='form form_place_auth'
        id={formType}
        name={formType}
        action={formType}
        onSubmit={handleSubmit}>
        <h2 className='form__header form__header_on-dark'>{formTitleText}</h2>
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
          <span>{formButtonText}</span>
        </button>
        {formType === 'register' && (
          <div className='form__link'>
            Уже зарегистрированы?
            <button
              className='link form__link_link'
              onClick={navigate(paths.login, { replace: true })}>
              Войти
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
