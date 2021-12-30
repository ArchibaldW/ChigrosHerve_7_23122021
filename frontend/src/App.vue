<template>
    <div id="app">
        <div id="nav">
            {{ local }}
            <div id="nav__main">
            </div>
            <div id="nav__user">
                <router-link to="/inscription">Inscription</router-link> |
                <router-link to="/connexion">Connexion</router-link>
            </div>
            <div id="nav__user">
                <router-link to="/profil">Profil</router-link> |
                <div @click="logout()">Déconnexion</div>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
import router from "./router/index";
import config from "./config";
import { authenticationService } from '@/_services'

export default {
    name: 'app',
    data(){
        return {
            local: JSON.stringify(localStorage)
        }
    },
    mounted() {
        window.addEventListener('user-connected', function(){
            console.log(config);
            router.push('/profil')
        });
    },
    methods: {
        logout() {
            authenticationService.logout();
            router.push('/connexion')
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

#nav {
    padding: 30px;
    background-color: #2c3e50;
    color : white;

    a {
        font-weight: bold;
        color: white;

        &.router-link-exact-active {
          color: #42b983;
        }
    }
}
</style>
