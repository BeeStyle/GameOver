import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import x from '../../images/logo.png';
export default function NavBar({ user, LogOut }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-color fixed-top navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to='/'><img className='' src={x} alt="" /> Game Over</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user == null ? '' :
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to='home'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='games/all'>All</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to='' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Platforms
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to='games/platforms/pc'>pc</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/platforms/browser'>browser</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to='' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  sort-by
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to='games/platforms/browser'>release-date</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/sortby/popularity'>popularity</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/sortby/alphabetical'>alphabetical</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/sortby/Relevance'>relevance</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to='' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to='games/Categories/Racing'>racing</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/Sports'>sports</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/Social'>social</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/Shooter'>shooter</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/OpenWorld'>open-world</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/Zombie'>zombie</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/Fantasy'>fantasy</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/ActionRPG'>action-rpg</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/Action'>action</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/Flight'>flight</NavLink></li>
                  <li><NavLink className="dropdown-item" to='games/Categories/BattleRoyale'>battle-royale</NavLink></li>
                </ul>
              </li>
            </ul>}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user == null ? <><li className="nav-item m-2">
              <NavLink className="nav-link" to='login'>Login</NavLink>
            </li>
              <li className="nav-item m-2">
                <NavLink className="nav-link regis btn" to='register'>Join Free</NavLink>
              </li> </> : <li className="nav-item m-2">
              <span className="nav-link regis btn" onClick={LogOut}>LogOut</span>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}
