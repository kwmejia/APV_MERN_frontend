import React, { useState } from 'react';
import { Alerta } from './Alerta';
import usePacientes from '../hooks/usePacientes';
import { useEffect } from 'react';

export const Formulario = () => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [alerta, setAlerta] = useState({});
  const [_id, setId] = useState('')
  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    llenarCampos();
  }, [paciente]);

  const llenarCampos = () => {

    if (paciente?.nombre) {
      setNombre(paciente?.nombre)
      setPropietario(paciente?.propietario)
      setEmail(paciente?.email)
      setFecha(paciente?.fecha.substr(0, 10))
      setSintomas(paciente?.sintomas)
      setId(paciente?._id)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }


    await guardarPaciente({
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      _id
    })
    setAlerta({
      msg: 'Guardado Correctamente'
    })

    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId('');
  }

  const { msg } = alerta;
  return (

    <>
      <h2 className="font-black text-3xl text-center mb-5">Administrador de pacientes</h2>
      <p className="text-lg text-center mb-10">
        Añade tus pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        className="bg-white py-10 px-5  mb-10 md:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5">
          <label htmlFor="mascota"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            type="text"
            id="mascota"
            placeholder="Nombre de las Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre propietario
          </label>
          <input
            type="text"
            id="propietario"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >
            Fecha Alta
          </label>
          <input
            type="date"
            id="fecha"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            type="date"
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>


        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={_id ? "Guardar Cambios" : "Agregar Paciente"}
        />
      </form>
    </>
  )
}
