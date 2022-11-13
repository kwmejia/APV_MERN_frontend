import React from 'react'
import { Outlet } from 'react-router-dom';
export const AuthLayout = () => {
  return (
    <>

      <main className="container mx-auto md:grid grid-cols-2 gap-10 p-5 items-center">
        <Outlet />
      </main>
    </>
  )
}
