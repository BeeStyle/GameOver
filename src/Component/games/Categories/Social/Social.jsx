import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Social() {
  let [gamesList, setGamesList] = useState([]);
  let [z, setz] = useState(20)
  useEffect(() => {
    getdata()
  }, [])
  async function getdata() {
    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=social&rapidapi-key=b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68`)
    setGamesList(data.slice(0, z))
  }
  function More() {
    setz(z + 20)
    getdata()
  }
  return (
    <>
      <div className="row mt-3 g-3">
        {gamesList.map((game, i) =>
          <div className="col-md-3" key={i}>
            <Link className='Linky' to={'/gamedetails/' + game.id}>
              <div className="card mb-4 grow">
                <img alt="" className="w-100" src={game.thumbnail} />
                <div className='p-3'>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-title text-truncate">{game.title}</h4>
                    <span className="badge badge-ftg p-2">FREE</span>
                  </div>
                  <p className="text-muted">{game.short_description.slice(0,25) +"..."}</p>
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-plus-square"></i>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-secondary text-dark me-2">{game.genre}</span>
                      <i title="Available on Windows" className="fab fa-windows text-muted stretched-link"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

      </div>
      <div className='text-center' >
        <button type='button' className="btn btn-outline-secondary py-2 pt-1" onClick={More}>More Games <i className="fas fa-angle-right" ></i></button>
      </div>
    </>
  )
}
