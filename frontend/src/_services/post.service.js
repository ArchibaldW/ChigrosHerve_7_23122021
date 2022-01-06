import config from "@/config";

import { requestOptions, handle } from '@/_helpers';

import store from '@/store'

import router from '@/router'

export const postService = {
    getById,
    getAll,
    getAllByUserId,
    getCountByUserId,
    createPost,
    deletePost,
    editPost
}

function getById(id){
    return fetch(config.apiURL+"/posts/"+id,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

function getAll(){
    return fetch(config.apiURL+"/posts/",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

function getAllByUserId(userId){
    return fetch(config.apiURL+"/posts/user/"+userId,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

function getCountByUserId(userId){
    return fetch(config.apiURL+"/posts/user/"+userId+"/count/",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

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