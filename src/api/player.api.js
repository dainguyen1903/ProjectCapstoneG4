import api from ".";
const baseURLPlayer ="api/player/"
export const playerApi = {
    getListPlayer:() => {
        return api.get(baseURLPlayer + "list-player")
    },
    getDetailPlayer:(id) => {
        return api.get(baseURLPlayer + `detail-player/${id}`)
    },
    createrPlayer:(data) => {
        return api.post(baseURLPlayer + "create-player",data)
    },
    updatePalyer:(id,data) => {
        return api.put(baseURLPlayer + `update-player/${id}`,data)
    },
    deletePlayer:(id) => {
        return api.delete(baseURLPlayer + `delete-player/${id}`)
    },
    searchPlayer:(params) => {
        return api.post(baseURLPlayer + "search-player",{
            params
        })
   
    }

}