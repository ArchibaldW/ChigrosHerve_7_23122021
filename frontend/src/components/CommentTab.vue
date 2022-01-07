<script>
import { mapState } from "vuex"
import { convert } from '@/_helpers';
import { userService, commentService } from '@/_services'
import router from "@/router/index";


// Composant pour rendre chaque commentaire
// Change de manière dynamique en fonction de son status (add, edit, show)
export default ({
    name: 'CommentTab',
    data() {
        return {
            errors: [],
            text: null,
            commentStatus: null,
            username: null,
            createdDate: null,
        }
    },
    props: ['comment', 'status', 'postId', "userId"],
    computed: {
        ...mapState(['currentUser']),
        textLength: function(){
            if (this.text){
                return this.text.length;
            } else {
                return 0;
            }
        }
    },
    methods: {
        // A la soumission du formulaire d'ajout ou d'édition, on check les errurs potentielles
        // Puis soit on créé un nouveau commentaire et on remet à jour la page
        // Soit on modifie un commentaire et on remet à jour la page
        checkForm : function(){
            this.errors = [];
            if (!this.text){
                this.errors.push("Texte requis");
            } else if (this.textLength > 250){
                this.errors.push("Votre texte doit faire 250 caractères ou moins");
            }

            if (!this.errors.length){
                if (this.commentStatus == "add")
                {
                    commentService.createComment({
                        text : this.text,
                        postId : this.postId,
                        userId : this.userId
                    })
                        .then(() => {
                            this.text = null;
                            this.$store.dispatch("retrieveCommentsByPostId", this.postId);
                            this.$store.dispatch("countCommentsByPostId", this.postId);
                        })
                }

                if (this.commentStatus == "edit")
                {
                    commentService.editComment(this.comment.id, {
                        text : this.text,
                    })
                        .then(() => {
                            this.text = null;
                            this.commentStatus = "show";
                            this.$store.dispatch("retrieveCommentsByPostId", this.postId);
                            this.$store.dispatch("countCommentsByPostId", this.postId);
                        })
                }
            }
        },
        // Au click sur le bouton 'Modifier', on change le status du bloc de commentaire pour que ça devienne un formulaire d'édition
        editComment: function(){
            // On vérifie d'abord si l'utilisateur qui tente de modifier est bien à l'origine du commentaire
            if (!(this.currentUser.userId == this.comment.userId)){
				router.push('/');
			} else {
                this.commentStatus = "edit"
                this.text = this.comment.text
            }
        },
        // Au clic sur le bouton 'Supprimer', on lance le processus de suppression avec une pop-up de confirmation
        deleteComment: function(id){
            // On vérifie d'abord si l'utilisateur qui tente de supprime est bien à l'origine du commentaire ou administrateur
            if (this.currentUser.userId == this.comment.userId && !this.currentUser.admin){
				router.push('/');
			} else {
                if (window.confirm("Voulez vous vraiment supprimer ce commentaire")){
                    commentService.deleteComment(id)
                        .then(() => {
                            location.reload();
                        })
                }
            }
        }
    },
    // Avant que le component soit monté, on récupère quelques informations utiles au bon affichage des commentaires
    beforeMount(){
        this.commentStatus = this.status
        if (this.commentStatus == "show"){
            this.createdDate = convert.time(this.comment.createdAt)
            userService.getUsernameById(this.comment.userId)
                .then((username) => {
                    this.username = username.username;
                })
        }
    }
})
</script>

<template>
    <div>

        <!-- Section d'ajout de commentaire -->
        <div id="add__comment__form" v-if="commentStatus == 'add'">
            <h2>Ajouter un commentaire</h2>
            <form id="comment__form" class="flex" @submit.prevent="checkForm" novalidate="true">
                <p v-if="errors.length">
                    <b>Veuillez corriger les erreurs suivantes : </b>
                    <ul>
                        <li v-for="error in errors" :key="error.id">{{ error }}</li>
                    </ul>
                </p>
                <div class="flex">
                    <label for="text">Texte : </label>
                    <textarea name="text" id="text" maxlength="250" v-model="text" required></textarea>
                    <span>{{ textLength }}/250</span>
                </div>
                <p>
                    <input type="submit" value="Commenter">
                </p>
            </form>
        </div>

        <!-- Section d'édition de commentaire -->
        <div v-else-if="commentStatus == 'edit'">
            <form id="comment__form" class="flex" @submit.prevent="checkForm" novalidate="true">
                <p v-if="errors.length">
                    <b>Veuillez corriger les erreurs suivantes : </b>
                    <ul>
                        <li v-for="error in errors" :key="error.id">{{ error }}</li>
                    </ul>
                </p>
                <div class="flex">
                    <label for="text">Texte : </label>
                    <textarea name="text" id="text" maxlength="250" v-model="text" required></textarea>
                    <span>{{ textLength }}/250</span>
                </div>
                <p>
                    <input type="submit" value="Modifier">
                </p>
            </form>
        </div>

        <!-- Section de commentaire -->
        <div id="show__comment" v-else>
            <div>Par <router-link :to="{name: 'Profil', params : { id: userId }}">{{username}}</router-link> le {{createdDate}} :</div>
            <div>{{comment.text}}</div>
            <div id="show__comment__actions" class="flex" v-if="currentUser.userId == comment.userId || currentUser.admin">
                <div v-if="currentUser.userId == comment.userId" @click="editComment"><font-awesome-icon icon="edit" /> Modifier</div>
                <div @click="deleteComment(comment.id)"><font-awesome-icon icon="trash-alt" /> Supprimer</div>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
#add__comment__form h2{
    text-align: left;
}

// Le formulaire d'ajout et d'edition partagent le même css
#comment__form{
    white-space: pre;
    border: 2px solid #4d4d4d;
    border-radius: 10px;
    padding: 20px;
    text-align: left;
    flex-direction: column;
    margin-bottom: 5px;
    > div:first-of-type{
        margin-top: 0;
        position: relative;
        flex-direction: column;
        > textarea {
            min-height: 50px;
        }
        > span {
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 10px;
        }
    }
    > :last-child{
        margin-bottom: 0;
    }
}

#show__comment{
    white-space: pre;
    border: 2px solid #4d4d4d;
    border-radius: 10px;
    margin-bottom: 5px;
    > div {
        padding: 10px;
        margin: 10px;
        &:first-child{
            text-align: left;
            font-weight: bold;
            a{
                text-decoration: none;
            }
        }
        &:nth-child(2){
            border: 2px solid #4d4d4d;
            border-radius: 10px;
            text-align: left;
        }
        
    }
    &__actions{
        justify-content: space-between;
        font-weight: bold;
        cursor: pointer;
        text-align: right;
    }
}
</style>