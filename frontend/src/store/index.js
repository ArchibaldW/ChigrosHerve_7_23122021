import Vue from 'vue'
import Vuex from 'vuex'
import { authenticationService, userService, postService } from '@/_services'
import router from "@/router/index";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentUser: authenticationService.currentUserValue,
		userFromId: null,
		userFromApi: null,
		postFromId: null,
		postsFromUserId: null,
		userList: null
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
		retrievePostById(){

		},
		retrievePostList(){

		},
		retrievePostsByUserId({state}, userId){
			postService.getAllByUserId(userId)
			.then(data => state.postsFromUserId = data);
		},
		retrieveCommentsByPostId(){

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
		deletePost(){

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
