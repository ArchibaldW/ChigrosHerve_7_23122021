<script>
import { convert } from '@/_helpers';
import { userService } from '@/_services'
import { mapState, mapActions } from "vuex"

export default {
	name: 'PostTab',
    data() {
        return {
            username: null,
            usernameEdit: null,
            createdDate: convert.time(this.post.createdAt),
            updatedDate: convert.time(this.post.updatedAt)
        }
    },
    methods: {
        ...mapActions(['deletePost'])
    },
    computed:{
		...mapState(['currentUser'])
	},
    props: ['post','where'],
    beforeMount(){
        if (this.where != "profil"){
            userService.getById(this.post.userId)
                .then((user) => {
                    this.username = user.username;
                    if (this.post.lastEditUserId && this.post.lastEditUserId != this.post.userId){
                        userService.getById(this.post.lastEditUserId)
                            .then((user) => {
                                this.usernameEdit = user.username;
                            });
                    } else if (this.post.lastEditUserId && this.post.lastEditUserId == this.post.userId){
                        this.usernameEdit = this.username;
                    }
                });
        } else {
            this.username = this.currentUser.username;
            if (this.post.lastEditUserId && this.post.lastEditUserId != this.post.userId){
                userService.getById(this.post.lastEditUserId)
                    .then((user) => {
                        this.usernameEdit = user.username;
                    });
            } else if (this.post.lastEditUserId && this.post.lastEditUserId == this.post.userId){
                this.usernameEdit = this.username;
            }
        }
        
    }
}
</script>

<template>
    <div class="post__tab">
        <div class="flex">
            <div class="post__tab__title">
                <router-link :to="{name: 'Publication', params : { id: post.id }}">{{ post.title }}</router-link>
            </div>
            <div class="flex post__tab__created">
                <span>Publié le {{createdDate}} par <router-link :to="{name: 'Profil', params : { id: post.userId }}">{{ username }}</router-link></span>
                <span v-if="createdDate != updatedDate">Edité le {{updatedDate}} par <router-link :to="{name: 'Profil', params : { id: post.lastEditUserId }}">{{ usernameEdit }}</router-link></span>
            </div>
        </div>
        <div class="post__tab__text">
            {{post.text}}
        </div>
        <div v-if="post.userId == currentUser.userId || currentUser.admin" class="flex post__tab__actions">
            <router-link :to="{name: 'EditPublication', params : { id: post.id }}"><font-awesome-icon icon="edit" /> Modifier</router-link>
            <div @click="deletePost({where, post})"><font-awesome-icon icon="trash-alt" /> Supprimer</div>
        </div>
    </div>
</template>

<style lang="scss">
    .post__tab{
        width: 100%;
        margin: 0 auto 30px;
        box-shadow : 5px 3px 5px #e2dfdf;
        border: 1px solid #e2dfdf;
        border-radius: 10px;
        > div{
            margin: 10px;
            padding: 10px;
            &:first-child{ 
                justify-content: space-between;
                flex-wrap: wrap;
                align-items : center;
            }
        }
        a {
            color: #2c3e50;
            text-decoration: none;
            font-weight: bold;
        }
        &__title{
            font-size: 20px;
            height: 100%;
            text-decoration: underline;
            text-align: left;
            flex-grow: 1;
        }
        &__created{
            flex-direction: column;
            align-items: flex-end;
        }
        &__text{
            border: 1px solid #807e7e;
            text-align: left;
            overflow-wrap: break-word;
            white-space: pre;
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