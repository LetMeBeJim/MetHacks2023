import React from 'react';
// ... styled components definitions


const Navbar = () => {
  return (
        <nav className="transition ease-in-out delay-150 bg-[#187a33] flex-row-reverse justify-between items-center h-[10vh]">
            <div className="flex h-full text-white text-4xl text-center">
                <a href="/" style={{ textDecoration: 'none', color: 'white' }} className="px-8 h-full hover:bg-[#e3ab32] transition duration-0 hover:duration-150 flex h-full justify-center items-center">
                  <h1 className="text-center">Home</h1>
                </a>

                <a href="/recipe" style={{ textDecoration: 'none', color: 'white' }} className="px-8 h-full hover:bg-[#e3ab32] transition duration-0 hover:duration-150 flex h-full justify-center items-center">
                  <h1 className="text-center">Recipe</h1>
                </a>

                <a href="/about" style={{ textDecoration: 'none', color: 'white' }} className="px-8 h-full hover:bg-[#e3ab32] transition duration-0 hover:duration-150 flex h-full justify-center items-center">
                <h1 className="text-center">About</h1>
                </a>
            </div>
        </nav>
  );
};

export default Navbar;