import db from '../db/db_config';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (uid) => ({
  type: LOGIN,
  uid
})

export const logout = () => ({
  type: LOGOUT
})

export const startLogin = () => {
  return () => {
    return db.signInWithGoogle()
  }
}

export const startLogout = () => {
  return () => {
    return db.signOut();
  }
}