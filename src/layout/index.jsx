import MyNavbar from './navbar'
import PropTypes from 'prop-types'

function Layout(props) {
  return (
    <>
      <MyNavbar />
      <div className="container mt-4">{props.children}</div>
      <footer className="mt-4 text-center">&copy; My App 2023</footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
