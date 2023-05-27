const database  = require('../models')
const {compare} = require('bcryptjs') // para comparar a senha enviada com a encryptada em bCrypt
const {sign} = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');
class AuthService{
    async login(loginDTO){
        const user = await database.user.findOne({
            attributes: ['id', 'email', 'password'],
            where: {
                email: loginDTO.email
            }
        })

        if(!user){
            throw new Error("Usuario não cadastrado!");
        }

        const samePasswords = await compare(loginDTO.password, user.password) // recebe dois parâmetros a senha passada na req e um hash (senha do user cadastrada no banco.)
        if(!samePasswords){
            throw new Error('Email ou senha incorreta!');
        }

        // função sign recebe até três parametros: payload(informações que queremos devolver para o usuário, ex email, senha id, imagens, etc.)
        // segunda opção é um secret, um código único do projeto. terceiro parâmetro são as options que são informações adicionais do token
        // como tempo de expiração,etc.
        const acessToken = sign({
           id: user.id,
           email: user.email 
        }, jsonSecret.secret, {
            expiresIn: 86400
        }) 

        return {acessToken};
    }
}

module.exports = AuthService;