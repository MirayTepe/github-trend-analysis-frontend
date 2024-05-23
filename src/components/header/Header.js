import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Header = () => {
    const {auth,setAuth} =useAuth();

    const navigate = useNavigate();

    const handleNav = (path) => {
        navigate(path);
    }

    function logOut(){
      setAuth(null);
      handleNav("/");
    }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="menu-link" style={{"color":'white'}}>
            <Link to = "/">
                <img src="../../../images/github-icon.png" alt="Search icon" />
             </Link>          
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
        <Nav
            className='me-auto my-2 my-lg-0'
            style={{maxHeight: '100px'}}
            navbarScroll>
            <NavLink className="nav-link" to ="/">Anasayfa</NavLink>  
            <NavLink className="nav-link" to ="/Analiysis">Trend Analizi</NavLink> 
        </Nav>
        {
          auth?.user?
            <Button variant = "info" className="mb-2 mt-2" onClick ={logOut}>Çıkış</Button>
          :
          <>
            <Button variant='info' className='me-2' onClick={() => handleNav("/Login")}>Giriş Yap</Button>
            <Button variant='info' className='me-2' onClick={() => handleNav("/Register")} >Kayıt Ol</Button>
          </>
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
