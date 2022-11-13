import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/axios';

export const Registrar = () => {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: 'Los password no son igules', error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true });
      return;
    }

    setAlerta({});

    // Crear el usuario en la api

    try {
      const url = `/veterinarios`
      await clienteAxios.post(url, { nombre, email, password })
      setAlerta({
        msg: 'Creado Correctamente, revisa tu email',
        error: false
      });

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  return (
    <>
      <div className="my-5">
        <h1 className="text-indigo-600 text-center font-black text-5xl mt-12">
          Crea tu cuenta<br /> y Administra {""} <br /> <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white  ">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>

          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold mt-12">Nombre</label>
            <input type="text"
              placeholder='Tu password'
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold mt-12"> Email</label>
            <input type="email"
              placeholder='Email de registro'
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold mt-12">Password</label>
            <input type="password"
              placeholder='Tu Password'
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold mt-12">Repetir Password</label>
            <input type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input type="submit"
            value="Crear cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />

        </form>

        <nav className="mt-10 lg:flex justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password">Olvidé mi password</Link>
        </nav>
      </div>



    </>
  )
}
