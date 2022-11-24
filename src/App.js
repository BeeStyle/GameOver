import './App.css';

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from './Component/home/Home';
import All from './Component/games/All';
import Master from './Component/Master/Master';
import NotFound from './Component/notfound/NotFound';
import Browser from './Component/games/platforms/browser/Browser';
import Pc from './Component/games/platforms/pc/Pc';
import Alphabetical from './Component/games/SortBy/alphabetical/Alphabetical';
import Popularity from './Component/games/SortBy/Popularity/Popularity';
import ReleaseDate from './Component/games/SortBy/ReleaseDate/ReleaseDate';
import Relevance from './Component/games/SortBy/Relevance/Relevance';
import Action from './Component/games/Categories/Action/Action';
import ActionRPG from './Component/games/Categories/ActionRPG/ActionRPG';
import BattleRoyale from './Component/games/Categories/BattleRoyale/BattleRoyale';
import Fantasy from './Component/games/Categories/Fantasy/Fantasy';
import Flight from './Component/games/Categories/Flight/Flight';
import OpenWorld from './Component/games/Categories/OpenWorld/OpenWorld';
import Racing from './Component/games/Categories/Racing/Racing';
import Shooter from './Component/games/Categories/Shooter/Shooter';
import Social from './Component/games/Categories/Social/Social';
import Sports from './Component/games/Categories/Sports/Sports';
import Zombie from './Component/games/Categories/Zombie/Zombie';
import Login from './Component/login/Login';
import Register from './Component/register/Register';
import { useEffect, useState } from 'react'
import jwt_Decode from 'jwt-decode';
import GameDetails from './Component/GameDetails/GameDetails';
function App() {
  let [user, setUser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      saveUserData()
    }
  }, [])
  function saveUserData() {
    let token = localStorage.getItem("token")
    let data = jwt_Decode(token)
    setUser(data)
  }
  function ProtectedRouter(props) {
    if (localStorage.getItem("token") == null) {
      return <Navigate to='login' />
    }
    else {
      return props.children
    }
  }
  function LogOut() {
    localStorage.removeItem("token")
    setUser(null)
    return <Navigate to='login' />
  }
  let routes = createBrowserRouter([
    {
      path: "/", element: <Master user={user} LogOut={LogOut} />, children: [
        { path: "/", element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: "home", element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: "gameDetails/:x", element: <ProtectedRouter><GameDetails /></ProtectedRouter> },
        { path: "games/all", element: <ProtectedRouter><All /></ProtectedRouter> },
        { path: "games/sortby/alphabetical", element: <ProtectedRouter><Alphabetical /></ProtectedRouter> },
        { path: "games/sortby/popularity", element: <ProtectedRouter><Popularity /></ProtectedRouter> },
        { path: "games/sortby/ReleaseDate", element: <ProtectedRouter><ReleaseDate /></ProtectedRouter> },
        { path: "games/sortby/Relevance", element: <ProtectedRouter><Relevance /></ProtectedRouter> },
        { path: "games/platforms/pc", element: <ProtectedRouter><Pc /> </ProtectedRouter> },
        { path: "games/platforms/browser", element: <ProtectedRouter><Browser /></ProtectedRouter> },
        { path: "games/Categories/Action", element: <ProtectedRouter><Action /></ProtectedRouter> },
        { path: "games/Categories/ActionRPG", element: <ProtectedRouter><ActionRPG /></ProtectedRouter> },
        { path: "games/Categories/BattleRoyale", element: <ProtectedRouter><BattleRoyale /></ProtectedRouter> },
        { path: "games/Categories/Fantasy", element: <ProtectedRouter><Fantasy /></ProtectedRouter> },
        { path: "games/Categories/Flight", element: <ProtectedRouter><Flight /></ProtectedRouter> },
        { path: "games/Categories/OpenWorld", element: <ProtectedRouter><OpenWorld /></ProtectedRouter> },
        { path: "games/Categories/Racing", element: <ProtectedRouter><Racing /></ProtectedRouter> },
        { path: "games/Categories/Shooter", element: <ProtectedRouter><Shooter /></ProtectedRouter> },
        { path: "games/Categories/Social", element: <ProtectedRouter><Social /></ProtectedRouter> },
        { path: "games/Categories/Sports", element: <ProtectedRouter><Sports /></ProtectedRouter> },
        { path: "games/Categories/Zombie", element: <ProtectedRouter><Zombie /></ProtectedRouter> },
        { path: "login", element: <Login saveUser={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <ProtectedRouter><NotFound /></ProtectedRouter> },

      ]
    }
  ])
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
