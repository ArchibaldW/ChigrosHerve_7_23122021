import config from "@/config";

import { requestOptions, handle } from '@/_helpers';

import { BehaviorSubject } from 'rxjs';

import router from "@/router/index";



const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    signup,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    return fetch(config.apiURL+"/users/auth/login", requestOptions.post({username : username, password : password}))
        .then(function(res) {
            return handle.response(res)
        })
        .then(function(user){
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            window.dispatchEvent(new CustomEvent('user-connected'));
            return user;
        })
        .catch(function (error){
            handle.error(error)
        });
}

function signup(username, password, email){
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

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    window.dispatchEvent(new CustomEvent('user-disconnected'));
}