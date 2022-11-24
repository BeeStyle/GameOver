import React, { useState, useEffect } from 'react'
import x from '../../images/bckground.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Home() {
  let [gamesList, setGamesList] = useState([]);
  useEffect(() => {
    getdata()
  }, [])
  async function getdata() {
    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity&rapidapi-key=b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68`)
    setGamesList(data.slice(0, 3))
  }
  return (<>
    <section className="homebg text-center" style={{ backgroundImage: `url(${x})` }}>
      <div className="container" >
        <h1>Find & track the best <span className="text-primary">free-to-play</span> games!</h1>
        <p className="text-muted">Track what you've played and search for what to play next! Plus get free premium loot! </p>
        <Link role="button" className="btn btn-outline-secondary btn-md ml-0" to='/games/all'>Browse Games</Link>
      </div>
    </section>
    <section>
      <div className="container my-5">
        <h3><i className="fas fa-robot mr-2"></i>Personalized Recommendations</h3>
        <div className="row mt-3 g-3">
          {gamesList.map((game, i) =>
            <div className="col-md-4" key={i}>
              <Link className='Linky' to={'/gamedetails/' + game.id}>
                <div className="card mb-4 grow">
                  <img alt="" className="w-100" src={game.thumbnail} />
                  <div className="d-flex justify-content-between align-items-center p-3">
                    <h4 className="card-title text-truncate">{game.title}</h4>
                    <span className="badge badge-ftg p-2">FREE</span>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  </>
  )
}
