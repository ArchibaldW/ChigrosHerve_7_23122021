import { authenticationService } from '@/_services';

// Permet de traiter les réponses et les erreurs de manière homogènes
export const handle = {
    
    response(res) {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then(function(data){
                if (res.status == 401 || res.status == 403){
                    // Si la requête est non autorisée ou interdite, on déconnecte l'utilisateur
                    authenticationService.logout();
                    throw new Error("Une erreur est arrivée : " + res.status + " - action non autorisée"); 
                } else {
                    // Sinon on affiche la requête par une alerte box
                    alert(data.message);
                    throw new Error("Une erreur est arrivée : " + res.status + " - " + data.message); 
                }
            })
        }
    },
    error(err){
        console.log(err);
    },
}