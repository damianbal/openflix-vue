import api from "../config";
import axios from "axios";

class AuthService {
  login(email, password) {
    return new Promise((resolve, reject) => {
      axios.post(api + "/sign-in", {
        email,
        password
      }).then(resp => {
        resolve(resp.data)
      }).catch(err => reject(err))
    })
  }

  register(email, password) {
    return new Promise((resolve, reject) => {
      axios.post(api + "/sign-up", {
        email,
        password
      }).then(resp => {
        resolve(resp.data)
      }).catch(err => reject(err))
    })
  }

  logout() {
    localStorage.removeItem("token");
  }

  async user() {
    return new Promise((resolve, reject) => {
      axios.get(api + "/user").then(resp => {
        resolve(resp.data)
      }).catch(err => reject(err))
    })
  }

  check() {
    return localStorage.getItem("token") != null;
  }
}

const authService = new AuthService();

export default authService;
