<script>
import { mapState, mapActions } from "vuex"
import { postService } from '@/_services'

// Vue pour éditer une publication
export default {
	name: "EditPublication",
    data() {
        return {
            errors: [],
            title: null,
            text: null,
            post: null,
            where : 'edit'
        }
    },
    props: ['id'],
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
        ...mapActions(['deletePost']),
        // A la soumission du formulaire, on teste les cas d'erreur
        // Si aucune erreur on modifie la publication en faisant appel au postService en prenant en compte l'id du dernier éditeur
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
                postService.editPost(this.id, {
                    title : this.title, 
                    text : this.text,
                    lastEditUserId : this.currentUser.userId
                });
            }
        }
    },
    // Avant de monter la vue, on charge les données de la publication pour préremplir le formulaire
    beforeMount(){
        postService.getById(this.id)
			.then((post) => {
                this.post = post;
                this.title = post.title;
                this.text = post.text;
            });
    }
    
}
</script>

<template>
    <div id="edit__post">
        <div @click="deletePost({where, post})"><font-awesome-icon icon="trash-alt" /> Supprimer</div>
        <h1>Modifier une publication</h1>
        <form id="edit__post__form" class="flex" @submit.prevent="checkForm" novalidate="true">
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
                <input type="submit" value="Modifier">
            </p>
        </form>
    </div>
</template>

<style lang="scss">
#edit__post{
    position: relative;
    > div:first-child{
        position: absolute;
        right: 30px;
        font-weight: bold;
        color: red;
        cursor: pointer;
    }
    &__form{
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
}
</style>