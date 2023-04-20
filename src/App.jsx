import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Login } from './components/Login'
import { ChakraProvider } from '@chakra-ui/react'
import { Register } from './components/Register'
const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navbar />
      <Outlet />
    </>,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register/>
      },
    ]

  }
])

export const App = () => {
  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </>
  )
}
