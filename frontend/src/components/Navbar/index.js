import axios from 'axios';
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';
import React, {useEffect, useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
const jar = new CookieJar();
const client = wrapper(axios.create({jar}));
client.defaults.withCredentials = true
window.testclient = client;

  
const Navbar = () => {
  const [userdata, setUserData] = useState("");
  useEffect(() => {
    client.get(`http://localhost:8765/profiledata`)
        .then(res => {
            setUserData(res.data)
        });
}, [])


if (userdata === "" || userdata.username === ""){
  return (
    <>
    <Nav>
      <Bars />

      <NavMenu>
      </NavMenu>
      <NavBtn>
      <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
        <NavBtnLink to='/login'>Login</NavBtnLink>
      </NavBtn>
    </Nav>
  </>
);}
else {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/stats' activeStyle>
            Statistics
          </NavLink>         
          <NavLink to='/readingTable' activeStyle>
            Reading table
          </NavLink>
          <NavLink to='/profile' activeStyle>
            Profile
          </NavLink>
        </NavMenu>
        <NavBtn>
        <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
          <NavBtnLink to='/login'>Login with another user</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
}
};
  
export default Navbar;