import logger from '@/utils/logger';
import { getCookie } from '../useHooks/useCookies';
import { removeItemFromLocal, setItemInSession } from '../useHooks/useStorage';
import { NEXT_PUBLIC_API_BASEURL } from '../constants';
import nookies, { parseCookies, setCookie } from 'nookies';
import axios from 'axios';

export const restBaseUrl = `${NEXT_PUBLIC_API_BASEURL}/api`;

export const restBcHeaders = {
  'content-type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${getCookie('olysimhelpsupporttoken')}`,
  currency: 'USD',
  language: 'en',
};

const handleOnLogout = async () => {
  setItemInSession('lastroute', window.location.pathname);
  nookies.destroy(null, 'userDetails', { path: '/' });
  localStorage.setItem('logout', Date.now().toString());
  setTimeout(() => {
    localStorage.removeItem('logout');
    // window.location.href = "/";
  }, 1000);
  nookies.destroy(null, 'olysimhelpsupporttoken', { path: '/' });

  // const fcmToken = await requestForToken();

  // const handleOnLogOutWithFcmRes = await handleOnLogOutWithFcm({
  //   method: 'POST',
  //   body: {
  //     fcm_token: fcmToken,
  //   },
  // });

  // if (handleOnLogOutWithFcmRes) {
  //   nookies.destroy(null, 'olysimhelpsupporttoken', { path: '/' });
  // }
};

export async function getRouteApi({
  method,
  body,
  endPoint,
}: {
  method: string;
  body?: any;
  endPoint?: any;
}) {
  try {
    const json = {
      url: endPoint,
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await routeApi(queryString, config);
    // if (res?.isError) {
    //   handleOnLogout();
    //   return;
    // }
    return res?.response;
  } catch (err) {
    logger.error('API threw Error', err);
    throw err;
  }
}

export async function getApiServerside({
  context,
  endPoint,
  body,
}: {
  context?: any;
  endPoint?: string;
  body?: any;
}) {
  const url = `${restBaseUrl}/${endPoint}`;
  const { req, res } = context;
  const cookies = parseCookies({ req });

  const dynamicHeader = {
    // Authorization: `Bearer 5852|voFl9blqmoYFLgCTW3f2TLdPYYKIn3Ln3IUd0r1Tf3253460`,
    Authorization: `Bearer ${cookies?.olysimhelpsupporttoken}`,
    language: cookies?.language,
    currency: cookies?.currency,
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        ...restBcHeaders,
        ...dynamicHeader,
      },
    });

    return {
      isError: false,
      response: response.data,
    };
  } catch (error: any) {
    if (error?.response?.status === 401) {
      // setCookie({ res }, 'olysimhelpsupporttoken', '', {
      //   maxAge: -1,
      //   path: '/',
      // });

      return {
        isError: true,
        response: null,
        message: 'Request failed with status code 401',
      };
    }

    return {
      isError: true,
      response: null,
      message: error?.message || 'An error occurred while making the request',
    };
  }
}

export async function handleOnRouteApiCallPost({
  body,
  dynamicHeader,
  endPoint,
}: {
  body: any;
  dynamicHeader?: any;
  endPoint?: any;
}) {
  const url = `${restBaseUrl}/${endPoint}`;

  try {
    const response = await axios.post(url, JSON.stringify(body), {
      headers: {
        ...restBcHeaders,
        ...dynamicHeader,
      },
    });

    return {
      isError: false,
      response: response.data,
    };
  } catch (error: any) {
    if (error?.response?.status === 401) {
      return {
        isError: true,
        response: null,
        message: 'Request failed with status code 401',
      };
    }

    if (error?.response?.status === 413) {
      return {
        isError: true,
        response: null,
        message: error?.message,
      };
    }


    return {
      isError: true,
      response: null,
      message: error?.message || 'An error occurred while making the request',
    };
  }
}

const routeApi = async (query: string, config: any) =>
  await (await fetch(`/api/api?${query}`, config)).json();
