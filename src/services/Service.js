import axios from "axios";
import api from "@/config";
import { base } from "../config";

class Service {

    post(route, data) {
          return axios.post(api + route, data)
    }

    get(route) {
      return axios.get(api + route)
    }

    put(route, data) {
      return axios.put(api + route, data)
    }

    patch(route, data) {
      return axios.patch(api + route, data)
    }

    delete(route) {
      return axios.delete(route)
    }

}

export default Service 
