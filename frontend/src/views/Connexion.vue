<script>
import { authenticationService } from '@/_services'

// Vue pour se connecter
export default {
	name: "Connexion",
    data() {
        return {
            errors: [],
            username: null,
            password: null,
        }
    },
    methods: {
        // A la soumission du formulaire, on teste les cas d'erreur
        // Si aucune erreur on connecte l'utilisateur en faisant appel à l'authenticationService
        checkForm : function(){
            this.errors = [];
            if (!this.username){
                this.errors.push("Nom d'utilisateur requis");
            }

            if (!this.password){
                this.errors.push("Mot de passe requis");
            } 

            if (!this.errors.length){
                authenticationService.login(this.username,this.password);
            }
        }
    }
}
</script>

<template>
    <div>
        <h1>Connexion</h1>
        <form id="signupForm" @submit.prevent="checkForm" novalidate="true">
            <p v-if="errors.length">
                <b>Veuillez corriger les erreurs suivantes : </b>
                <ul>
                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                </ul>
            </p>
            <p>
                <label for="username">Nom d'utilisateur : </label>
                <input type="text" name="username" id="username" v-model="username" required>
            </p>
            <p>
                <label for="password">Mot de passe : </label>
                <input type="password" name="password" id="password" v-model="password" required>
            </p>
            <p>
                <input type="submit" value="Se connecter">
            </p>
        </form>
    </div>
</template>