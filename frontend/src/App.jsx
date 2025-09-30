import { useCallback, useEffect, useState } from 'react'
import { useRoutes } from "react-router"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import routes from './routes'
import AuthContext from './Context/AuthContext'
import './App.css'


function App() {

  const router = useRoutes(routes)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState(false)


  const login = useCallback((userInfos, token) => {
    setToken(token)
    setUserInfos(userInfos)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify({ token: token }))
  })

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  })
  useEffect(() => {

    const localStorageData = JSON.parse(localStorage.getItem('user'))

    if (localStorageData) {

      fetch('http://localhost:4000/v1/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        }
      }).then(res => res.json())
        .then(data => {
          setIsLoggedIn(true)
          setUserInfos(data)
        })
    } else (
      setIsLoggedIn(false)
    )
  }, [login, logout])


  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      userInfos,
      login,
      logout
    }}>

      {router}

    </AuthContext.Provider>
  )
}

export default App
