import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

export const useAuth = () => useContext(AuthContext);

export default useAuth;
