import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purpleLight py-4 text-center">
      <Link to={"/"} className="text-xl text-primary font-medium">
        ToDoApp
      </Link>
    </nav>
  );
};

export default Navbar;
