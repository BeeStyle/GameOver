import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function GameDetails() {
  let [gamedetail, setgamedetail] = useState(null)
  let id = useParams()
  useEffect(() => {
    getdata()
  }, [])
  async function getdata() {
    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id.x}&rapidapi-key=b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68`)
    setgamedetail(data)
  }
  return (
    <>
      {gamedetail == null ? "" : <div className="row mt-5">
        <div className="col-md-4">
          <div><img alt="" className="w-100 rounded-2" src={gamedetail.thumbnail} />
            <div className="row mt-2 w-100 justify-content-between me-0 pe-0">
              <div className="col-3 col-lg-2 me-2"><span className="btn btn-dark mb-3 py-2 cursor">FREE</span></div>
              <div className="col me-0 pe-0">
                <a type="button" rel="noreferrer" target="_blank" className="btn btn-primary btn-block w-100 py-2 me-0" href={gamedetail.freetogame_profile_url}>
                  <strong>PLAY NOW</strong><i className="fas fa-sign-out-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h1>{gamedetail.title}</h1>
          <h5 className="mt-3">About {gamedetail.title}</h5>
          <p>{gamedetail.description}</p>
          {gamedetail.minimum_system_requirements == null ? "" : <>
            <h5 className="mt-3">Minimum System Requirements</h5>
            <ul className="list-unstyled ms-2">
              <li><strong>graphics :{gamedetail.minimum_system_requirements.graphics} </strong></li>
              <li><strong>memory :{gamedetail.minimum_system_requirements.memory} </strong></li>
              <li><strong>os :{gamedetail.minimum_system_requirements.os} </strong></li>
              <li><strong>processor :{gamedetail.minimum_system_requirements.processor} </strong></li>
              <li><strong>storage :{gamedetail.minimum_system_requirements.storage} </strong></li>
            </ul></>}

          <h4>{gamedetail.title} Screenshots</h4>
          <OwlCarousel className='owl-theme' items={1} loop>
            {gamedetail.screenshots.map((e, i) => <div className="item" key={i}><img alt="" className="w-100" src={e.image} />
            </div>)}
          </OwlCarousel>
          <h2>Additional Information</h2>
          <hr className="mt-2 mb-3" />
          <div className="row mb-3">
            <div className="col-6 col-md-4"><span className="text-muted">Title<br /></span>
              <p>{gamedetail.title}</p>
            </div>
            <div className="col-6 col-md-4"><span className="text-muted">Developer<br /></span> {gamedetail.developer} </div>
            <div className="col-6 col-md-4"><span className="text-muted">Publisher<br /></span> {gamedetail.publisher} </div>
            <div className="col-6 col-md-4"><span className="text-muted">Release Date<br /></span> {gamedetail.release_date} </div>
            <div className="col-6 col-md-4"><span className="text-muted">Genre<br /></span> {gamedetail.genre} </div>
            <div className="col-6 col-md-4"><span className="text-muted">Platform<br /></span><i className="fab fa-windows me-1"></i>
              {gamedetail.platform}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
