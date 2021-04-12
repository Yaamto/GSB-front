export const getBills = async (id) => {
    let response = await fetch('http://localhost:3001/fichedefrais/'+ id, {
        method : 'GET',
        headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'
        }


    })
    let bills = await response.json()
    return bills

}

export const getLigneFraisForfait = async (id, mois) => {
    let response = await fetch('http://localhost:3001/fichedefrais/lignefraisforfait/'+ id +'/'+ mois, {
        method : 'GET',
        headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'
        }


    })
    let ligneFraisForfait = await response.json()
    return ligneFraisForfait

}



export const getLigneFraisHorsForfait = async (id, mois) => {
    let response = await fetch('http://localhost:3001/fichedefrais/lignefraishorsforfait/'+ id +'/'+ mois, {
        method : 'GET',
        headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'
        }


    })
    let ligneFraisHorsForfait = await response.json()
    return ligneFraisHorsForfait

}


export const putLigneFraisForfait = async (id, mois, idFraisForfait, quantite) => {
    let response = await fetch('http://localhost:3001/fichedefrais/lignefraisforfait/'+id+'/'+mois+'/'+idFraisForfait, {
        method : 'PUT',
        headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
       body: JSON.stringify({quantite})

    })
    let lignefraisforfaits = await response.json()
    return lignefraisforfaits

}







export const postLigneFraisForfait = async (lignefraisforfait) => {
    let response = await fetch('http://localhost:3001/fichedefrais/lignefraisforfait', {
        method : 'POST',
        headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
       body: JSON.stringify(lignefraisforfait)

    })
    let lignefraisforfaits = await response.json()
    return lignefraisforfaits

}

export const postLigneFraisHorsForfait = async (lignefraisHorsForfait) => {
    let response = await fetch('http://localhost:3001/fichedefrais/lignefraishorsforfait', {
        method : 'POST',
        headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(lignefraisHorsForfait)


    })
    let lignefraisHorsForfaits = await response.json()
    return lignefraisHorsForfaits
   

}


