import React from "react";
import logo from "../images/logo.png";

const Menu = () => {
  return (
    <>
      <header className="menu">
        <div className="wrapper">
          <img src={`${logo}`} alt="logo" />
          <input type="text" className="button-search" placeholder="Search" />
        </div>
      </header>
    </>
  );
};

export default Menu;
