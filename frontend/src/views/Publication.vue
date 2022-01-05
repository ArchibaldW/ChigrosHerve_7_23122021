<script>
import { mapState, mapActions } from "vuex"

export default {
	name: "Publication",
    props: ['id'],
    computed: {
		...mapState(['userFromApi'])
	},
    methods: {
        ...mapActions(['deletePost'])
    },
    beforeMount(){
        this.$store.dispatch("retrievePostById", this.id)
        this.$store.dispatch("retrieveCommentsByPostId", this.id)
    },
}
</script>