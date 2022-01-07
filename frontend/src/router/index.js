import Vue from 'vue'
import VueRouter from 'vue-router'
import Inscription from '../views/Inscription.vue'
import Connexion from '../views/Connexion.vue'
import Profil from '../views/Profil.vue'
import EditProfil from '../views/EditProfil.vue'
import ListeUtilisateurs from '../views/ListeUtilisateurs.vue'
import AddPublication from '../views/AddPublication.vue'
import Publications from '../views/Publications.vue'
import Publication from '../views/Publication.vue'
import EditPublication from '../views/EditPublication.vue'
import { postService } from '@/_services'

Vue.use(VueRouter)
// On définie le chemin et le nom de chacune de nos vues
const routes = [
    // Inscription | Accessible à tous les utilisateurs non connectés
    {
        path: "/inscription",
        name: "Inscription",
        component: Inscription
    },
    // Connexion | Accessible à tous les utilisateurs non connectés
    {
        path: "/connexion",
        name: "Connexion",
        component: Connexion
    },
    // Profil | Accessible à tous les utilisateurs connectés | Prends un id en argument
    {
        path: "/profil/:id",
        name: "Profil",
        component: Profil,
        props: true
    },
    // Edition de profil | Accessible à l'utilisateur concerné ou à un administrateur | Prends un id en argument
    {
        path: "/edit-profil/:id",
        name: "EditProfil",
        component: EditProfil,
        props: true,
        beforeEnter(to, from, next) {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"))
            if (!currentUser.admin && !(currentUser.userId == Number(to.params.id))) {
                next('/profil/' + currentUser.userId);
            } else {
                next()
            }
        }        
    },
    // Liste d'utilisateur | Accessible uniquement aux administrateurs
    {
        path: "/liste-utilisateurs",
        name: "ListeUtilisateurs",
        component: ListeUtilisateurs,
        beforeEnter(to, from , next){
            const currentUser = JSON.parse(localStorage.getItem("currentUser"))
            if (!currentUser.admin) {
                next('/profil/' + currentUser.userId);
            } else {
                next()
            }
        }      
    },
    // Ajouter une publication | Accessible à tous les utilisateurs connectés
    {
        path: "/add-publication",
        name: "AddPublication",
        component: AddPublication,
    },
    // Publications | Accessible à tous les utilisateurs connectés | Sert de page d'acceuil au site une fois connecté
    {
        path: "/",
        name: "Publications",
        component: Publications,
    },
    // Publication | Accessible à tous les utilisateurs connectés | Prends un id en argument
    {
        path: "/publication/:id",
        name: "Publication",
        component: Publication,
        props: true
    },
    // Edition de publication | Accessible à l'utilisateur concerné ou à un administrateur | Prends un id en argument
    {
        path: "/edit-publication/:id",
        name: "EditPublication",
        component: EditPublication,
        props: true,
        beforeEnter(to, from , next){
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            postService.getById(to.params.id)
                .then((post) => {
                    if (!post || !currentUser.admin && !(post.userId == currentUser.userId)){
                        next('/');
                    } else {
                        next();
                    }
                })
        }    
    }
]

const router = new VueRouter({
    routes
})

// Avant d'entrer sur une page, on vérifie
// Si l'utilisateur n'est PAS connecté et est sur une page autre que connexion et inscription, alors on le renvoie à la page de connexion
// Si l'utilisateur est connecté et est sur la page connexion ou inscription, alors on le renvoie vers son profil
// Sinon on continue
router.beforeEach(function(to, from, next){
    const publicPages = ["/connexion", "/inscription"];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && !localStorage.getItem("currentUser")){
        next ('/connexion');
    } else if (!authRequired && localStorage.getItem("currentUser")) {
        next('/profil/'+JSON.parse(localStorage.getItem("currentUser")).userId);
    } else {
        next();
    }
})

export default router