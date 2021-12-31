import Vue from 'vue'
import VueRouter from 'vue-router'
import Inscription from '../views/Inscription.vue'
import Connexion from '../views/Connexion.vue'
import Profil from '../views/Profil.vue'
import EditProfil from '../views/EditProfil.vue'

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
            redirectAdmin(to, from, next)
        }        
    }
]

function redirectAdmin(to, from, next) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser.admin, currentUser.userId, Number(to.params.id));
    if (!currentUser.admin && !(currentUser.userId == Number(to.params.id))) {
        next('/profil/'+currentUser.userId);
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