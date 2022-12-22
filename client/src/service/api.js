import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const getPlayer = () => {
    return axios.get("/snake");
};

export const postPlayer = (name, score) => {
    return axios.post("/snake", name, score);
};