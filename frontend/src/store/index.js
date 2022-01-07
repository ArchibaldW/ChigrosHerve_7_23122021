import Vue from 'vue'
import Vuex from 'vuex'
import { authenticationService, userService, postService, commentService } from '@/_services'
import router from "@/router/index";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentUser: authenticationService.currentUserValue, // Quelques infos sur l'utilisateur connecté, dont son token
		userFromApi: null, // Les données via l'API de l'utilisateur connecté
		userFromId: null, // Un utilisateur avec un id donné
		userList: null, // Tous les utilisateurs

		postFromId: null, // Une publication avec un id donné
		postsList: null, // Toutes les publications
		postsFromUserId: null, // Toutes les publications relatives à un utilisateur
		postsCountFromUserId: 0, // Compte le nombre de publications relatives à un utilisateur

		commentsFromPostId: null, // Tous les commentaires relatifs à une publication
		commentsCountFromPostId : 0, // Compte le nombre de commentaires relatifs à une publication
	},
	actions: {
		// Action permettant de mettre à jour la navbar à la connexion et à la déconnexion
		reRenderNav({state, dispatch}){
            state.currentUser = authenticationService.currentUserValue;
            if (state.currentUser){
                dispatch("retrieveApiUser");
            } else {
                state.userFromApi = null;
            }
        },

		// ACTIONS UTILISATEURS
		// Action pour retrouver dans l'api toutes les données relatives à l'utilisateur connecté et mettre à jour userFromApi sur l'ensemble de l'application
        retrieveApiUser({state, dispatch}){
            userService.getById(state.currentUser.userId)
                .then(user => {
					if (user){
						state.userFromApi = user
					} else {
						dispatch("logout");
					}
					
				});
        },
		// Action pour retrouver dans l'api toutes les données relatives à l'utilisateur avec l'id concerné et mettre à jour userFromId sur l'ensemble de l'application
		retrieveUserById({state},id){
			userService.getById(id)
				.then(user => state.userFromId = user);
		},
		// Action pour retrouver dans l'api l'ensemble des utilisateurs et metre à jour userList sur l'ensemble de l'application
		retrieveUserList({state}){
			userService.getAll()
				.then(data => state.userList = data);
		},
		// Action pour supprimer un utilisateur si on est l'utilisateur concerné ou administrateur et agir en conséquence
		deleteUser({state, dispatch},id){
			if (!(state.currentUser.userId == id) && !state.currentUser.admin){
				router.push('/profil/' + state.userFromApi.id);
			} else {
				if(window.confirm("Voulez vous vraiment supprimer cet utilisateur")){
					userService.deleteUser(id)
						.then(() => {
							// Si l'utilisateur supprime lui même son compte, déconnexion, sinon, retour à la liste des utilisateurs
							if (state.userFromApi.id == id){
								dispatch("logout");
							} else if (state.userFromApi.admin) {
								router.push('/liste-utilisateurs/');
							}
						})
				}
			}
		},

		// ACTIONS PUBLICATIONS
		// Action pour retrouver dans l'api toutes les données relatives à la publication avec l'id concerné et mettre à jour postFromId sur l'ensemble de l'application
		retrievePostById({state}, id){
			postService.getById(id)
				.then(post => state.postFromId = post);
		},
		// Action pour retrouver dans l'api l'ensemble des publications et metre à jour postsList sur l'ensemble de l'application
		retrievePostsList({state}){
			postService.getAll()
				.then(data => state.postsList = data);
		},
		// Action pour retrouver dans l'api toutes les données relatives aux publications avec l'userId concerné et mettre à jour postsFromUserId sur l'ensemble de l'application
		retrievePostsByUserId({state}, userId){
			postService.getAllByUserId(userId)
				.then(data => state.postsFromUserId = data);
		},
		// Action pour compter dans l'api le nombre de publications avec l'userId concerné et mettre à jour postsCountFromUserId sur l'ensemble de l'application
		countPostsByUserId({state},userId){
			postService.getCountByUserId(userId)
				.then(count => state.postsCountFromUserId = count);
		},
		// Action pour supprimer une publication si on est l'utilisateur à l'origine de cette dernière ou administrateur et agir en conséquence
		deletePost({state}, payload){
			if (!(state.userFromApi.id == payload.post.userId) && !state.userFromApi.admin){
				router.push('/');
			} else {
				if(window.confirm("Voulez vous vraiment supprimer cet article")){
					postService.deletePost(payload.where, payload.post)
				}
			}
		},

		// ACTIONS COMMENTAIRES
		// Action pour retrouver dans l'api toutes les données relatives aux commentaires avec le postId concerné et mettre à jour commentsFromPostId sur l'ensemble de l'application
		retrieveCommentsByPostId({state},postId){
			commentService.getAllByPostId(postId)
				.then(data => state.commentsFromPostId = data)
		},
		// Action pour compter dans l'api le nombre de commentaires avec le postId concerné et mettre à jour commentsCountFromPostId sur l'ensemble de l'application
		countCommentsByPostId({state},postId){
			commentService.getCountByPostId(postId)
				.then(count => state.commentsCountFromPostId = count);
		},

		// Action qui permet de se déconnecter
		logout(){
			authenticationService.logout();
		},
	},
})
