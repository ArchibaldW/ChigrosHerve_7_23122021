<script>
import { mapState, mapActions } from "vuex"
import ProfilTab from "@/components/ProfilTab.vue"

export default {
	name: "Profil",
    props: ['id'],
    components: {
		ProfilTab
	},
    computed: {
		...mapState({
			userFromId: "userFromId",
            userFromApi: "userFromApi"
		}),
	},
    methods: {
        ...mapActions(['deleteUser'])
    },
    beforeMount(){
        this.$store.dispatch("retrieveUserById", this.id);
    },
}
</script>

<template>
    <div id="profil" v-if="userFromId">
        {{ userFromId }}
        <div v-if="userFromId.id == userFromApi.id || userFromApi.admin">
            <router-link  :to="{name: 'EditProfil', params : { id: userFromId.id }}">Modifier {{ userFromId.username }}</router-link>
            <div @click="deleteUser(userFromId.id)">Supprimer {{ userFromId.username }}</div>
        </div>
        
        <h1>{{ userFromId.username }} ({{ userFromId.id }})</h1>
        <div class="flex">
            <img id="profil__img" v-if="userFromId.avatar" :src="userFromId.avatar">
            <img id="profil__img" v-else src="../assets/icon.png">
            <table id="profil__table">
            <ProfilTab
                color = "tr__white"
                th = "Email"
                :td = userFromId.email
            />
            <ProfilTab
                color = "tr__grey"
                th = "Prénom"
                :td = userFromId.firstName
            />
            <ProfilTab
                color = "tr__white"
                th = "Nom"
                :td = userFromId.lastName
            />
            <ProfilTab
                color = "tr__grey"
                th = "Téléphone"
                :td = userFromId.phoneNumber
            />
            <ProfilTab
                color = "tr__white"
                th = "Poste"
                :td = userFromId.poste
            />
            <ProfilTab
                color = "tr__grey"
                th = "Administrateur"
                :td = userFromId.admin
            />
        </table>
        </div>
    </div>
</template>

<style lang="scss">
#profil{
    position: relative;
    > div:first-child{
        position: absolute;
        top: 20px;
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
        }
    }
    > div:last-child {
        justify-content: space-evenly;
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