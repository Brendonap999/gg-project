import { router } from '@/routes';

// TODO: add to .env
const host = 'http://localhost:8080';

const removeToken = () => sessionStorage.removeItem('token');
const getToken = () => sessionStorage.getItem('token');

export const apiUrls = {
  login: `${host}/api/auth/login`,
  register: `${host}/api/auth/register`,
  studios: `${host}/api/games/studios`,
  games: (studio: string | null) => `${host}/api/games/${studio ?? ''}`,
};

export const postLogin = (email: string, password: string) => {
  return fetch(apiUrls.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
};

export const postRegister = (email: string, password: string) => {
  return fetch(apiUrls.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
};

export const getStudios = async () => {
  return fetch(apiUrls.studios, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      removeToken();
      router.navigate('/auth/sign-in');
    });
};

export const getGames = async (studio: string | null) => {
  return fetch(apiUrls.games(studio), {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      removeToken();
      router.navigate('/auth/sign-in');
    });
};
