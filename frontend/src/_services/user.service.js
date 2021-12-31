import config from "@/config";

import { requestOptions, handle } from '@/_helpers';

export const userService = {
    getById,
    getAll
}

function getById(id){
    return fetch(config.apiURL+"/users/"+id,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

function getAll(){
    return fetch (config.apiURL+"/users/",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}