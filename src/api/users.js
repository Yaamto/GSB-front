import jsonwebtoken from 'jsonwebtoken'


export const getUser = async () => {
    let response = await fetch('http://localhost:3001/users', {
        method : 'GET',
        headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'
        }


    })
    let user = await response.json()
    return user

}


export const postUser = async (user) => {
    let response = await fetch('http://localhost:3001/users/auth', {
        method : 'POST',
        headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    let {token} = await response.json()
    
    let decoded =jsonwebtoken.verify(token, 'NoN')
    return {decoded, token}


}