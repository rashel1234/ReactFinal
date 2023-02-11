import React from 'react';
import {  Link } from "react-router-dom";
const NavBar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Dogs</Link>
    </li>
    <li>
      <Link to="/cats">Cats</Link>
    </li>
    <li>
      <Link to="/sheeps">Sheeps</Link>
    </li>
    <li>
      <Link to="/goats">Goats</Link>
    </li>
  </div>
  );
}
export default NavBar;