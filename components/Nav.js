/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useAuth } from '../context/auth'
import { Navbar, Nav, Button, Dropdown, DropdownButton, Image } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import { divide } from 'lodash'

export default function NavBar() {
  const { logout, profileName, avatarImage } = useAuth()
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const token = cookies.token
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const [date, setDate] = useState(new Date().getDate())
  const [month, setMonth] = useState(new Date().getMonth())
  const [hour, setHour] = useState(new Date().getHours())
  const [minute, setMinute] = useState(new Date().getMinutes())
  const [hr, setHr] = useState(new Date().getHours())
  const [suffix, setSuffix] = useState(hr >= 12 ? "PM" : "AM")
  
  function updateTime() {
    setHour(new Date().getHours())
    setHr(new Date().getHours())
    setSuffix(hr >= 12 ? "PM":"AM");
    setHour((hour + 11) % 12 + 1)

    setDate(new Date().getDate())
    setMonth(new Date().getMonth())
    setMinute(new Date().getMinutes())
  }

  setInterval(updateTime, 1000)

  function loggedIn() {
    if (token)
      return true
    return false
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/" style={{ marginLeft: "5%" }} className="ml-5 font-bold fs-3">Todo</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: "30px" }}/>

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={ loggedIn ? "hideme" : null + "ml-5 fs-5"}>
          <Nav.Link href="/login" className="nav-items">Login</Nav.Link>
          <Nav.Link href="/register" className="nav-items">Register</Nav.Link>
        </Nav>

        <div className="time nav-items fs-5 ml-auto">
          {date + " " + months[month] + " " + hour + ":" + minute + " " + suffix}
        </div>
        
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
