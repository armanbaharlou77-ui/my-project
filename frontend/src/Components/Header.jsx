import React from "react";
import Navbar from "./NavBar";
import Topbar from "./TopBar";
import Landing from "./Landing";


export default function Header() {
  return (
    <header className="header">
      <Topbar />
      <Navbar />
      <Landing />
    </header>
  );
}
