<script>
import { mapState, mapActions } from "vuex"
import { userService, postService } from '@/_services'

export default {
	name: "EditProfil",
    data() {
        return {
            
        }
    },
    props: ['id'],
    computed: {
		...mapState(['userFromApi'])
	},
    methods: {
        ...mapActions(['deleteUser']),
        checkForm : function(){
            this.errors = [];
            if (!this.text){
                this.errors.push("Nom d'utilisateur requis");
            }

            if (!this.email){
                this.errors.push("Email requis");
            } 

            else if (!this.validateEmail(this.email)) {
                this.errors.push("L'email doit être valide")
            }

            if (this.newPassword) {
                if (!this.validatePassword(this.newPassword)){
                    this.errors.push("Le nouveau mot de passe doit être valide")
                }

                if (!this.oldPassword){
                    this.errors.push("Le mot de passe actuel est requis pour en définir un nouveau");
                }
            }

            if (this.phoneNumber){
                if (!this.validatePhoneNumber(this.phoneNumber)){
                    console.log("pouet");
                    this.errors.push("Le numéro de téléphone doit être valide")
                }
            }

            if (!this.errors.length){
                const userEdited = {
                    username: this.username,
                    email: this.email,
                    newPassword: this.newPassword,
                    oldPassword: this.oldPassword,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                    admin: this.admin
                }
                if (!userEdited.newPassword){
                    userEdited.oldPassword = null;
                }
                userService.editUser(this.id, userEdited);
            }
        }
    },
    beforeMount(){
        postService.getById(this.id)
			.then((post) => {
                this.text = post.text;
            });
        
    }
}
</script>