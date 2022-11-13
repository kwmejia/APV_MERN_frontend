import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import { AuthLayout } from './layout/AuthLayout';
import { RutaProtegida } from './layout/RutaProtegida';
import { Login, ConfirmarCuenta, OlvidePassword, Registrar, NuevoPassword, EditarPerfil, CambiarPassword } from './pages/';
import { AdministrarPacientes } from './pages/AdministrarPacientes';


const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* PUBLIC */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            {/* Private */}
            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />

            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;