import { authenticationService } from '@/_services';

export const handle = {
    response(res) {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then(function(data){
                if (res.status == 401 || res.status == 403){
                    authenticationService.logout();
                    throw new Error("Une erreur est arrivée : " + res.status + " - action non autorisée"); 
                } else {
                    throw new Error("Une erreur est arrivée : " + res.status + " - " + data.message); 
                }
            })
        }
    },
    error(err){
        console.log(err);
    },
}