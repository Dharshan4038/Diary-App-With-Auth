import React from 'react'

const Header = ({handleClick}) => {
  return (
    <nav className="navbar bg-primary">
        <div className="container-fluid">
            <h3 className="text-white mx-3">Diary</h3>
            <button className="btn btn btn-danger mx-5" onClick={handleClick}>Logout</button>
        </div>
    </nav>
  )
}

export default Header