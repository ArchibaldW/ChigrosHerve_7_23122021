import config from "@/config";

import { requestOptions, handle } from '@/_helpers';

// import store from '@/store'

// import router from '@/router'

export const commentService = {
    getById,
    getAllByPostId,
    getCountByPostId,
    createComment,
    editComment,
    deletePost
}

function getById(id){
    return fetch(config.apiURL+"/comments/"+id,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

function getAllByPostId(postId){
    return fetch(config.apiURL+"/comments/post/"+postId,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

function getCountByPostId(postId){
    return fetch(config.apiURL+"/comments/post/"+postId+"/count/",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

function createComment(comment){
    return fetch (config.apiURL+"/comments/",requestOptions.post({comment : comment}))
        .then(function(res) {
            handle.response(res)
        })
        .catch(function (error){
            handle.error(error)
        });
}

function editComment(id, comment){
    return fetch (config.apiURL+"/comments/"+id, requestOptions.put({comment : comment}))
        .then(function(res) {
            handle.response(res)
        })
        .catch(function (error){
            handle.error(error)
        });
}

function deletePost(id){
    return fetch (config.apiURL+"/comments/"+id,requestOptions.delete())
        .then(function(res) {
            handle.response(res)
        })
        .catch(function (error){
            handle.error(error)
        });
}