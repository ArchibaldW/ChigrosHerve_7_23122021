<script>
const apiURL = "http://localhost:3000/api"
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
    methods: {
        checkForm : function(e){
            this.errors = [];
            if (!this.username){
                this.errors.push("Nom d'utilisateur requis");
            }

            if (!this.password){
                this.errors.push("Mot de passe requis");
            } 

            if (!this.errors.length){

                const postData = {
                    username: this.username,
                    password: this.password,
                }

                fetch (apiURL+"/auth/login/",{
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
                        localStorage.setItem('user',value.token);
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }

            e.preventDefault();
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
                <label for="password">Mot de passe : </label>
                <input type="text" name="password" id="password" v-model="password" required>
            </p>
            <p>
                <input type="submit" value="Subscribe!">
            </p>
        </form>
    </div>
</template>