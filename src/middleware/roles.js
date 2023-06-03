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
      
        const roleName = user.user_role.name
        allowedUser = rolesList.includes(roleName)
         
        if(!allowedUser){
            return response.status(403).json("Acesso probido!");
        }

        next();
    }
}

module.exports = roles;