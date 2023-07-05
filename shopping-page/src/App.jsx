import React, { Fragment } from 'react'
import "./App.css"
import { useRoutes } from "react-router-dom"
import routes from './routes'

export default function App() {
  const router = useRoutes(routes)
  return (
    <Fragment>
      {router}
    </Fragment>

  )
}
