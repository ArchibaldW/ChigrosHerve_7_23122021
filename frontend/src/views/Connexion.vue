<script>
// import { mapState } from 'vuex'
import { authenticationService } from '@/_services'

export default {
	name: "Connexion",
    data() {
        return {
            errors: [],
            username: null,
            email: null,
            password: null,
            passwordConfirmation: null
        }
    },
    computed:{
	},
    methods: {
        checkForm : function(){
            this.errors = [];
            if (!this.username){
                this.errors.push("Nom d'utilisateur requis");
            }

            if (!this.password){
                this.errors.push("Mot de passe requis");
            } 

            if (!this.errors.length){
                authenticationService.login(this.username,this.password)
                    .then(function(value){
                        console.log(value);
                    })
            }
        }
    }
}
</script>

<template>
    <div>
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
                <input type="text" name="password" id="password" v-model="password" required>
            </p>
            <p>
                <input type="submit" value="Subscribe!">
            </p>
        </form>
    </div>
</template>