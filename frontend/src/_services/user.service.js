import config from "@/config";
import { requestOptions, handle } from '@/_helpers';
import store from '@/store'
import router from '@/router'

// On défini de quelles fonctions ce service dispose
export const userService = {
    getAll,
    getById,
    getUsernameById,
    editUser,
    deleteUser,
}

// Tape dans l'API pour retrouver tous les utilisateurs
function getAll(){
    return fetch (config.apiURL+"/users/",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour retrouver l'utilisaeur avec l'id donné
function getById(id){
    return fetch(config.apiURL+"/users/"+id,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour retrouver le nom de l'utilisateur avec l'id donné
function getUsernameById(id){
    return fetch(config.apiURL+"/users/"+id+"/username",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour modifier l'utilisateur avec l'id donné avec les données passées en paramêtre
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

// Tape dans l'API pour supprimer l'utilisateur avec l'id donné
function deleteUser(id){
    return fetch (config.apiURL+"/users/"+id, requestOptions.delete())
        .then(function(res) {
            handle.response(res)
        })
        .catch(function (error){
            handle.error(error)
        });
}