import React from 'react';
// ... styled components definitions


const Navbar = () => {
  return (
        <nav>
            <ul>
                <div className="row">
                <li className="col">
                    <a href="/">
                    Home
                    </a>
                </li>
                <li className="col">
                    <a href="/recipe">
                    Recipe
                    </a>
                </li>
                <li className="col">
                    <a href="/about">
                    About
                    </a>
                </li>
                <li className="col">
                    <a href="/contact">
                    Contact
                    </a>
                </li>
                </div>
            </ul>
        </nav>
  );
};

export default Navbar;