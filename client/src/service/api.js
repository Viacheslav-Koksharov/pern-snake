import axios from "axios";

// axios.defaults.baseURL = "https://pern-snake-api.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL=process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/snake"
      : "https://pern-snake-api.herokuapp.com/snake"

const getPlayer = () => {
    return axios.get("/");
};

const postPlayer = (name, score) => {
    return axios.post("/", name, score);
};

export { getPlayer, postPlayer };