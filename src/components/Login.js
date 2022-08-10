import React, { useState } from 'react';

export default function Login(props) {
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

  // const hiddenClassName = `${props.isLoggedIn ? 'hidden' : ''}`; // TODO (1) remove or not

  return (
    <section className='auth'>
      {/* <section className={`auth ${hiddenClassName}`}> */}{' '}
      {/* // TODO (2)  */}
      <form
        className='form form_place_auth'
        id='login'
        name='login'
        action='login'
        onSubmit={handleSubmit}>
        <h2 className='form__header form__header_on-dark'>Вход</h2>
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
            />
          </div>
          <div className='form__input-container'>
            <input
              className='form__input form__input_on-dark'
              placeholder='Пароль'
              name='password'
              type='password'
              minLength='8'
              required
              autoComplete='current-password'
              onChange={handleChanges}
            />
          </div>
        </fieldset>
        <button
          className='button form__submit-button form__submit-button_white'
          type='submit'
          form='login'>
          <span>Войти</span>
        </button>
      </form>
    </section>
  );
}
