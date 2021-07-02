/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useAuth } from '../context/auth'
import { Navbar, Nav, Button, Dropdown, DropdownButton, Image } from 'react-bootstrap'
/**
 *
 * @todo Condtionally render login/register and Profile name in NavBar
 */

export default function NavBar() {
  const { logout, profileName, avatarImage } = useAuth()

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/" style={{ marginLeft: "5%" }} className="ml-5 font-bold fs-3">Todo</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: "20px" }}/>

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-5 fs-5">
          <Nav.Link href="/login" className="nav-items">Login</Nav.Link>
          <Nav.Link href="/register" className="nav-items">Register</Nav.Link>
        </Nav>

        <Nav className="ml-auto mr-5">
          <div className="avatar-box">
            <div className="avatar">
              <Image style={{ marginTop: "20%" }} src={avatarImage} roundedCircle />
            </div>
          
            <div className="avatar">            
              <DropdownButton
                key="1"
                id="dropdown-button-drop"
                size="lg"
                title={profileName}
              >
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
