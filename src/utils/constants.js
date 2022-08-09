﻿export const apiConfig = {
  serverURL: 'https://mesto.nomoreparties.co/v1/cohort-43',
  cardsURL: 'cards',
  likesURL: 'likes',
  userURL: 'users/me',
  avatarURL: 'avatar',
  headers: {
    authorization: 'c9da976c-ad10-4165-97ed-736e051c4019',
    'content-type': 'application/json',
  },
};

export const paths = {
  any: '*',
  root: '/',
  login: '/sign-up',
  register: '/sign-in',
};

export const authConfig = {
  BASE_URL: 'https://auth.nomoreparties.co',
  SIGN_IN: '/signin',
  SIGN_UP: '/sign-up',
};
