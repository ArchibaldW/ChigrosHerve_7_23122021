<script>
import { mapActions } from "vuex"

// Composant pour rendre chaque ligne du tableau de la liste des utilisateurs
export default {
	name: 'ListeUtilisateursTab',
    props: ['user'],
    methods: {
        ...mapActions(['deleteUser'])
    },
}
</script>


<template>
	<tr>
        <td>{{ user.id }}</td>
        <td class="utilisateur"><router-link :to="{name: 'Profil', params : { id: user.id }}">{{ user.username }}</router-link></td>
        <td>{{ user.email }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.phoneNumber }}</td>
        <td v-if="user.admin">Oui</td>
        <td v-else>Non</td>
        <td class="actions flex">
            <router-link title="Modifier" :to="{name: 'EditProfil', params : { id: user.id }}"><font-awesome-icon icon="edit" /></router-link>
            <div title="Supprimer" @click="deleteUser(user.id)"><font-awesome-icon icon="trash-alt" /></div>
        </td>
    </tr>
</template>

<style lang="scss">
#users__table{
    td
    {
        height: 20px;
        border: 1px solid #ddd;
        padding: 10px;
        &.utilisateur a{
            color: #2c3e50;
            font-weight: bold;
        }
    }
    .actions {
        justify-content: space-around;
        > :first-child{
            color: #42b983;
        }
        > :last-child{
            color: red;
            cursor: pointer;
        }
    }
}
</style>