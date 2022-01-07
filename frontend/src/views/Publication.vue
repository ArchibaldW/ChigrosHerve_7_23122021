<script>
import { mapState, mapActions } from "vuex"
import { convert } from '@/_helpers'
import { postService } from '@/_services'
import CommentTab from '@/components/CommentTab'

// Vue pour voir une publication avec ses commentaires
export default {
	name: "Publication",
    data() {
        return {
            date: null,
            post: null,
            where : 'delete'
        }
    },
    components: {
        CommentTab
	},
    props: ['id'],
    computed: {
		...mapState(['currentUser', 'userFromId', 'commentsCountFromPostId', 'commentsFromPostId']),
	},
    methods: {
        ...mapActions(['deletePost'])
    },
    // Avant de monter la vue, on charge les données de la publication, ainsi que de l'utilisateur associé, ses commentaires associés ainsi que leur nombre
    beforeMount(){
        postService.getById(this.id)
			.then(post => {
                this.post = post;
                this.date = convert.time(this.post.createdAt)
                this.$store.dispatch("retrieveUserById", this.post.userId)
            });
        
        this.$store.dispatch("retrieveCommentsByPostId", this.id);
        this.$store.dispatch("countCommentsByPostId", this.id);
    },
}
</script>

<template>
    <div>
        <div id="post" v-if="post && userFromId">
            <div v-if="currentUser.userId == post.userId || currentUser.admin">
                    <router-link  :to="{name: 'EditPublication', params : { id: id }}">Modifier</router-link>
                    <div @click="deletePost({where,post})">Supprimer</div>
            </div>
            <div>
                <h1 id="post__title">{{post.title}} par <router-link :to="{name: 'Profil', params : { id: userFromId.id }}">{{ userFromId.username }}</router-link></h1>
                <div id="post__date">{{ date }}</div>
                <div id="post__text">{{post.text}}</div>
                <div>
                    <CommentTab
                        status = 'add'
                        :postId = post.id
                        :userId = currentUser.userId
                    />
                    <h2> {{ commentsCountFromPostId }} Commentaire<span v-if="commentsCountFromPostId > 1">s</span> </h2>
                    <CommentTab
                        v-for="item in commentsFromPostId"
                        status='show'
                        :comment = item
                        :postId = post.id
                        :userId = currentUser.userId
                        :key="item.id"
                    />
                </div>
            </div>
        </div>
        <div v-else>
                <h1>Publication non trouvée</h1>
        </div>
    </div>
</template>

<style lang="scss">
#post {
    > :first-child{
        position: absolute;
        right: 30px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        > div{
            margin-top: 7px;
            cursor: pointer;
            text-decoration: underline;
        }
    }
    >:nth-child(2){
        width: 75%;
        margin: auto;
        position: relative;
        > :last-child{
            margin-bottom: 30px;
        }
    }
    &__title{
        margin-bottom: 10px;
        a{
            text-decoration: none;
        }
    }
    &__date{
        margin-bottom: 20px;
    }
    &__text{
        white-space: pre;
        border: 2px solid #4d4d4d;
        border-radius: 10px;
        padding: 20px;
        text-align: left;
        overflow-wrap: break-word;
        margin-bottom: 40px;
        font-size: 16px;
    }
}
</style>