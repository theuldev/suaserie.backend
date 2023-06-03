const database = require('../models')
const Sequelize = require('sequelize')
class SecurityService{
    async createACL(aclDTO){
        const user = await database.user.findOne({
            //include para retornar as informações de perfis e roles do user
            include: [{
                model: database.roles,
                as: 'user_role',
                attributes: ['id', 'name', 'description'] //atributos das roles 
            }],
            where:{
                id: aclDTO.userId
            }
        })
       if(!user){
        throw new Error('Este usuário não está cadastrado!')

       } 


       //buscar todas as roles baseadas nos id's que foram passados, verificar se existe...
       const role = await database.roles.findOne({
            where:{
                id: aclDTO.roles
            }
       })
     
       await user.setUser_role(role)
    
      // buscando o user atualizado para retornar. 
      const newUser = await database.user.findOne({
        include: [{
            model: database.roles,
            as: 'user_role',
            attributes: ['id', 'name', 'description']
        },],
        where:{
            id: aclDTO.userId
        }
      })

      return newUser;


    }
}

module.exports = SecurityService;