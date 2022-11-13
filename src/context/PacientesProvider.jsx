import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});


  useEffect(() => {
    obtenerPacientes();
  }, [])


  const obtenerPacientes = async () => {
    try {
      const token = localStorage.getItem('apv_token');
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const res = await clienteAxios('/pacientes', config);

      setPacientes(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  const guardarPaciente = async (paciente) => {

    const token = localStorage.getItem('apv_token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    console.log(paciente);

    if (paciente._id !== "") {
      try {
        const res = await clienteAxios.put(`/pacientes/${paciente._id}`, paciente, config);
        const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === res.data._id ? res.data : pacienteState)

        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }

      return;
    }

    try {
      const { _id, ...pacienteAlmacenar } = paciente;
      const res = await clienteAxios.post('/pacientes', pacienteAlmacenar, config);
      console.log(res);
      const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = res.data;
      setPacientes([pacienteAlmacenado, ...pacientes]);

    } catch (error) {
      console.log(error.response.data.msg);
    }

  }


  const eliminarPaciente = async (_id) => {
    const confirmar = confirm('Confirmas que deseas eliminar ?');
    if (!confirmar) return;

    const token = localStorage.getItem('apv_token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const res = await clienteAxios.delete(`/pacientes/${_id}`, config);
      const pacientesNoEliminados = pacientes.filter(pacienteTmp => pacienteTmp._id !== _id);
      setPacientes(pacientesNoEliminados);
      console.log(pacientesNoEliminados);

    } catch (error) {
      console.log(error);
    }
  }


  const setEdicion = (paciente) => {
    setPaciente(paciente);
  }

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente
      }}
    >
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext;