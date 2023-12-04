import AuthForm from "./Auth/AuthForm"
import NavBar from "./NavBar/NavBar"
import { Routes, Route, Navigate, redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../hooks/useRedux"
import Disk from "./Disk/Disk"
import React from "react"
import { auth } from "../utils/api/userApi"
import { setUser } from "../store/reducers/userSlice"


const App = () => {
  const { isAuth } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    auth()
      .then(data => dispatch(setUser(data.user)))
      .catch(e => {
        alert(e.response.data.message)
        return redirect('/auth')
      })
  }, [])
  return (
    <div className="app">
      <NavBar />
      <div className="container">
        <Routes>
          {!isAuth
            ?
            <>
              <Route path="/auth" element={<AuthForm title="Authorization" buttonTitle="Log In" isLogin={true} />} />
              <Route path="/registration" element={<AuthForm title="Registration" buttonTitle="Registration" />} />
              <Route path="*" element={<Navigate to='/auth' />} />
            </>
            :
            <Route path="/home" element={<Disk />} />}
          <Route path="*" element={<Navigate to='/home' />} />
        </Routes>
      </div>
    </div>
  )
}

export default App