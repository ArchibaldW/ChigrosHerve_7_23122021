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
            heure: Number(datePart2[0]),
            minute: Number(datePart2[1]),
            secondes: Number(datePart2[2])
        }
        date.heure += 1
        if (date.heure > 23){
            date.jour += 1 
            if (date.jour > nbJours[date.mois-1]){
                date.mois += 1
                if (date.mois > 12){
                    date.année += 1
                }
            }
        }
        date.mois = nomMois[date.mois-1]
        console.log(date);
        return `le ${date.jour} ${date.mois} ${date.année} à ${date.heure}:${date.minute}:${date.secondes}`
        
    }
}