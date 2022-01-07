<script>
import { mapState } from "vuex"
import { postService } from '@/_services'

// Vue pour ajouter une publication
export default {
	name: "AddPublication",
    data() {
        return {
            errors: [],
            title: null,
            text: null,
        }
    },
    computed: {
		...mapState(['currentUser']),
        // On veut la longueur du texte en temps réel
        textLength: function(){
            if (this.text){
                return this.text.length;
            } else {
                return 0;
            }
        }
	},
    methods: {
        // A la soumission du formulaire, on teste les cas d'erreur
        // Si aucune erreur on créé la publication en faisant appel au postService
        checkForm : function(){
            this.errors = [];
            if (!this.title){
                this.errors.push("Titre requis");
            }
            if (!this.text){
                this.errors.push("Texte requis");
            } else if (this.textLength > 1000){
                this.errors.push("Votre texte doit faire 1000 caractères ou moins");
            }

            if (!this.errors.length){
                postService.createPost({
                    title : this.title, 
                    text : this.text,
                    userId : this.currentUser.userId
                });
            }
        }
    }
    
}
</script>

<template>
    <div>
        <h1>Ajouter une publication</h1>
        <form id="add__post__form" class="flex" @submit.prevent="checkForm" novalidate="true">
            <p v-if="errors.length">
                <b>Veuillez corriger les erreurs suivantes : </b>
                <ul>
                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                </ul>
            </p>
            <div class="flex">
                <label for="title">Titre : </label>
                <input type="text" maxlength="25" name="title" id="title" v-model="title" required>
            </div>
            <div class="flex">
                <label for="text">Texte : </label>
                <textarea name="text" id="text" maxlength="1000" v-model="text" required></textarea>
                <span>{{ textLength }}/1000</span>
            </div>
            <p>
                <input type="submit" value="Publier">
            </p>
        </form>
    </div>
</template>

<style lang="scss">
#add__post__form{
    flex-direction: column;
    align-items: center;
    > div{
        flex-direction: column;
        min-width: 75%;
        &:first-of-type{
            margin-bottom: 30px;
        }
        &:nth-of-type(2){
            margin-top: 0;
            position: relative;
            > textarea {
                min-height: 150px;
            }
            > span {
                position: absolute;
                bottom: 10px;
                right: 10px;
                font-size: 10px;
            }
        }
        > label {
            align-self: flex-start;
            margin-bottom: 10px;
        }
    }
}
</style>