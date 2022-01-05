<script>
import { mapState, mapActions } from "vuex"
import ProfilTab from "@/components/ProfilTab.vue"
import PostTab from "@/components/PostTab.vue"

export default {
	name: "Profil",
    props: ['id'],
    components: {
		ProfilTab,
        PostTab
	},
    computed: {
		...mapState(['userFromId','userFromApi', 'postsFromUserId'])
	},
    methods: {
        ...mapActions(['deleteUser'])
    },
    beforeMount(){
        this.$store.dispatch("retrieveUserById", this.id);
        this.$store.dispatch("retrievePostsByUserId", this.id)
    },
}
</script>

<template>
    <div>
        <div id="profil" v-if="userFromId && userFromApi">
            <div v-if="userFromId.id == userFromApi.id || userFromApi.admin">
                <router-link  :to="{name: 'EditProfil', params : { id: userFromId.id }}">Modifier {{ userFromId.username }}</router-link>
                <div @click="deleteUser(userFromId.id)">Supprimer {{ userFromId.username }}</div>
            </div>
            <h1>{{ userFromId.username }}</h1>
            <div class="flex">
                <table id="profil__table">
                    <ProfilTab
                        th = "Email"
                        :td = userFromId.email
                    />
                    <ProfilTab
                        th = "Prénom"
                        :td = userFromId.firstName
                    />
                    <ProfilTab
                        th = "Nom"
                        :td = userFromId.lastName
                    />
                    <ProfilTab
                        th = "Téléphone"
                        :td = userFromId.phoneNumber
                    />
                    <ProfilTab
                        th = "Administrateur"
                        :td = userFromId.admin
                    />
                </table>
            </div>
        </div>
        <div v-else>
            <h1>Utilisateur non trouvé</h1>
        </div>
        <div id="posts" v-if="userFromId && userFromApi">
            <h2>Publications de {{ userFromId.username }}</h2>
            <div id="user__posts__list">
                <PostTab
                    v-for="item in postsFromUserId"
                    :post = item
                    :key = item.title
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#profil{
    position: relative;
    margin-bottom: 30px;
    > div:first-child{
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
    > div:last-child {
        justify-content: center;
    }
    &__img{
        max-height: 200px;
    }
    &__table
    {
        min-width: 400px;
        border-collapse: collapse;
    }
}

</style>