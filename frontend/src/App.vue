<template>
    <div id="app">
        <Nav/>
    <router-view :key="$route.fullPath" />
    </div>
</template>

<script>
import router from "./router/index";
import Nav from "./components/Nav.vue"
import { mapState } from "vuex"

export default {
    name: 'app',
    components: {
		Nav
	},
    computed:{
		...mapState(['currentUser'])
	},
    created() {
        if (this.currentUser){
            this.$store.dispatch("retrieveApiUser");
        }
    },
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
    watch: {
        $route(to, from) { 
            if(to.name == from.name){
                location.reload();
            } 
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

input, textarea{
    padding: 10px;
    border: 1px solid #b3b2b2;
    border-radius: 10px;
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

.flex{
    display: flex;
}
</style>
