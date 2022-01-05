import config from "@/config";

import { requestOptions, handle } from '@/_helpers';

// import store from '@/store'

import router from '@/router'

export const postService = {
    getById,
    getAll,
    getAllByUserId,
    createPost,
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
    return fetch(config.apiURL+"/posts",requestOptions.get())
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

function createPost(post){
    return fetch (config.apiURL+"/posts/",requestOptions.post({post : post}))
        .then(function(res) {
            handle.response(res)
            if(res.ok){
                router.push('/liste-publications')
            }
        })
        .catch(function (error){
            handle.error(error)
        });
}