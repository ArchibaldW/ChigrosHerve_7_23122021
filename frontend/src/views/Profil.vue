<script>
import { mapState } from "vuex"
import ProfilTab from "@/components/ProfilTab.vue"

export default {
	name: "Profil",
    props: ['id'],
    components: {
		ProfilTab
	},
    computed:{
		...mapState({
			userFromId: "userFromId",
            userFromApi: "userFromApi"
		}),
	},
    beforeMount(){
        this.$store.dispatch("retrieveUserById", this.id);
    },
}
</script>

<template>
    <div id="profil" v-if="userFromId">
        {{ userFromId }}
        <router-link v-if="userFromId.id == userFromApi.id || userFromApi.admin" :to="{name: 'EditProfil', params : { id: userFromId.id }}">Modifier le profil</router-link>
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
    > a{
        position: absolute;
        top: 0;
        right: 20px;
        color: #42b983;
        font-weight: bold;
    }
    > div {
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