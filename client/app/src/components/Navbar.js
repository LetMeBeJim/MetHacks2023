import React from 'react';
// ... styled components definitions


const Navbar = () => {
  return (
        <nav className="transition ease-in-out delay-150 bg-[#187a33] flex-row-reverse justify-between items-center h-[10vh]">
            <div className="flex gap-4 h-full text-white text-4xl text-center">
                <a href="/" className="h-full hover:bg-[#e3ab32] transition duration-0 hover:duration-150">
                Home
                </a>

                <a href="/recipe" className="h-full hover:bg-[#e3ab32] transition duration-0 hover:duration-150">
                Recipe
                </a>

                <a href="/about" className="h-full hover:bg-[#e3ab32] transition duration-0 hover:duration-150">
                About
                </a>
            </div>
        </nav>
  );
};

export default Navbar;