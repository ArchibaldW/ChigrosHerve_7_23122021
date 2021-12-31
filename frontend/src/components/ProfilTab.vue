<script>
export default {
	name: 'ProfilTab',
    props: {
        color: {
            type: String,
            required: true
        },
        th: {
            type: String,
            required: true
        },
        td: [String,Boolean],
    },
}
</script>

<template>
	<tr :class="color">
        <th>{{ th }} : </th>
        <td v-if="td">{{ td }}</td>
        <td v-else-if="th=='Administrateur'">Non Admin</td>
        <td v-else>Non renseigné</td>
    </tr>
</template>

<style lang="scss">
#profil__table{
    td, th
    {
        height: 20px;
        border: 1px solid black;
    }

    .tr{
        &__white{
            background-color: white;
        }
        &__grey{
            background-color: rgb(190, 190, 190);
        }
    }
}
</style>