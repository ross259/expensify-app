import db from '../db/db_config'

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