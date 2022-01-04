<script>
import { mapState, mapActions } from "vuex"
import listeUtilisateursTab from "@/components/ListeUtilisateursTab.vue"

export default {
	name: "ListeUtilisateurs",
    components: {
		listeUtilisateursTab
	},
    computed: {
		...mapState(['userFromApi', 'userList'])
	},
    methods: {
        ...mapActions(['deleteUser'])
    },
    beforeMount(){
        this.$store.dispatch("retrieveUserList")
    },
}
</script>

<template>
    <div id="users" class="flex">
        <h1>Liste des utilisateurs</h1>
        <table id="users__table">
            <tr>
                <th>Id</th>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Numéro de téléphone</th>
                <th>Administrateur</th>
                <th>Actions</th>
            </tr>
            <listeUtilisateursTab
                v-for="item in userList"
                :user = item
                :key = item.username
            />
        </table>
    </div>
</template>

<style lang="scss">
#users{
    justify-content: center;
    flex-direction: column;
    &__table{
        max-width: 600px;
        border-collapse: collapse;
        align-self: center;
        white-space: nowrap;
        tr{
            &:nth-child(even){
                background-color: #f2f2f2;
            }
            &:hover{
                background-color: #ddd;
            }
        }
        th
        {
            height: 20px;
            border: 1px solid #ddd;
            padding: 15px;
            background-color: #2c3e50;
            color: white;
        }
    }
}

</style>