import axios from "axios";

export const createUser = (username, fullName, password) => {
    const requestData = {
        username: username,
        full_name: fullName,
        password: password
    }
    return axios.post("/api/create-user", requestData)
}

export const sendLogin = (username, password) => {
    const requestData = {
        username: username,
        password: password
    }
    return axios.post("/api/login", requestData);
}

export const fetchUserCommunities = (sessionObject) => {
    return axios.post("/api/communities", sessionObject)
}

export const fetchPostsByCommunity = (communityID, sessionObject) => {
    return axios.post(`/api/communities/${communityID}/posts`, sessionObject)
}