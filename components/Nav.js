/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useAuth } from '../context/auth'
import { Navbar, Nav, Button, Dropdown, DropdownButton, Image } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function NavBar() {
  const { token, logout, profileName, avatarImage } = useAuth()
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const [notLoggedIn, setNotLoggedIn] = useState(true)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const [date, setDate] = useState(new Date().getDate())
  const [month, setMonth] = useState(new Date().getMonth())
  const hr = (new Date().getHours() + 11) % 12 + 1
  const suf = new Date().getHours() > 11 ? "PM" : "AM"
  const [suffix, setSuffix] = useState(suf)
  const [hour, setHour] = useState(hr)
  const min = new Date().getMinutes() > 9 ? new Date().getMinutes() : ('0' + new Date().getMinutes())
  const [minute, setMinute] = useState(min)
  
  function updateTime() {
    const newHour = (new Date().getHours() + 11) % 12 + 1
    const newSuffix = new Date().getHours() > 11 ? "PM" : "AM"
    const newMinute = new Date().getMinutes() > 9 ? new Date().getMinutes() : ('0' + new Date().getMinutes())

    setDate(new Date().getDate())
    setMonth(new Date().getMonth())
    setHour(newHour)
    setMinute(newMinute)
    setSuffix(newSuffix)
  }

  setInterval(updateTime, 1000)

  useEffect(() => {
    if (token) {
      setNotLoggedIn(false)
    } else {
      setNotLoggedIn(true)
    }
  }, [token])

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/" style={{ marginLeft: "5%" }} className="ml-5 font-bold fs-3">Todo</Navbar.Brand>
      <Navbar.Brand className="time nav-items fs-5" style={{ marginLeft: "auto"}}>
        {date + " " + months[month] + " " + hour + ":" + minute + " " + suffix}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginLeft: "auto", marginRight: "30px" }}/>

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={ !notLoggedIn ? "hideme" : null + "ml-5 fs-5"}>
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
                <Dropdown.Item
                  onClick={() => {
                    toast.info("Logged out!", {
                      position: "bottom-right",
                      autoClose: 2000
                    })
                    logout()
                  }}
                >Logout
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>
      <ToastContainer />
    </Navbar>
  )
}
