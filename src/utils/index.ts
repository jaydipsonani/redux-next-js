import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import { getToken, onMessage } from 'firebase/messaging';
// import { messaging } from "./socialLogin/Firebase";
import { VAPID_KEY } from './constants';

export const slugify = (str: string) =>
  str
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[^\w\s-]/g, '')
    ?.replace(/[\s_-]+/g, '-')
    ?.replace(/^-+|-+$/g, '');

export const formatTextWithLineBreaks = (text: string) => {
  return text?.replace(/\r\n/g, '<br>');
};

export const scrollToTop = () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('beforeunload', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

export const addClassToDocumentElement = (className: string) => {
  document.documentElement.classList.add(className);
};

export const removeClassToDocumentElement = (className: string) => {
  document.documentElement.classList.remove(className);
};

export const toastError = (message: any) => {
  toast.error(message, {
    style: {
      borderRadius: '10px',
      color: '#000000',
      marginTop: '50px',
      border: '1px solid #DB4446',
      boxShadow: '0px 0px 4px 0px #DB444640',
    },
    position: 'top-right',
  });
};

export const toastSuccess = (message: any) => {
  toast.success(message, {
    style: {
      borderRadius: '10px',
      color: '#000000',
      marginTop: '50px',
      border: '1px solid #40CD8A',
      boxShadow: '0px 0px 4px 0px #40CD8A40',
    },
    position: 'top-right',
    // duration: 100000,
  });
};

export const handleOnCopy = (textToCopy: any) => {
  if (textToCopy) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toastSuccess('copied successfully!');
      })
      .catch((err) => {
        toastError('Failed to copy!');
      });
  }
};

export const decryptText = (encryptedText: string): string => {
  const secretKey = CryptoJS.enc.Utf8.parse('veHDKfJPRVWEPUH2EflEbt8Q4jZl49t8');

  try {
    if (!encryptedText) {
      throw new Error('No ciphertext provided');
    }

    const ciphertext = CryptoJS.enc.Base64.parse(encryptedText);
    const key = secretKey;
    const iv = CryptoJS.lib.WordArray.create(16 as any);

    const decryptedBytes = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext } as any,
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
      throw new Error(
        'Decryption failed, possibly due to incorrect key or corrupted data.'
      );
    }

    return decryptedText;
  } catch (error: any) {
    return `Error decrypting: ${error?.message}`;
  }
};

// Exporting functions to be used in other components
export const requestForToken = async () => {
  // if (messaging) {
  //   try {
  //     const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
  //     if (currentToken) {
  //       return currentToken;
  //     } else {
  //       console.log(
  //         'No registration token available. Request permission to generate one.'
  //       );
  //     }
  //   } catch (err) {
  //     console.log('An error occurred while retrieving token. ', err);
  //     return null;
  //   }
  // } else {
    return null;
  // }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    // if (messaging) {
    //   onMessage(messaging, (payload: any) => {
    //     resolve(payload);
    //   });
    // }
  });

// Detect user's timezone, defaulting to null if not available
export const detectedTimeZone = (() => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch (error) {
    console.error('Error detecting timezone:', error);
    return null;
  }
})();
