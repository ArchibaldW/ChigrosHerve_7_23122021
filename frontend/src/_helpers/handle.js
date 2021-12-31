export const handle = {
    response(res) {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then(function(data){
                throw new Error("Une erreur est arrivée : " + res.status + " - " + data.message); 
            })
        }
    },
    error(err){
        console.log(err);
    },
}