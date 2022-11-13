import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { Footer, Header } from '../components/';
import useAuth from '../hooks/useAuth';


export const RutaProtegida = () => {

  const { auth, cargando } = useAuth();

  if (cargando) return 'Cargando ...';

  return (
    <>
      <Header />
      {auth ? (
        <main className="container mx-auto mt-20">
          <Outlet />
        </main>
      ) : <Navigate to="/" />}
      <Footer />
    </>
  )
}
