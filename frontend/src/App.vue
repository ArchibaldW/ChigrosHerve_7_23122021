<script>
import router from "./router/index";
import Nav from "./components/Nav.vue"
import { mapState } from "vuex"

// Définition de l'application
export default {
    name: 'app',
    components: {
		Nav
	},
    computed:{
		...mapState(['currentUser'])
	},
    // Si on est connecté on récupère les données de l'utilisateurs connecté via l'API à la création de l'application
    created() {
        if (this.currentUser){
            this.$store.dispatch("retrieveApiUser");
        }
    },
    // Une fois la page montée en ajoute des écouteurs d'évenèement pour mettre à jour et rediriger après une connexion/deconnexion
    mounted() {
        window.addEventListener('user-connected', () => {
            this.$store.dispatch("reRenderNav");
            router.push('/')
        });
        window.addEventListener('user-disconnected', () => {
            this.$store.dispatch("reRenderNav");
            router.push('/connexion')
        });
    },
    // On regarde la route pour recharger la page si jamais on tente de naviguer d'un profil ou d'une publication à l'autre
    // (Ca posait problème sans cette règle, je n'ai pas compris pourquoi)
    watch: {
        $route(to, from) { 
            if(to.name == from.name){
                location.reload();
            } 
        } 
    }
}
</script>

<template>
    <div id="app">
        <Nav/>
        <!-- On met à jour nos vues dès que la route change-->
        <router-view :key="$route.fullPath" />
    </div>
</template>

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

input, textarea{
    padding: 10px;
    border: 2px solid #4d4d4d;
    border-radius: 10px;
}

textarea{
    resize: none;
}

input[type="submit"], button{
    color : white;
    background-color: #2c3e50;
    padding: 15px;
    border-radius: 10px;
    border: none;
    font-weight: bold;
    box-shadow : 3px 3px 3px #e2dfdf;
}

a {
    color: #2c3e50;
}

.flex{
    display: flex;
}
</style>
