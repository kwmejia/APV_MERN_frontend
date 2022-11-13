import React, { useState } from 'react'
import { useEffect } from 'react';
import { AdminNav } from '../components/AdminNav'
import { Alerta } from '../components/Alerta';
import useAuth from '../hooks/useAuth'

export const EditarPerfil = () => {

  const { user: { perfil }, actualizarPerfil } = useAuth();
  const [perfilVet, setPerfilVet] = useState({});
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    setPerfilVet(perfil);
  }, [perfil]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('submit');
    const { nombre, email } = perfilVet;

    if ([nombre, email].includes('')) {
      setAlerta({
        msg: 'Email y Nombre son obligatorios',
        error: true
      })
      return;
    }

    const resultado = await actualizarPerfil(perfilVet);
    setAlerta(resultado);
  }

  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""}
        <span className="text-indigo-600 font-bold">Perfil</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfilVet?.nombre || ''}
                onChange={e => setPerfilVet({ ...perfilVet, [e.target.name]: e.target.value })}
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Sitio Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={perfilVet?.web || ''}
                onChange={e => setPerfilVet({ ...perfilVet, [e.target.name]: e.target.value })}
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Teléfono
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="telefono"
                value={perfilVet?.telefono || ''}
                onChange={e => setPerfilVet({ ...perfilVet, [e.target.name]: e.target.value })}
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Email
              </label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={perfilVet?.email || ''}
                onChange={e => setPerfilVet({ ...perfilVet, [e.target.name]: e.target.value })}
              />
            </div>

            <input
              type="submit"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer hover:bg-indigo-800"
              value="Guardar Cambios"
            />

          </form>
        </div>
      </div>
    </>
  )
}
