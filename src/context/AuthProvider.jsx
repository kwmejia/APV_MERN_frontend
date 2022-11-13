import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({})


  useEffect(() => {
    autenticarUsuario();
  }, []);

  const autenticarUsuario = async () => {
    const token = localStorage.getItem('apv_token');
    if (!token) return

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const res = await clienteAxios('/veterinarios/perfil', config);
      setCargando(false);
      setUser(res.data);
      setAuth(true);

    } catch (error) {
      console.log(error.response.data.msg);
      setAuth(false);
      setCargando(false);
    }
  }

  const cerrarSesion = () => {
    setAuth(false);
    localStorage.removeItem('apv_token')
  }

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem('apv_token');
    if (!token) return

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const res = await clienteAxios.put(url, datos, config);

      return {
        msg: 'Almacenado Correctamente'
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }


  const guardarPassword = async (datos) => {

    const token = localStorage.getItem('apv_token');
    if (!token) return

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const url = '/veterinarios/actualizar-password';
      const res = await clienteAxios.put(url, datos, config);

      console.log(res);
      return {
        msg: res.data.msg,
        error: false
      }

    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        user,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;