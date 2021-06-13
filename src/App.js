import axios from 'axios';
import './App.css';
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react'
import Insert from './Insert';
import Update from './Update'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {

  const [movies, setmovies] = useState([])

  useEffect(() => {
    fetchMovies();
  }, [])


  async function fetchMovies() {

    const result = await axios('https://movie-backend-app2.herokuapp.com/getMovies');
    setmovies(result.data)

  }




  async function deleteMovie(e) {

    var movieId = e.target.getAttribute('data-id');
    const url = `https://movie-backend-app2.herokuapp.com/delete?id=${movieId}`
    await axios.put(url)
      .then(res => {
        alert(res.data);
        fetchMovies();
      })
      .catch(err => console.log(err))

  }
  return (
    <Router>
      <Navbar />


      <Switch >

        <Route exact path="/">
          <div class="movie-container">
            {movies.length == 0 ? <h1>No movies</h1> :

              movies.map(item => {

                return (
                  <div key={item._id} class="movie-card">

                    <div class="img-wrapper">
                      <img class="movie-thumbnail" src={item.thumbnailUrl} alt={movies.name}></img>
                    </div>

                    <div class="movie-information">

                      <h1 class="movie-name">Name: {item.name}</h1>
                      <p class="movie-releaseDate">Release date:{item.releaseDate}</p>
                      <p class="movie-budget">Budget :{item.budget}</p>
                      <p class="movie-collection">Collections :{item.collections}</p>


                      <p class="movie-language">{item.language}</p>

                      <div class="card-control">
                        <button class="delete" data-id={item._id} onClick={deleteMovie}>Delete</button>

                        <Link
                          to={{
                            pathname: '/update',
                            search: "?id=" + item._id

                          }}
                        ><button class="edit">Edit</button></Link>

                      </div>
                    </div>
                  </div>
                )
              })

            }
          </div>
        </Route>

        <Route exact path='/insert'>
          <Insert />
        </Route>

        <Route exact path='/update'>
          <Update />
        </Route>
      </Switch >
    </Router >



  );

}
export default App;
