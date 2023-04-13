import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import Layout from '../../layout';


const Authmiddleware = ({
  component: Component,
  isAuthProtected,
  ...rest
}) => {
  const isLoggedIn = true
 
  if (isAuthProtected && !isLoggedIn) {
    return (
      <Navigate state={{ from: rest.location }} to="/login" />
    )
  }
  
  return (
    <React.Fragment>
      <Layout>
        <Component {...rest} />
      </Layout>
    </React.Fragment>
  )
}

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
}

export default Authmiddleware;
