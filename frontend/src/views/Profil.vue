<script>
import { mapState, mapActions } from "vuex"
import ProfilTab from "@/components/ProfilTab.vue"
import PostTab from "@/components/PostTab.vue"

// Vue pour voir un profil avec ses publications
export default {
	name: "Profil",
    props: ['id'],
    components: {
		ProfilTab,
        PostTab
	},
    computed: {
		...mapState(['userFromId','userFromApi', 'postsFromUserId', 'postsCountFromUserId']),
	},
    methods: {
        ...mapActions(['deleteUser'])
    },
    // Avant de monter la vue, on charge les données de l'utilisateur, ses publications associés ainsi que son nombre de publications
    beforeMount(){
        this.$store.dispatch("retrieveUserById", this.id);
        this.$store.dispatch("retrievePostsByUserId", this.id);
        this.$store.dispatch("countPostsByUserId", this.id);
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
        <div id="profil__posts" v-if="userFromId && userFromApi">
            
            <h2>{{postsCountFromUserId}} Publication<span v-if="postsCountFromUserId > 1">s</span> de {{ userFromId.username }}</h2>
            
            <div id="user__posts__list">
                <PostTab
                    v-for="item in postsFromUserId"
                    :post = item
                    where = "profil"
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
        > div{
            margin-top: 7px;
            text-decoration: underline;
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

    &__posts{
        max-width: 75%;
        margin: auto;
    }
}

</style>