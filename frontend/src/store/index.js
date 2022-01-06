import Vue from 'vue'
import Vuex from 'vuex'
import { authenticationService, userService, postService, commentService } from '@/_services'
import router from "@/router/index";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentUser: authenticationService.currentUserValue,
		userFromApi: null,
		userFromId: null,
		userList: null,
		postFromId: null,
		postsFromUserId: null,
		postsCountFromUserId: 0,
		commentsFromPostId: null,
		commentsCountFromPostId : 0,
		postsList: null,
	},
	getters:{
	},
	mutations: {
	},
	actions: {
		reRenderNav({state, dispatch}){
            state.currentUser = authenticationService.currentUserValue;
            if (state.currentUser){
                dispatch("retrieveApiUser");
            } else {
                state.userFromApi = null;
            }
        },


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
		retrieveUserById({state},id){
			userService.getById(id)
				.then(user => state.userFromId = user);
		},
		retrieveUserList({state}){
			userService.getAll()
				.then(data => state.userList = data);
		},
		deleteUser({state, dispatch},id){
			if (!state.userFromApi.id == id && !state.userFromApi.admin){
				router.push('/profil/' + state.userFromApi.id);
			} else {
				if(window.confirm("Voulez vous vraiment supprimer cet utilisateur")){
					userService.deleteUser(id)
					if (state.userFromApi.id == id){
						dispatch("logout");
					} else if (state.userFromApi.admin) {
						router.push('/liste-utilisateurs/');
					}
				}
			}
		},

		retrievePostById({state}, id){
			postService.getById(id)
				.then(post => state.postFromId = post);
		},
		retrievePostsList({state}){
			postService.getAll()
				.then(data => state.postsList = data);
		},
		retrievePostsByUserId({state}, userId){
			postService.getAllByUserId(userId)
				.then(data => state.postsFromUserId = data);
		},
		countPostsByUserId({state},userId){
			postService.getCountByUserId(userId)
				.then(count => state.postsCountFromUserId = count);
		},
		deletePost({state}, payload){
			if (!state.userFromApi.id == payload.post.userId && !state.userFromApi.admin){
				router.push('/');
			} else {
				if(window.confirm("Voulez vous vraiment supprimer cet article")){
					postService.deletePost(payload.where, payload.post)
				}
			}
		},



		retrieveCommentsByPostId({state},postId){
			commentService.getAllByPostId(postId)
				.then(data => state.commentsFromPostId = data)
		},
		countCommentsByPostId({state},postId){
			commentService.getCountByPostId(postId)
				.then(count => state.commentsCountFromPostId = count);
		},
		deleteComment(){

		},


		logout(){
			authenticationService.logout();
		},
	},
	modules: {
	}
})
