import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const getPlayer = () => {
    return axios.get("/snake");
};

const postPlayer = (name, score) => {
    return axios.post("/snake", name, score);
};

export { getPlayer, postPlayer };