// Navbar.js
import React, { useState } from "react";
import { menuItems } from "../menuItems";
import MenuItems from "./MenuItems";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

const Navbar = ({ logo }) => {
  const [open, setOpen] = useState(false);

  const toggleSet = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="nav-area">
        <Link to="/" className="logo">
          <b>{logo}</b>
        </Link>
        <ul className="menus">
          {menuItems.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          })}
        </ul>
        <div className="hamburger" onClick={toggleSet}>
          {!open ? <GiHamburgerMenu size={30} /> : <MdCancel size={30} />}
        </div>
      </div>
      {open && (
        <div className="hamburger-items">
          {menuItems.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
