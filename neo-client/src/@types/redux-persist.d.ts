declare module 'redux-persist/lib/storage' {
    import { WebStorage } from 'redux-persist/es/types';
    const localStorage: WebStorage;
    const sessionStorage: WebStorage;
    export { localStorage, sessionStorage };
  }