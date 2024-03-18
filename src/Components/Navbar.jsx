import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>e-TODO</span>
        </div>
      <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Yours Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
