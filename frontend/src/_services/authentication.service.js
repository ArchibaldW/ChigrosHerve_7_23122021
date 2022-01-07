import config from "@/config";
import { requestOptions, handle } from '@/_helpers';
import { BehaviorSubject } from 'rxjs';
import router from "@/router/index";

// On définie une instance pour pouvoir retrouver plus facilement les données relatives à l'utilisateur connecté
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    signup,
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

// Tape dans l'API pour la création d'un nouvel utilisateur, puis on renvoie à la page de connexion
function signup(username, email, password){
    return fetch (config.apiURL+"/users/auth/signup/", requestOptions.post({username : username, email : email, password : password}))
        .then(function (res) {
            handle.response(res)
            if (res.ok){
                router.push('/connexion');
            }
        })
        .catch(function (error){
            handle.error(error)
        });
}

// Tape dans l'API pour l'authentification d'un utilisateur
function login(username, password) {
    return fetch(config.apiURL+"/users/auth/login", requestOptions.post({username : username, password : password}))
        .then(function(res) {
            return handle.response(res)
        })
        .then(function(user){
            // On défini l'utilisateur connecté pour y avoir accès sur toute l'application puis on créé un nouvel évenement pour mettre à jour notre application
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            window.dispatchEvent(new CustomEvent('user-connected'));
            return user;
        })
        .catch(function (error){
            handle.error(error)
        });
}

// On retire toute définition de l'utilisateur connecté puis on créé un nouvel évenement pour mettre à jour notre application
function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    window.dispatchEvent(new CustomEvent('user-disconnected'));
}