import config from "@/config";

import { requestOptions } from '@/_helpers';

import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    signup,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    return fetch(config.apiURL+"/auth/login", requestOptions.post({username : username, password : password}))
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(function(data){
                    throw new Error("Une erreur est arrivée : " + res.status + " - " + data.message); 
                })
            }
        })
        .then(function(user){
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        })
        .catch(function(err){
            console.log(err);
        });
}

function signup(username, password, email){
    return fetch (config.apiURL+"/auth/signup/",requestOptions.post({username : username, email : email, password : password}))
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(function(data){
                    throw new Error("Une erreur est arrivée : " + res.status + " - " + data.message); 
                })
            }
        })
        .catch(function(err){
            console.log(err);
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}