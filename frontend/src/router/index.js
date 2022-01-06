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

const routes = [
    {
        path: "/inscription",
        name: "Inscription",
        component: Inscription
    },
    {
        path: "/connexion",
        name: "Connexion",
        component: Connexion
    },
    {
        path: "/profil/:id",
        name: "Profil",
        component: Profil,
        props: true
    },
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
    {
        path: "/add-publication",
        name: "AddPublication",
        component: AddPublication,
    },
    {
        path: "/",
        name: "Publications",
        component: Publications,
    },
    {
        path: "/publications/:id",
        name: "Publication",
        component: Publication,
        props: true
    },
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