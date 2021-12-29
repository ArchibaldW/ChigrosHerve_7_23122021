<script>
const apiURL = "http://localhost:3000/api"
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
        checkForm : function(e){
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

                const postData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }

                fetch (apiURL+"/auth/signup/",{
                    headers: { 
                        "Content-Type": "application/json",
                    },
                    method : "post",
                    body: JSON.stringify(postData)
                })
                    .then(function(res) {
                        if (res.ok) {
                            return res.json();
                        } else {
                            return res.json().then(function(data){
                                throw new Error("Une erreur est arrivée : " + res.status + " - " + data.message); 
                            })
                        }
                    })
                    .then(function(value) {
                        console.log(value);
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }

            e.preventDefault();
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
        <form id="signupForm" @submit="checkForm" novalidate="true">
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