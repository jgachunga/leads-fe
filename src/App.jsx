import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes/allRoutes'
import Authmiddleware from './routes/middleware/Authmiddleware'

function App() {
  return (
    <>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={<route.component />} />
        ))}
        {privateRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Authmiddleware
                path={route.path}
                component={route.component}
                isAuthProtected={true}
                exact
              />
            }
          />
        ))}
      </Routes>
    </>
  )
}

export default App
