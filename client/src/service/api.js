import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://pern-snake-api.herokuapp.com";
const getPlayer = () => {
    return axios.get("/snake");
};

const postPlayer = (name, score) => {
    return axios.post("/snake", name, score);
};

export { getPlayer, postPlayer };