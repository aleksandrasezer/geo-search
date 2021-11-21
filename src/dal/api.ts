import axios from "axios";

export const geoSearchAPI = {
    getGeo(text: string) {
        return axios.get(`http://localhost:3000/locations?q=${text}`)
            .then(res => res.data)
            .catch(() => {return('error')})
    }
}

//types
export type LocationRespType = {
    geonameid: string
    name: string
    latitude: string
    longitude: string
}