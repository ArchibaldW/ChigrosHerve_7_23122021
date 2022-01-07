<script>
import { mapState, mapActions } from "vuex"
import PostTab from "@/components/PostTab.vue"

// Vue Administrateur pour voir la liste des publications
export default {
	name: "Publications",
    components: {
        PostTab
	},
    computed: {
		...mapState(['postsList'])
	},
    methods: {
        ...mapActions(['deletePost'])
    },
    // Avant de monter la vue, on charge la liste des publications
    beforeMount(){
        this.$store.dispatch("retrievePostsList")
    },
}
</script>

<template>
    <div>
        <h1>Dernières publications</h1>
        <div class="flex" id="posts__list">
            <div>
                <router-link to="/add-publication"><button>Ajouter une publication</button></router-link>
            </div>
            <PostTab
                v-for="item in postsList"
                :post = item
                where = "posts"
                :key = item.title
            />
        </div>
    </div>
</template>


<style lang="scss">
#posts__list{
    flex-direction: column;
    max-width: 75%;
    margin: auto;
    > div:first-child{
        text-align: right;
        margin: 10px 0 15px;
    }
}
</style>