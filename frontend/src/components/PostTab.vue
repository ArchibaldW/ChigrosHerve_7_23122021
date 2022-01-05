<script>
import { convert } from '@/_helpers';
import { userService } from '@/_services'
import { mapState, mapActions } from "vuex"

export default {
	name: 'PostTab',
    data() {
        return {
            username: null,
            date: convert.time(this.post.createdAt)
        }
    },
    methods: {
        ...mapActions(['deletePost'])
    },
    computed:{
		...mapState(['currentUser'])
	},
    props: ['post'],
    beforeMount(){
        userService.getById(this.post.userId)
			.then((user) => {
                this.username = user.username;
            });
    }
}
</script>

<template>
    <div class="post__tab">
        <!-- {{post}} -->
        <div class="flex">
            <div class="post__tab__title">
                <router-link :to="{name: 'Publication', params : { id: post.id }}">{{ post.title }}</router-link>
            </div>
            <div class="post__tab__created">
                Publié {{date}} par <router-link :to="{name: 'Profil', params : { id: post.userId }}">{{ username }}</router-link>
            </div>
        </div>
        <div class="post__tab__text">
            {{post.text}}
        </div>
        <div v-if="post.userId == currentUser.userId" class="flex post__tab__actions">
            <router-link  :to="{name: 'EditPublication', params : { id: post.id }}">Modifier</router-link>
            <div @click="deletePost(post)">Supprimer</div>
        </div>
    </div>
</template>

<style lang="scss">
    .post__tab{
        max-width: 50%;
        margin: 0 auto 30px;
        box-shadow : 5px 3px 5px #e2dfdf;
        border: 1px solid #e2dfdf;
        border-radius: 10px;
        > div{
            margin: 10px;
            padding: 10px;
            &:first-child{ 
                justify-content: space-between;
            }
        }
        a {
            color: #2c3e50;
            text-decoration: none;
            font-weight: bold;
        }
        &__text{
            border: 1px solid #807e7e;
            text-align: left;
            overflow-wrap: break-word;
        }
        &__actions{
            justify-content: space-between;
            > :last-child{
                color: red;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
</style>