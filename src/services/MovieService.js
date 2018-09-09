import axios from "axios";
import api from "@/config";
import Service from "@/services/Service";
import { resolve } from "path";

class MovieService extends Service {
  async getMovie(id) {
    return new Promise((resolve, reject) => {
      this.get('/movie/' + id).then(resp => {
        resolve(resp.data.data)
      }).catch(err => reject(err))
    })
  }

  async getLikedMovies() {
    return new Promise((resolve, reject) => {
      this.get('/user/likes').then(resp => {
        resolve(resp.data)
      })
    })
  }

  async getPopularMovies() {
    return new Promise((resolve, reject) => {
      this.get('/movies/popular').then(resp => {
        resolve(resp.data)
      })
    })
  }

  async getMovies({page = 1, genre = null}) {

    if(genre == 0) {
      genre = null
    }

    let gs = genre != null ? "&genre=" + genre : ""

    console.log('gs', gs)

    return new Promise((resolve, reject) => {
      this.get('/movies?page=' + page + gs).then(resp => {
        resolve(resp.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  async getGenres() {
    return new Promise((resolve, reject) => {
      this.get('/genres').then(resp => {
        resolve(resp.data)
      }).catch(err => reject(err))
    })
  }
}

const movieService = new MovieService();

export default movieService;
