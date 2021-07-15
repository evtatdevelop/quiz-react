import axios from "axios";

export default axios.create({
  baseURL: 'https://react-tests-48ee5-default-rtdb.firebaseio.com'
})