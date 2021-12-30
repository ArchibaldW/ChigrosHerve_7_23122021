import config from "@/config";

export const userService = {
    getById
}

function getById(id){
    return fetch(config.apiURL+"/users/"+id,{
        headers: {
            "Content-Type": "application/json",
        },
        method : "get",
    })
}