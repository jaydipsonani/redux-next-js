// export const NEXT_PUBLIC_API_BASEURL = 'https://stagingapi.waosim.com';
export const NEXT_PUBLIC_API_BASEURL = 'https://api.olysim.com';
// export const NEXT_PUBLIC_API_BASEURL = 'https://stagingapi.olysim.com';
// export const NEXT_PUBLIC_API_BASEURL = 'http://192.168.1.14:8087';

export const FIREBASE_API_KEY =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
  'AIzaSyCcAd3ow-g-JEivfC8JydYBGNkeJwy2FvA';
export const FIREBASE_AUTH_DOMAIN =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
  'waosim-zaina.firebaseapp.com';
export const FIREBASE_PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'waosim-zaina';
export const FIREBASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'waosim-zaina.appspot.com';
export const FIREBASE_MESSAGING_SENDER_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '178952806991';
export const FIREBASE_APP_ID =
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
  '1:178952806991:web:ad2c75a0822e594fb5803a';
export const FIREBASE_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? 'G-MM91FR55WB';
export const VAPID_KEY =
  process.env.NEXT_PUBLIC_VAPID_KEY ??
  'BA_mpsFP1109srcgazsuAcpmaiNnHkD3TCQDqIk1jJlncel2GNvXVl4jeZxg56Er4FYMYxMPWjf6TDySoyxCMYo';

export const DEFAULT_CURRENCY =
  process.env.NEXT_PUBLIC_DEFAULT_CURRENCY ?? 'USD';
export const DEFAULT_LANGUAGE =
  process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? 'en';

export const FIREBASE_FOLDER_NAME =
  process.env.NEXT_PUBLIC_FIREBASE_FOLDER_NAME ?? 'staging_environment';
