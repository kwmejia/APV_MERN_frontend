import React, { useContext } from 'react'
import PacientesContext from '../context/PacientesProvider'

export const usePacientes = () => useContext(PacientesContext);

export default usePacientes;
