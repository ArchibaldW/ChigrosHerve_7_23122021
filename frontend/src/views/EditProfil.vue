<script>
import { mapState, mapActions } from "vuex"
import { userService } from '@/_services'

// Vue pour éditer un profil
export default {
	name: "EditProfil",
    data() {
        return {
            errors: [],
            username: null,
            email: null,
            newPassword: null,
            oldPassword: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            admin: null
        }
    },
    props: ['id'],
    computed: {
		...mapState(['currentUser'])
	},
    methods: {
        ...mapActions(['deleteUser']),
        // A la soumission du formulaire, on teste les cas d'erreur
        // Si aucune erreur on modifie l'utilisateur en faisant appel au userService
        checkForm : function(){
            this.errors = [];
            if (!this.username){
                this.errors.push("Nom d'utilisateur requis");
            }

            if (!this.email){
                this.errors.push("Email requis");
            } 

            else if (!this.validateEmail(this.email)) {
                this.errors.push("L'email doit être valide")
            }

            if (this.newPassword) {
                if (!this.validatePassword(this.newPassword)){
                    this.errors.push("Le nouveau mot de passe doit être valide")
                }

                if (!this.oldPassword){
                    this.errors.push("Le mot de passe actuel est requis pour en définir un nouveau");
                }
            }

            if (this.phoneNumber){
                if (!this.validatePhoneNumber(this.phoneNumber)){
                    console.log("pouet");
                    this.errors.push("Le numéro de téléphone doit être valide")
                }
            }

            if (!this.errors.length){
                const userEdited = {
                    username: this.username,
                    email: this.email,
                    newPassword: this.newPassword,
                    oldPassword: this.oldPassword,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                    admin: this.admin
                }
                if (!userEdited.newPassword){
                    userEdited.oldPassword = null;
                }
                userService.editUser(this.id, userEdited);
            }
        },

        // Regex pour valider l'email
        // Détails dans /backend/middleware/check-email.js
        validateEmail : function(email){
            let regex = /^[a-z]([.-]{0,1}[a-z0-9]+)*@[a-z0-9]([.-]{0,1}[a-z0-9]+)*\.[a-z0-9]{2,4}$/i;
            return regex.test(email);
        },

        // Regex pour valider le mot de passe
        // Détails dans /backend/middleware/check-password.js
        validatePassword : function(password){
            let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[^ ]{10,64}$/;
            return regex.test(password);
        },

        // Regex pour valider le numero de téléphone
        validatePhoneNumber : function(phoneNumber){
            let regex = /^[0-9]{10}$/;
            return regex.test(phoneNumber)
        }
    },
    // Avant de monter la vue, on charge les données de l'utilisateur pour préremplir le formulaire
    beforeMount(){
        userService.getById(this.id)
			.then((user) => {
                this.username = user.username;
                this.email = user.email;
                this.firstName = user.firstName;
                this.lastName = user.lastName;
                this.phoneNumber = user.phoneNumber;
                this.admin = user.admin
            });
        
    }
}
</script>

<template>
    <div>
        <div v-if="username || username != null" id="edit-profil">
            <div>
                <div @click="deleteUser(id)">Supprimer {{ username }}</div>
            </div>
            <h1>Modifier le profil</h1>
            <form @submit.prevent="checkForm" novalidate="true">
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
                    <label for="newPassword">Nouveau mot de passe : </label>
                    <input type="password" name="newPassword" id="newPassword" v-model="newPassword">
                </p>
                <p v-if="newPassword">
                    <label for="oldPassword">Ancien mot de passe : </label>
                    <input type="password" name="oldPassword" id="oldPassword" v-model="oldPassword">
                </p>
                <p>
                    <label for="firstName">Prénom : </label>
                    <input type="text" name="firstName" id="firstName" v-model="firstName">
                </p>
                <p>
                    <label for="lastName">Nom : </label>
                    <input type="text" name="lastName" id="lastName" v-model="lastName">
                </p>
                <p>
                    <label for="phoneNumber">N° de Téléphone : </label>
                    <input type="text" name="phoneNumber" id="phoneNumber" v-model="phoneNumber">
                </p>
                <p v-if="currentUser.admin && !admin">
                    <label for="admin">Admin : </label>
                    <select name="admin" id="admin" v-model="admin">
                        <option value=true>Oui</option>
                        <option value=false>Non</option>
                    </select>
                </p>
                <p>
                    <input type="submit" value="Enregistrer les modifications">
                </p>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
#edit-profil{
    position: relative;
    > div:first-child{
        position: absolute;
        right: 30px;
        font-weight: bold;
        color: red;
        cursor: pointer;
    }
}
</style>