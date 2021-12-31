<template>
    <div id="app">
        <Nav
        :currentUser="currentUser"
        :userFromApi="userFromApi"
        />
        currentUser : {{ currentUser }}
        <br>
        <br>
        user : {{ userFromApi }}
    <router-view/>
    </div>
</template>

<script>
import router from "./router/index";
import Nav from "./components/Nav.vue"
import { authenticationService, userService } from '@/_services'

export default {
    name: 'app',
    components: {
		Nav
	},
    data(){
        return {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            local: JSON.stringify(localStorage),
        }
    },
    computed: {
    // currentUser: authenticationService.currentUserValue,
    },
    created() {
        if (this.currentUser){
            this.retrieveApiUser();
        }
    },
    mounted() {
        window.addEventListener('user-connected', () => {
            this.reRender();
            router.push('/profil')
        });
        window.addEventListener('user-disconnected', () => {
            this.reRender();
            router.push('/connexion')
        });
    },
    methods: {
        reRender(){
            this.currentUser = authenticationService.currentUserValue;
            if (this.currentUser){
                this.retrieveApiUser()
            } else {
                this.userFromApi = null;
            }
        },
        retrieveApiUser(){
                userService.getById(this.currentUser.userId)
                .then(user => this.userFromApi = user);
        }
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.flex{
    display: flex;
}
</style>
