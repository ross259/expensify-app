import db from '../db/db_config'

export const startLogin = () => {
  return () => {
    return db.signInWithPopup()
  }
}