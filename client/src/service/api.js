import axios from "axios";

axios.defaults.baseURL = "https://snake-api.onrender.com";

const getPlayer = () => {
    return axios.get("/snake");
};

const postPlayer = (name, score) => {
    return axios.post("/snake", name, score);
};

export { getPlayer, postPlayer };