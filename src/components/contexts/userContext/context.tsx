import { requestForToken } from '@/utils';
import nookies from 'nookies';
import { removeItemFromSession } from '@/utils/useHooks/useStorage';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DEFAULT_CURRENCY, FIREBASE_FOLDER_NAME } from '@/utils/constants';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/socialLogin/Firebase';

type UserContextType = {
  userDetails: any;
  handleOnLogOut: any;
  userLocationData: any;
  setUserLocationData: any;
  handleOnLogOutWithError: any;
  setUserDetails: any;
  currency: any;
  setCurrency: any;
  fireBaseCredential: any;
  setFireBaseCredential: any;
  handleOnRemoveUserData: any;
};

export const UserContext = createContext<UserContextType>({
  userDetails: undefined,
  handleOnLogOut: () => {},
  userLocationData: undefined,
  setUserLocationData: () => {},
  handleOnLogOutWithError: () => {},
  setUserDetails: () => {},
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
  fireBaseCredential: '',
  setFireBaseCredential: () => {},
  handleOnRemoveUserData: () => {},
});

const UserProvider: FC<{ children: ReactNode; userDataProps?: any }> = ({
  children,
  userDataProps,
}) => {
  const [userDetails, setUserDetails] = useState(userDataProps);
  const [fireBaseCredential, setFireBaseCredential] = useState<any>({
    stripePublishableKey: '',
    isRecapcha: null,
    isFirebase: null,
    isContactUsRecapcha: null,
  });
  const [userLocationData, setUserLocationData] = useState<any>(null);
  const route = useRouter();
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  const fetchUserLocationData = () => {
    axios
      .get('https://ipapi.co/json/')
      .then((res) => {
        setUserLocationData({
          country_code: res?.data?.country_code || 'IN',
          country_calling_code: res?.data?.country_calling_code || '+91',
        });
      })
      .catch((error) => {
        console.log('Error fetching location data:', error);
      });
  };

  const handleOnRemoveUserData = async () => {
    nookies.destroy(null, 'olysimhelpsupporttoken', { path: '/' });
    localStorage.setItem('logout', Date.now().toString());
    nookies.destroy(null, 'user_data', { path: '/' });
    // setUserDetails(null);
    setTimeout(() => {
      localStorage.removeItem('logout');
    }, 1000);
  };

  const handleOnfcmLogout = async () => {
    const fcmToken = await requestForToken();

    // const handleOnLogOutWithFcmRes = await handleOnLogOutWithFcm({
    //   method: "POST",
    //   body: {
    //     fcm_token: fcmToken,
    //   },
    // });

    // if (handleOnLogOutWithFcmRes) {
    handleOnRemoveUserData();
    // }
  };

  const handleOnLogOut = async () => {
    await signOut(auth)
      .then(() => {})
      .catch((error: any) => {});

    handleOnfcmLogout();
    route.push('/');
  };

  const handleOnLogOutWithError = async () => {
    // await signOut(auth)
    //   .then(() => {})
    //   .catch((error: any) => {});
    // handleOnfcmLogout();
  };

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') || DEFAULT_CURRENCY;
    removeItemFromSession('reviewOrder');
    setCurrency(savedCurrency);
  }, []);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  // useEffect(() => {
  //   const str_publishable_keyRef = ref(
  //     database,
  //     `${FIREBASE_FOLDER_NAME}/str_publishable_key`
  //   );
  //   const reCAPTCHARef = ref(
  //     database,
  //     `${FIREBASE_FOLDER_NAME}/payment_intent_reCAPTCHA`
  //   );
  //   const isContactUsRecapchaRef = ref(
  //     database,
  //     `${FIREBASE_FOLDER_NAME}/contactus_reCAPTCHA`
  //   );

  //   const handleOnPublishableKey = async (snapshot: any) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const decrypted = decryptText(data?.trim());

  //       setFireBaseCredential((prev: any) => ({
  //         ...prev,
  //         stripePublishableKey: decrypted?.toString(),
  //       }));
  //     }
  //   };

  //   const handleOnRecaptchaKeyChange = (snapshot: any) => {
  //     const data = snapshot.val();

  //     setFireBaseCredential((prev: any) => ({
  //       ...prev,
  //       isRecapcha: data,
  //     }));
  //   };

  //   const handleOnContactRecaptchaKeyChange = (snapshot: any) => {
  //     const data = snapshot.val();

  //     setFireBaseCredential((prev: any) => ({
  //       ...prev,
  //       isContactUsRecapcha: data,
  //     }));
  //   };

  //   onValue(str_publishable_keyRef, handleOnPublishableKey);
  //   onValue(reCAPTCHARef, handleOnRecaptchaKeyChange);
  //   onValue(isContactUsRecapchaRef, handleOnContactRecaptchaKeyChange);

  //   return () => {
  //     off(str_publishable_keyRef, "value", handleOnPublishableKey);
  //     off(reCAPTCHARef, "value", handleOnRecaptchaKeyChange);
  //     off(isContactUsRecapchaRef, "value", handleOnContactRecaptchaKeyChange);
  //   };
  // }, []);

  useEffect(() => {
    setUserDetails(userDataProps);
  }, [userDataProps]);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        handleOnLogOut,
        userLocationData,
        setUserLocationData,
        handleOnLogOutWithError,
        setUserDetails,
        currency,
        setCurrency,
        fireBaseCredential,
        setFireBaseCredential,
        handleOnRemoveUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);

export default UserProvider;
