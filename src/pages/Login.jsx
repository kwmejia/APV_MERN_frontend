import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';


export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios.',
        error: true
      })
      return;
    }

    try {
      const res = await clienteAxios.post('/veterinarios/login', { email, password });
      localStorage.setItem('apv_token', res.data.token);
      setAuth(res.data);
      navigate('/admin');
    } catch (error) {

      setAlerta({
        msg: error.response.data.msg,
        error: true
      })

    }

  }

  const { msg } = alerta;
  return (
    <>
      <div className="my-5">
        <h1 className="text-indigo-600 text-center font-black text-5xl mt-12">
          Inicia Sesion<br /> y Administra tus <br /> <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white  ">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold mt-12"> Email</label>
            <input
              type="text"
              placeholder='Email de registro'
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold mt-12">Password</label>
            <input
              type="password"
              placeholder='Tu password'
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />

        </form>

        <nav className="mt-10 lg:flex justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar">¿No tienes una cuenta Registrate?</Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password">Olvidé mi password</Link>
        </nav>
      </div>

    </>
  )
}
