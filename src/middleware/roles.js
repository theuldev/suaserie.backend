const database = require('../models');
const roles = (rolesList) =>{
    return async (request, response, next) =>{
        const {userId} = request

        const user = await database.user.findOne({
            include: [{
                model: database.roles,
                as: 'user_role',
                attributes: ['id', 'name']
            }],
            where:{
                id: userId
            }
        })

        if(!user){
            return response.status(401).json('Usuario não encontrado!');
        }
        //percorrer o array de roles do usuario com map, retornando um array com apenas o nome de cada role
        // metodo some testa uma condição, retorna um boolean
        // nesse caso fará a verificação se alguma role pertence a roleList, que são as roles permitidas no endpoint.
        const allowedUser = user.user_role
            .map((role) => role.name)
            .some((role) => rolesList.includes(role))

        if(!allowedUser){
            return response.status(403).json("Acesso probido!");
        }

        next();
    }
}

module.exports = roles;