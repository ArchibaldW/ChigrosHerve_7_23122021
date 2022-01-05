<script>
import { mapState, mapActions } from "vuex"

export default {
	name: "ListePublications",
    components: {
	},
    computed: {
		...mapState(['userFromApi', 'postList'])
	},
    methods: {
        ...mapActions(['deletePost'])
    },
    beforeMount(){
        this.$store.dispatch("retrievePostList")
    },
}
</script>