export const convert = {
    time(time){
        const nbJours = [

        ];
        const nomMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
        const datePart1 = time.split("T")[0].split('-');
        const datePart2 = time.split("T")[1].split('.')[0].split(':');
        var date = {
            jour: Number(datePart1[2]),
            mois: Number(datePart1[1]),
            année: Number(datePart1[0]),
            heures: Number(datePart2[0]),
            minutes: Number(datePart2[1]),
            secondes: Number(datePart2[2])
        }
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
        date.mois = nomMois[date.mois-1]
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