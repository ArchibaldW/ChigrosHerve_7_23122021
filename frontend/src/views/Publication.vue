<script>
import { mapState, mapActions } from "vuex"
import { convert } from '@/_helpers';
import { postService } from '@/_services'

export default {
	name: "Publication",
    data() {
        return {
            date: null,
            post: null,
            where : 'delete'
        }
    },
    props: ['id'],
    computed: {
		...mapState(['currentUser', 'userFromId', 'commentsCountFromPostId', 'commentsFromPostId']),
	},
    methods: {
        ...mapActions(['deletePost'])
    },
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
            </div>
            <div>
                {{ commentsCountFromPostId }}
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
        > a {
            color: #42b983;
        }
        > div{
            margin-top: 7px;
            color: red;
            cursor: pointer;
        }
    }
    >:nth-child(2){
        width: 75%;
        margin: auto;
        position: relative;
    }
    &__title{
        margin-bottom: 10px;
        a{
            color: #2c3e50;
            text-decoration: none;
        }
    }
    &__date{
        margin-bottom: 20px;
    }
    &__text{
        white-space: pre;
        border: 1px solid #807e7e;
        border-radius: 10px;
        padding: 20px;
        text-align: left;
        overflow-wrap: break-word;
    }
}
</style>