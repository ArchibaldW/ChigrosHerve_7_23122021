<script>
import { authenticationService } from '@/_services'

export default {
	name: "Inscription",
    data() {
        return {
            errors: [],
            username: null,
            email: null,
            password: null,
            passwordConfirmation: null
        }
    },
    methods: {
        checkForm : function(){
            this.errors = [];
            if (!this.username){
                this.errors.push("Nom d'utilisateur requis");
            }

            if (!this.email){
                this.errors.push("Email requis");
            } 
            // else if (!this.validateEmail(this.email)) {
            //     this.errors.push("Votre email doit être valide")
            // }

            if (!this.password){
                this.errors.push("Mot de passe requis");
            } 
            // else if (!this.validatePassword(this.password)){
            //     this.errors.push("Votre mot de passe doit être valide")
            // }

            if (!this.passwordConfirmation){
                this.errors.push("Veuillez confirmer votre mot de passe");
            }

            if (!(this.passwordConfirmation == this.password)){
                this.errors.push("Les deux mots de passe doivent correspondre");
            }

            if (!this.errors.length){
                authenticationService.signup(this.username, this.email, this.password)
            }
        },
        validateEmail : function(email){
            let regex = /^[a-z]([.-]{0,1}[a-z0-9]+)*@[a-z0-9]([.-]{0,1}[a-z0-9]+)*\.[a-z0-9]{2,4}$/i;
            return regex.test(email);
        },
        validatePassword : function(password){
            let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[^ ]{10,64}$/;
            return regex.test(password)
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
                <label for="email">Email : </label>
                <input type="email" name="email" id="email" v-model="email" required>
            </p>
            <p>
                <label for="password">Mot de passe : </label>
                <input type="text" name="password" id="password" v-model="password" required>
            </p>
            <p>
                <label for="passwordConfirmation">Confirmer le mot de passe : </label>
                <input type="text" name="passwordConfirmation" id="passwordConfirmation" v-model="passwordConfirmation" required>
            </p>
            <p>
                <input type="submit" value="Subscribe!">
            </p>
        </form>
    </div>
</template>