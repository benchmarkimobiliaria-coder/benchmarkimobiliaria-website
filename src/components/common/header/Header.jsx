import React, { useState } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"
import { useFavorites } from "../../../context/FavoritesContext"

const Header = () => {
  const [navList, setNavList] = useState(false)
  const { favorites } = useFavorites()

  return (
    <>
      <header>
        <div className='container flex' >
          <div className='logo'>
            <Link to='/'>
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='' />
            </Link>
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            <Link to='/mylist' className='mylist-link' title='Minha Lista'>
              <a>Lista de Desejos </a> <i className='fa fa-heart'></i> {favorites.length > 0 && <span className='badge'>{favorites.length}</span>}
            </Link>
            {/* <button className='btn1'>
              <i className='fa fa-sign-out'></i> Entrar
            </button> */}
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
