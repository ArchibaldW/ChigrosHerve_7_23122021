<script>

// Composant pour rendre chaque ligne du tableau dans le profil utilisateur
export default {
	name: 'ProfilTab',
    props: {
        th: {
            type: String,
            required: true
        },
        td: [String,Boolean],
    },
}
</script>

<template>
	<tr>
        <th>{{ th }} : </th>
        <td v-if="th=='Administrateur' && td">Admin</td>
        <td v-else-if="td">{{ td }}</td>
        <td v-else-if="th=='Administrateur'">Non Admin</td>
        <td v-else>Non renseigné</td>
    </tr>
</template>

<style lang="scss">
#profil__table{
    td, th
    {
        height: 20px;
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr{
        &:nth-child(even){
            background-color: #f2f2f2;
        }
        &:hover{
            background-color: #ddd;
        }
    }
}
</style>