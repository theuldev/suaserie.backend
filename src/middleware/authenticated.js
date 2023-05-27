// Essa middleware tem a função de fazer as validações de autenticação, checando se o token foi enviado, se é valido, se foi expirado, etc.

const {verify, decode} = require('jsonwebtoken'); 
const jsonSecret = require ('../config/jsonSecret');
// next, caso o token seja valido continua o processo da requisição
module.exports = async (request, response, next) =>{
    const token = request.headers.authorization

    if(!token){
        return response.status(401).json("O token não foi informado!")
    }

    // aqui quebramos o token para tirar o prefixo bearer...
    const [,accessToken] = token.split(" ");
    
    try {// verify para validar se o token possui o nosso secret, se o token está expirado. Em caso de negativas, retorna uma exceção
        verify(accessToken, jsonSecret.secret)
        const {id, email} = await decode(accessToken); //decodificando as informações do payload.

        request.userId = id;
        request.userEmail = email;

        return next();
    } catch (error) {
        return response.status(403).json("Acesso negado, usuario não autorizado!");
    }


}

