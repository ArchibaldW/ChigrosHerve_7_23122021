import Vue from 'vue'
import VueRouter from 'vue-router'
import Inscription from '../views/Inscription.vue'
import Connexion from '../views/Connexion.vue'
import Profil from '../views/Profil.vue'
import EditProfil from '../views/EditProfil.vue'
import ListeUtilisateurs from '../views/ListeUtilisateurs.vue'
import AjouterPublication from '../views/AjouterPublication.vue'
import ListePublications from '../views/ListePublications.vue'
import Publication from '../views/Publication.vue'
import EditPublication from '../views/EditPublication.vue'

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
            redirectIdAdmin(to, from, next)
        }        
    },
    {
        path: "/liste-utilisateurs",
        name: "ListeUtilisateurs",
        component: ListeUtilisateurs,
        beforeEnter(to, from , next){
            redirectAdmin(to, from, next)
        }      
    },
    {
        path: "/ajout-publication",
        name: "AjouterPublication",
        component: AjouterPublication,
    },
    {
        path: "/liste-publications",
        name: "ListePublications",
        component: ListePublications,
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
        props: true
    }
]

function redirectIdAdmin(to, from, next) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser.admin && !(currentUser.userId == Number(to.params.id))) {
        next('/profil/' + currentUser.userId);
    } else {
        next()
    }
}

function redirectAdmin(to, from, next) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser.admin) {
        next('/profil/' + currentUser.userId);
    } else {
        next()
    }
}

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