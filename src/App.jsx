import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Login } from './components/Login'
import { ChakraProvider } from '@chakra-ui/react'
import { Register } from './components/Register'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from './store/AuthProvider'
import { Products } from './components/Products'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar />
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>
    </>,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }, {
        path: "",
        element: <Products />
      }
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
