import config from "@/config";
import { requestOptions, handle } from '@/_helpers';
import store from '@/store'
import router from '@/router'

// On défini de quelles fonctions ce service dispose
export const postService = {
    getAll,
    getById,
    getAllByUserId,
    getCountByUserId,
    createPost,
    deletePost,
    editPost
}

// Tape dans l'API pour retrouver toutes les publications
function getAll(){
    return fetch(config.apiURL+"/posts/",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour retrouver la publication avec l'id donné
function getById(id){
    return fetch(config.apiURL+"/posts/"+id,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour retrouver les publications avec l'userId donné
function getAllByUserId(userId){
    return fetch(config.apiURL+"/posts/user/"+userId,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour compter le nombre de publications avec l'userId donné
function getCountByUserId(userId){
    return fetch(config.apiURL+"/posts/user/"+userId+"/count/",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour créer une publication avec les données passées en paramètre
function createPost(post){
    return fetch (config.apiURL+"/posts/",requestOptions.post({post : post}))
        .then(function(res) {
            handle.response(res)
            if(res.ok){
                router.push('/')
            }
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour modifier la publication avec l'id donné avec les données passées en paramêtre
function editPost(id, post){
    return fetch (config.apiURL+"/posts/"+id, requestOptions.put({post : post}))
        .then(function(res) {
            handle.response(res)
            if(res.ok){
                router.push('/')
            }
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour supprimer la publication avec l'id donné et agir en fonction de depuis où cette suppression a eu lieu
function deletePost(where, post){
    console.log(where, post)
    return fetch (config.apiURL+"/posts/"+post.id,requestOptions.delete())
        .then(function(res) {
            handle.response(res)
            if(res.ok){
                if (where == "profil"){
                    store.dispatch("retrievePostsByUserId", post.userId)
                } else if (where == "posts") {
                    store.dispatch("retrievePostsList")
                } else {
                    router.push('/');
                }
            }
        })
        .catch(function (error){
            handle.error(error)
        });
}