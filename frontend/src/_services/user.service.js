import config from "@/config";

import { requestOptions, handle } from '@/_helpers';

import store from '@/store'

import router from '@/router'

export const userService = {
    getById,
    getAll,
    editUser,
    deleteUser,
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

function editUser(id, user){
    return fetch (config.apiURL+"/users/"+id, requestOptions.put({user : user}))
        .then(function(res) {
            handle.response(res)
            store.dispatch("retrieveApiUser", id);
            if(res.ok){
                router.push('/profil/'+id)
            }
        })
        .catch(function (error){
            handle.error(error)
        });
}

function deleteUser(id){
    return fetch (config.apiURL+"/users/"+id, requestOptions.delete())
        .then(function(res) {
            handle.response(res)
        })
        .catch(function (error){
            handle.error(error)
        });
}