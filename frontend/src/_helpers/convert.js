// Permet de passer convertir la date de "createdAt" et "updatedAt" pour la rendre plus lisible à l'écran 
export const convert = {
    time(time){
        const nbJours = [

        ];
        const nomMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
        const datePart1 = time.split("T")[0].split('-');
        const datePart2 = time.split("T")[1].split('.')[0].split(':');
        var date = {
            année: Number(datePart1[0]),
            mois: Number(datePart1[1]),
            jour: Number(datePart1[2]),
            heures: Number(datePart2[0]),
            minutes: Number(datePart2[1]),
            secondes: Number(datePart2[2])
        }

        // On ajoute 1 aux heures pour être dans le UTC+1 (penser à rajouter 2 heures pendant l'heure d'été)
        // On répercute ces changements aux jours/mois/années si besoin
        date.heures += 1
        if (date.heures > 23){
            date.jour += 1 
            if (date.jour > nbJours[date.mois-1]){
                date.mois += 1
                if (date.mois > 12){
                    date.année += 1
                }
            }
        }
        // On change le numéro du mois en un texte
        date.mois = nomMois[date.mois-1]
        // On change les numéros des heures/minutes/secondes si inférieurs à 10
        date.heures = twoDigit(date.heures)
        date.minutes = twoDigit(date.minutes)
        date.secondes = twoDigit(date.secondes)
        return `${date.jour} ${date.mois} ${date.année} à ${date.heures}:${date.minutes}:${date.secondes}`
        
    }
}

function twoDigit(n){
    if (n < 10){
        n = '0'+n
    }
    return n;
}