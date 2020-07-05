import jwtDecode from 'jwt-decode';
import * as Cookies from 'js-cookie';

const RENEW_ACCESS_TOKEN_API = 'http://localhost:3000/refreshToken';

let accessToken = '';

export const setAccessToken = (s: string): void => {
  accessToken = s;
};

export const getAccessToken = (): string => (accessToken);

export const accessTokenIsValid = () => {
  try {
    const token = getAccessToken();
    const { exp } = jwtDecode(token);
    if (Date.now() > exp * 1000) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const renewAccessToken = async (): Promise<void> => {
  if (Cookies.get('lau')) {
    const response = await fetch(RENEW_ACCESS_TOKEN_API, {
      method: 'POST',
      credentials: 'include',
    });
    const body = await response.json();
    if (body.ok) {
      setAccessToken(body.accessToken);
    }
  }
};

export const handleAccessTokenExpiration = async (): Promise<void> => {
  if (getAccessToken() && !accessTokenIsValid()) {
    await renewAccessToken();
  }
};
