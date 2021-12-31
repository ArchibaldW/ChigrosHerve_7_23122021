import Vue from 'vue'
import Vuex from 'vuex'
import { authenticationService, userService } from '@/_services'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentUser: authenticationService.currentUserValue,
		userFromId : null,
		userFromApi: null,
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
		retrieveUserById({state},id){
			userService.getById(id)
			.then(user => state.userFromId = user);
		},
        retrieveApiUser({state}){
            userService.getById(state.currentUser.userId)
                .then(user => state.userFromApi = user);
        },
		logout(){
			authenticationService.logout();
		}
	},
	modules: {
	}
})
