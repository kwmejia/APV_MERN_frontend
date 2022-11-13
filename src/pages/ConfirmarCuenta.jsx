import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import { useState } from 'react';
import clienteAxios from '../config/axios';

export const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const { id } = useParams();


  useEffect(() => {
    confirmarCuenta();
  }, []);

  const confirmarCuenta = async () => {
    try {

      const url = `/veterinarios/confirmar/${id}`;
      const res = await clienteAxios(url);

      await setCuentaConfirmada(true);
      setAlerta({
        msg: res.data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
    setCargando(false);
  }

  return (
    <>
      <div className="my-5">
        <h1 className="text-indigo-600 text-center font-black text-5xl mt-12">
          Confirma tu Cuenta y Comienza a Administrar {""} <br /> <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white  ">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && <Link
          className="block text-center my-5 text-gray-500"
          to="/"> Inicia Sesión</Link>}
      </div>

    </>
  )
}
