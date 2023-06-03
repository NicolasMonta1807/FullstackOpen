import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/'>Home</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/create'>Create New</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/about'>About</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
