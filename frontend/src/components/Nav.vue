<script>
import { authenticationService} from '@/_services'

export default {
	name: 'Nav',
	props: {
        currentUser: {
            type: Object,
        }, 
        userFromApi: {
            type: Object,
        }
    },
    methods: {
        logout() {
            authenticationService.logout();
        }
    }
}
</script>

<template>
	<div id="nav">
        <router-link v-if="!userFromApi" to="/connexion"><img id="nav__disc-image"  src="../assets/icon-left-font-monochrome-white.png"></router-link>
        <div class="flex" v-else id="nav__main">
            <div id="nav__main__menu">
                <a>lien</a>
            </div>
            <div id="nav__main__user">
                <div class="flex">
                    <router-link to="/profil">{{ userFromApi.username }}</router-link>
                    <img id="nav__main__user__img" v-if="userFromApi.avatar" :src="userFromApi.avatar">
                    <img id="nav__main__user__img" v-else src="../assets/icon.png">
                </div>
                <div @click="logout()">Déconnexion</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#nav {
    padding: 20px;
    height: 100px;
    background-color: #2c3e50;
    color : white;
    &__disc-image{
        max-width: 50%;
        max-height: 100%;
    }
    &__main{
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
        &__menu{
        }
        &__user{
            position: absolute;
            right: 0;               
            padding: 10px;
            > div {
                &:first-child{
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
            }
            &__img{
                width: 20px;
                height: 20px;
            }
        }
    }
    a {
        font-weight: bold;
        color: white;

        &.router-link-exact-active {
          color: #42b983;
        }
    }
}
</style>