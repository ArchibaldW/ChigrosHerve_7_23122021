import config from "@/config";
import { requestOptions, handle } from '@/_helpers';

// On défini de quelles fonctions ce service dispose
export const commentService = {
    getById,
    getAllByPostId,
    getCountByPostId,
    createComment,
    editComment,
    deleteComment
}

// Tape dans l'API pour retrouver le commentaire avec l'id donné
function getById(id){
    return fetch(config.apiURL+"/comments/"+id,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour retrouver les commentaires avec le postId donné
function getAllByPostId(postId){
    return fetch(config.apiURL+"/comments/post/"+postId,requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour compter le nombre de commentaires avec le postId donné
function getCountByPostId(postId){
    return fetch(config.apiURL+"/comments/post/"+postId+"/count/",requestOptions.get())
        .then(function(res) {
            return handle.response(res);
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour créer un commentaire avec les données passées en paramètre
function createComment(comment){
    return fetch (config.apiURL+"/comments/", requestOptions.post({comment : comment}))
        .then(function(res) {
            handle.response(res)
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour modifier le commentaire avec l'id donné avec les données passées en paramêtre
function editComment(id, comment){
    return fetch (config.apiURL+"/comments/"+id, requestOptions.put({comment : comment}))
        .then(function(res) {
            handle.response(res)
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour supprimer le commentaire avec l'id donné
function deleteComment(id){
    return fetch (config.apiURL+"/comments/"+id,requestOptions.delete())
        .then(function(res) {
            handle.response(res)
        })
        .catch(function (error){
            handle.error(error)
        });
}